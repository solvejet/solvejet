// src/components/providers/CSRFProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

interface CSRFContextType {
    token: string | null;
    getToken: () => Promise<string>;
    isReady: boolean;
}

const CSRFContext = createContext<CSRFContextType | undefined>(undefined);

interface CSRFProviderProps {
    children: ReactNode;
}

export function CSRFProvider({ children }: CSRFProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    const generateToken = useCallback((): string => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }, []);

    const getToken = useCallback(async (): Promise<string> => {
        if (token) return token;

        try {
            // Try to get token from server first
            const response = await fetch('/api/csrf-token', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json() as { token: string };
                setToken(data.token);
                return data.token;
            }
        } catch {
            console.warn('Failed to get CSRF token from server, generating client-side token');
        }

        // Fallback to client-side generation
        const newToken = generateToken();
        setToken(newToken);
        return newToken;
    }, [token, generateToken]);

    useEffect(() => {
        const initializeCSRF = async () => {
            try {
                await getToken();
            } catch (error) {
                console.error('Failed to initialize CSRF token:', error);
            } finally {
                setIsReady(true);
            }
        };

        initializeCSRF();
    }, [getToken]);

    const value: CSRFContextType = {
        token,
        getToken,
        isReady,
    };

    return (
        <CSRFContext.Provider value={value}>
            {children}
        </CSRFContext.Provider>
    );
}

export function useCSRF(): CSRFContextType {
    const context = useContext(CSRFContext);
    if (context === undefined) {
        throw new Error('useCSRF must be used within a CSRFProvider');
    }
    return context;
}

// Hook for making authenticated requests
export function useAuthenticatedFetch() {
    const { getToken } = useCSRF();

    const authenticatedFetch = useCallback(async (
        url: string,
        options: RequestInit = {}
    ): Promise<Response> => {
        const csrfToken = await getToken();

        const headers = new Headers(options.headers);
        headers.set('X-CSRF-Token', csrfToken);
        headers.set('Content-Type', 'application/json');

        return fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });
    }, [getToken]);

    return { authenticatedFetch };
}