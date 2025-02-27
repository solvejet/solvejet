// src/app/(admin)/components/TopBar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import type { JSX } from 'react';

export function TopBar(): JSX.Element {
  const [notifications] = useState(3); // Example notification count
  const router = useRouter();

  // Convert to regular function since we don't need async here
  const handleLogout = (): void => {
    // Use void operator to explicitly ignore the promise
    router.push('/admin/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard" className="text-2xl font-bold">
            Admin Portal
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(): void => {
              router.push('/admin/settings');
            }}
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(): void => {
              router.push('/admin/profile');
            }}
          >
            <User className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="sm" onClick={handleLogout} className="ml-4">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
