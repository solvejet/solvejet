// src/app/example/ExamplePageClient.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table } from '@/components/ui/table/Table';
import type { CellValue, Column } from '@/components/ui/table/types';
import { useToastStore } from '@/components/ui/toast/toast-store';
import { useCSRF } from '@/hooks/useCSRF';
import { useForm } from '@/hooks/useForm';
import { usePerformance } from '@/hooks/usePerformance';
import { AlertCircle, ArrowRight, Camera, Check, Lock, Mail } from 'lucide-react';
import React, { useCallback, useEffect, useState, type JSX } from 'react';
import { z } from 'zod';

// Form schema definition
const exampleFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'user', 'guest']),
  agreeToTerms: z.boolean(),
});

// Type definitions
type ExampleFormData = z.infer<typeof exampleFormSchema>;

interface TableDataType extends Record<string, CellValue> {
  name: string;
  email: string;
  role: string;
}

// Table configuration
const tableColumns: Column<TableDataType>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    sortable: true,
    filterable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    sortable: true,
    filterable: true,
  },
];

const tableData: TableDataType[] = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Guest' },
];

export function ExamplePageClient(): JSX.Element {
  // State declarations
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('/api/placeholder/400/300');

  // Hooks
  const renderCount = usePerformance('ExamplePage');
  const toast = useToastStore();
  const { token } = useCSRF();

  // Hydration handling
  useEffect((): void => {
    setIsClient(true);
  }, []);

  // Form handling
  const form = useForm<ExampleFormData>({
    initialValues: {
      email: '',
      password: '',
      role: 'user',
      agreeToTerms: false,
    },
    validationSchema: exampleFormSchema,
    formId: 'example_form', // Unique identifier for analytics
    tracking: {
      category: 'example_forms',
      // disableTracking: false, // Enable by default
    },
    onSubmit: async (formData: ExampleFormData): Promise<void> => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use the formData in the success message
        toast.addToast({
          title: 'Success',
          message: `Form submitted successfully for ${formData.email} with role ${formData.role}`,
          variant: 'success',
          duration: 5000,
        });

        // Log the form submission (optional)
        console.warn('Form submitted:', {
          email: formData.email,
          role: formData.role,
          // Omit password for security
        });
      } catch (error) {
        toast.addToast({
          title: 'Error',
          message: error instanceof Error ? error.message : 'An error occurred',
          variant: 'error',
          duration: 5000,
        });
      }
    },
  });

  // Event handlers
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

  const handleRoleChange = useCallback(
    (value: string | string[]): void => {
      if (typeof value === 'string') {
        form.handleChange('role', value as ExampleFormData['role']);
      }
    },
    [form]
  );

  const handleImageChange = useCallback((): void => {
    setSelectedImage(`/api/placeholder/400/300?v=${String(Date.now())}`);
  }, []);

  const showSuccessToast = useCallback((): void => {
    toast.addToast({
      title: 'Success',
      message: 'Operation completed successfully',
      variant: 'success',
      duration: 3000,
    });
  }, [toast]);

  const showErrorToast = useCallback((): void => {
    toast.addToast({
      title: 'Error',
      message: 'Something went wrong',
      variant: 'error',
      duration: 3000,
    });
  }, [toast]);

  // Early return for non-hydrated state
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <main className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">UI Components & Hooks</h1>
          <p className="text-gray-600 dark:text-gray-400">Render count: {renderCount}</p>
          {token && <p className="text-sm text-gray-500">CSRF Protection Active</p>}
        </div>

        {/* Form Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Form Example</h2>
          <form
            onSubmit={(e): void => {
              e.preventDefault();
              void form.handleSubmit(e);
            }}
            className="space-y-6"
          >
            <Input
              label="Email"
              type="email"
              value={form.values.email}
              onChange={handleEmailChange}
              error={form.errors.email}
              leftIcon={<Mail className="h-4 w-4" />}
            />

            <Input
              label="Password"
              type="password"
              value={form.values.password}
              onChange={handlePasswordChange}
              error={form.errors.password}
              leftIcon={<Lock className="h-4 w-4" />}
              showPasswordToggle
            />

            <Select
              label="Role"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'guest', label: 'Guest' },
              ]}
              value={form.values.role}
              onChange={handleRoleChange}
            />

            <Button
              type="submit"
              isLoading={form.isSubmitting}
              fullWidth
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Submit Form
            </Button>
          </form>
        </section>

        {/* Table Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Table Example</h2>
          <Table<TableDataType>
            data={tableData}
            columns={tableColumns}
            showSelection
            stickyHeader
          />
        </section>

        {/* Image Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Image Example</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Image
              src={selectedImage}
              alt="Example image"
              width={400}
              height={300}
              aspectRatio="4:3"
              className="rounded-lg"
            />
            <div className="space-y-4">
              <Button onClick={handleImageChange} leftIcon={<Camera className="h-4 w-4" />}>
                Change Image
              </Button>
            </div>
          </div>
        </section>

        {/* Toast Examples */}
        <section className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Toast Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={showSuccessToast} leftIcon={<Check className="h-4 w-4" />}>
              Success Toast
            </Button>
            <Button
              variant="destructive"
              onClick={showErrorToast}
              leftIcon={<AlertCircle className="h-4 w-4" />}
            >
              Error Toast
            </Button>
          </div>
        </section>

        {/* Button Variants */}
        <section className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Style</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small Size</Button>
            <Button size="lg">Large Size</Button>
            <Button animation="slideUp">Slide Up</Button>
            <Button animation="glow">Glow Effect</Button>
            <Button animation="ripple">Ripple</Button>
            <Button isLoading>Loading</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
