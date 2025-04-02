// src/components/admin/Notifications/NotificationsPanel.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Inbox } from 'lucide-react';
import { useAPI } from '@/hooks/useAPI';
import { useToastStore } from '@/components/ui/toast/toast-store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

interface Notification {
  _id: string;
  type: 'new_contact' | 'contact_status_changed' | 'system_alert';
  title: string;
  message: string;
  data?: {
    submissionId?: string;
    email?: string;
    source?: string;
    services?: string;
    [key: string]: unknown;
  };
  recipients: string[];
  isRead: boolean;
  createdAt: string;
}

export const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const api = useAPI();
  const toast = useToastStore();
  const router = useRouter();

  // Fetch notifications
  const fetchNotifications: () => Promise<void> = async () => {
    setLoading(true);
    try {
      const data = await api.get<{
        notifications: Notification[];
        unreadCount: number;
      }>('/admin/notifications');

      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      toast.addToast({
        title: 'Error',
        message: 'Failed to load notifications',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string): Promise<void> => {
    try {
      await api.patch(`/admin/notifications/${notificationId}/read`, {});

      // Update UI immediately
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === notificationId ? { ...notification, isRead: true } : notification
        )
      );

      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async (): Promise<void> => {
    try {
      await api.post('/admin/notifications/mark-all-read', {});

      // Update UI immediately
      setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));

      // Update unread count
      setUnreadCount(0);

      toast.addToast({
        title: 'Success',
        message: 'All notifications marked as read',
        variant: 'success',
      });
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      toast.addToast({
        title: 'Error',
        message: 'Failed to mark notifications as read',
        variant: 'error',
      });
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification): void => {
    // Mark as read
    if (!notification.isRead) {
      void markAsRead(notification._id);
    }

    // Navigate if needed
    if (notification.type === 'new_contact' && notification.data?.submissionId) {
      router.push(`/admin/contacts/${notification.data.submissionId}`);
      setIsOpen(false);
    } else if (notification.type === 'contact_status_changed' && notification.data?.submissionId) {
      router.push(`/admin/contacts/${notification.data.submissionId}`);
      setIsOpen(false);
    }
  };

  // Toggle notification panel
  const togglePanel = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Fetch latest notifications when opening
      void fetchNotifications();
    }
  };

  // Initial fetch
  useEffect(() => {
    void fetchNotifications();

    // Set up polling
    const intervalId = setInterval(() => {
      void fetchNotifications();
    }, 60000); // Poll every minute

    return (): void => {
      clearInterval(intervalId);
    };
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get icon for notification type
  const getNotificationIcon = (type: Notification['type']): JSX.Element => {
    switch (type) {
      case 'new_contact':
        return <Inbox className="h-5 w-5 text-blue-500" />;
      case 'contact_status_changed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'system_alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Format date
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${String(diffMins)}m ago`;
    if (diffHours < 24) return `${String(diffHours)}h ago`;
    if (diffDays < 7) return `${String(diffDays)}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        ref={buttonRef}
        onClick={togglePanel}
        className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-element-500"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-lg">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => {
                    void markAllAsRead();
                  }}
                  className="text-sm text-element-600 dark:text-element-400 hover:underline"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close notifications"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-grow">
            {loading && notifications.length === 0 ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-element-500"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="h-10 w-10 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No notifications yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map(notification => (
                  <li
                    key={notification._id}
                    className={cn(
                      'p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors',
                      !notification.isRead && 'bg-blue-50 dark:bg-blue-900/20'
                    )}
                    onClick={() => {
                      handleNotificationClick(notification);
                    }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              !notification.isRead
                                ? 'text-gray-900 dark:text-gray-100'
                                : 'text-gray-700 dark:text-gray-300'
                            )}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-element-600 dark:text-element-400 w-full"
              onClick={() => {
                void fetchNotifications();
                toast.addToast({
                  title: 'Refreshed',
                  message: 'Notifications refreshed successfully',
                  variant: 'info',
                });
              }}
            >
              Refresh Notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
