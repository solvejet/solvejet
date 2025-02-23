// src/components/ui/toast/ToastProvider.tsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ToastPosition, Toast as ToastType } from './types';
import { useToastStore } from './toast-store';
import { Toast } from './Toast';

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastProvider = (): React.ReactElement | null => {
  const toasts = useToastStore(state => state.toasts);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
    'top-center',
    'bottom-center',
  ];

  // Initialize with empty arrays for all positions
  const initialGroups = positions.reduce<Record<ToastPosition, ToastType[]>>((acc, position) => {
    acc[position] = [];
    return acc;
  }, {} as Record<ToastPosition, ToastType[]>);

  // Group toasts by position
  const groupedToasts = toasts.reduce<Record<ToastPosition, ToastType[]>>((acc, toast) => {
    const position = toast.position ?? 'top-right';
    acc[position].push(toast);
    return acc;
  }, initialGroups);

  return createPortal(
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position as ToastPosition]}`}
          role="alert"
          aria-live="polite"
        >
          {positionToasts.map(toast => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      ))}
    </>,
    document.body
  );
};
