// src/app/admin/login/page.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import type { JSX } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { useToastStore } from '@/components/ui/toast/toast-store';
import { useForm } from '@/hooks/useForm';
import { useAuthStore } from '@/store/auth-store';
import { secureInputValidation } from '@/lib/security/validation';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';

// Login form validation schema
const loginSchema = z.object({
  email: secureInputValidation.email,
  password: z.string().min(6, 'Password must be at least 6 characters'),
  // Make sure rememberMe is always a boolean, not undefined
  rememberMe: z.boolean().default(false),
});

// Create a proper interface as required by ESLint and satisfying Record<string, unknown> constraint
interface LoginFormData extends Record<string, unknown> {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function AdminLogin(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToastStore();
  const { isAuthenticated, login: storeLogin } = useAuthStore();
  const router = useRouter();

  // Initialize form with useForm hook for better validation and tracking
  const form = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    // Explicitly cast the schema to match the expected type
    validationSchema: loginSchema as z.ZodType<LoginFormData>,
    formId: 'admin_login',
    tracking: {
      category: 'admin_auth',
      // Disable tracking for now until we fix analytics configuration
      disableTracking: true,
    },
    onSubmit: async (formData: LoginFormData): Promise<void> => {
      setIsLoading(true);

      try {
        // Use the direct auth store login function
        const success = await storeLogin(formData.email, formData.password, formData.rememberMe);

        if (success) {
          toast.addToast({
            title: 'Success',
            message: 'Welcome to the admin dashboard',
            variant: 'success',
          });

          // Use Next.js router.push instead of window.location.replace
          // This avoids the full page refresh that can cause MIME type issues
          router.push('/admin/dashboard');
        } else {
          setIsLoading(false);
          toast.addToast({
            title: 'Authentication Failed',
            message: 'Invalid email or password. Please try again.',
            variant: 'error',
          });
        }
      } catch (error: unknown) {
        setIsLoading(false);
        console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');

        toast.addToast({
          title: 'Error',
          message: 'An unexpected error occurred. Please try again later.',
          variant: 'error',
        });
      }
    },
  });

  // If already authenticated, redirect to dashboard - use effect for this
  useEffect((): (() => void) => {
    if (isAuthenticated) {
      // Use Next.js router for navigation
      router.push('/admin/dashboard');
    }
    return (): void => {
      // Empty cleanup function
    };
  }, [isAuthenticated, router]);

  // Memoized handlers to prevent unnecessary renders
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      form.handleChange('email', e.target.value);
    },
    [form]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      form.handleChange('password', e.target.value);
    },
    [form]
  );

  const handleRememberMeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      form.handleChange('rememberMe', e.target.checked);
    },
    [form]
  );

  const handleEmailBlur = useCallback((): void => {
    form.handleBlur('email');
  }, [form]);

  const handlePasswordBlur = useCallback((): void => {
    form.handleBlur('password');
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      void form.handleSubmit(e);
    },
    [form]
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* Replace Shield icon with the SolvejetLogo */}
            <SolvejetLogo width={200} height={80} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in to access the administrative panel
          </p>
        </div>

        {/* Handle form-level errors safely by using type assertion */}
        {(form.errors as { form?: string }).form && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mr-2 mt-0.5" />
            <span>{(form.errors as { form?: string }).form}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <Input
            label="Email Address"
            type="email"
            value={form.values.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={form.touched.email ? form.errors.email : undefined}
            placeholder="admin@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            required
            autoFocus
            autoComplete="email"
            variant={form.touched.email && form.errors.email ? 'error' : 'default'}
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            value={form.values.password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            error={form.touched.password ? form.errors.password : undefined}
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            required
            autoComplete="current-password"
            variant={form.touched.password && form.errors.password ? 'error' : 'default'}
            fullWidth
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-element-500 focus:ring-element-500"
                checked={form.values.rememberMe}
                onChange={handleRememberMeChange}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-element-500 hover:text-element-400">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading || form.isSubmitting}
            fullWidth
            animation="glow"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Admin Portal</span>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>For assistance, contact system administrator</p>
            <p className="mt-1">Secured by SolveJet Security</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
