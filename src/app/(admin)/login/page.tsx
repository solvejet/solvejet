// src/app/(admin)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToastStore } from '@/components/ui/toast/toast-store';
import { Lock, Mail } from 'lucide-react';
import type { JSX } from 'react';

export default function AdminLogin(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToastStore();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Implement login logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call

      // Example success flow
      toast.addToast({
        title: 'Success',
        message: 'Welcome back!',
        variant: 'success',
      });

      router.push('/admin/dashboard');
    } catch {
      toast.addToast({
        title: 'Error',
        message: 'Invalid credentials',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Admin Login
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e): void => {
            void handleLogin(e);
          }}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              leftIcon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              leftIcon={<Lock className="h-4 w-4" />}
              showPasswordToggle
              required
            />
          </div>

          <div>
            <Button type="submit" isLoading={isLoading} fullWidth>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
