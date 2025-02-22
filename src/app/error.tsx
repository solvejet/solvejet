// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  const router = useRouter();

  useEffect(() => {
    if (!navigator.onLine) {
      router.push('/offline');
    }
  }, [router]);

  const handleReset = (): void => {
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'An error occurred. Please try again.'}
        </p>
        <button
          onClick={handleReset}
          className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-colors"
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}