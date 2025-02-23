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
}

export class ErrorBoundary extends Component<Props, State> {
  // Initialize state with override modifier
  override state: State = {
    hasError: false,
    error: null,
  };

  // Static method to derive state from error
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  // Method to reset error state
  public resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  // Override the render method
  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error?.message ?? 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.resetError}
              className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-colors"
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