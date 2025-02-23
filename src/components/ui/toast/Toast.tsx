// src/components/ui/toast/Toast.tsx
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToastStore } from './toast-store';
import type { Toast as ToastType } from './types';

const variants = {
  default: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
  success: 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100',
  error: 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100',
  info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100',
};

const iconVariants = {
  default: 'text-gray-400 dark:text-gray-500',
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  info: 'text-blue-500 dark:text-blue-400',
};

export const Toast: React.FC<ToastType> = ({
  id,
  title,
  message,
  variant = 'default',
  onClose,
}): React.ReactElement => {
  const removeToast = useToastStore(state => state.removeToast);

  const handleClose = (): void => {
    removeToast(id);
    onClose?.();
  };

  return (
    <div
      className={cn(
        'pointer-events-auto relative flex w-full max-w-md rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
        variants[variant],
        'animate-slide-up'
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex w-full items-start justify-between gap-4 p-4">
        <div className="flex-1 min-w-0">
          {title && <p className="text-sm font-medium mb-1">{title}</p>}
          <p className="text-sm">{message}</p>
        </div>
        <button
          type="button"
          className={cn(
            'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
            iconVariants[variant]
          )}
          onClick={handleClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
