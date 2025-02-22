// src/app/offline/page.tsx
'use client';

import type { ReactElement } from 'react';
import Image from 'next/image';

export default function Offline(): ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <Image
            src="/offline.svg"
            alt="Offline"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">You're offline</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please check your internet connection and try again.
        </p>
        <button 
          onClick={(): void => {
            window.location.reload();
          }}
          className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-colors"
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  );
}