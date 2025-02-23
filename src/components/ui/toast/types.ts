// src/components/ui/toast/types.ts
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}
