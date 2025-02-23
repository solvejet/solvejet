// src/components/ui/button/TrackedButton.tsx
import { forwardRef } from 'react';
import { Button, type ButtonProps } from './index';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface TrackedButtonProps extends ButtonProps {
  trackingEvent: {
    name: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
  };
}

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ trackingEvent, onClick, ...props }, ref) => {
    const { trackEvent } = useAnalytics();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
      // Track the event
      trackEvent(trackingEvent);

      // Call the original onClick if it exists
      onClick?.(e);
    };

    return <Button ref={ref} onClick={handleClick} {...props} />;
  }
);

TrackedButton.displayName = 'TrackedButton';
