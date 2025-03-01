// src/components/ErrorBoundary/index.tsx
'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  // Initialize state with override modifier
  override state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  // Static method to derive state from error
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  // Capture component stack trace
  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    this.setState({
      errorInfo: errorInfo,
    });

    // Log to monitoring service if available
    if (typeof window !== 'undefined' && 'reportError' in window) {
      window.reportError({ error, errorInfo });
    }
  }

  // Method to reset error state
  public resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  // Override the render method
  override render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {error?.message ?? 'An unexpected error occurred'}
            </p>
            {process.env.NODE_ENV === 'development' && errorInfo && (
              <div className="mb-6 max-h-48 overflow-auto bg-gray-100 dark:bg-gray-800 p-3 rounded text-left text-xs">
                <p className="font-mono">{errorInfo.componentStack}</p>
              </div>
            )}
            <button
              onClick={this.resetError}
              className="bg-element-500 text-white px-6 py-2 rounded-full hover:bg-element-600 transition-colors"
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
