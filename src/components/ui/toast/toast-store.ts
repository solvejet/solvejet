// src/components/ui/toast/toast-store.ts
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Toast } from '@/components/ui/toast/types';

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>(set => ({
  toasts: [],
  addToast: (toast): void => {
    const id = uuidv4();
    const duration = toast.duration ?? 5000;

    set(state => ({
      toasts: [
        ...state.toasts,
        {
          ...toast,
          id,
        },
      ],
    }));

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        set(state => ({
          toasts: state.toasts.filter(t => t.id !== id),
        }));
        toast.onClose?.();
      }, duration);
    }
  },
  removeToast: (id): void => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },
  clearToasts: (): void => {
    set({ toasts: [] });
  },
}));
