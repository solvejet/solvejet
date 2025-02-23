// src/app/page.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Download, Lock, Mail, Plus, Search, User } from 'lucide-react';
import type { ReactElement } from 'react';
import { useState } from 'react';

export default function Home(): ReactElement {
  // State for form validation
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();

  // Form handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError(undefined);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    if (!value.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">UI Components</h1>

        {/* Input Components Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Input Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Inputs */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Basic Inputs</h3>
              <Input
                label="Username"
                placeholder="Enter your username"
                leftIcon={<User className="h-4 w-4" />}
              />
              <Input
                label="Search"
                placeholder="Search anything..."
                leftIcon={<Search className="h-4 w-4" />}
              />
              <Input label="Disabled Input" placeholder="This input is disabled" disabled />
            </div>

            {/* Input Variants */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Input Variants</h3>
              <Input label="Default Input" placeholder="Default input style" />
              <Input
                label="Success Input"
                placeholder="Success state"
                variant="success"
                defaultValue="Correct value"
              />
              <Input
                label="Error Input"
                placeholder="Error state"
                variant="error"
                error="This field has an error"
              />
            </div>

            {/* Form Validation */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Form Validation</h3>
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                variant={emailError ? 'error' : 'default'}
                error={emailError}
                leftIcon={<Mail className="h-4 w-4" />}
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                showPasswordToggle={true}
                variant={passwordError ? 'error' : 'default'}
                error={passwordError}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-4 w-4" />}
                fullWidth
              />
            </div>

            {/* Input Sizes */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Input Sizes</h3>
              <Input label="Small Input" placeholder="Small size" size="sm" />
              <Input label="Default Input" placeholder="Default size" />
              <Input label="Large Input" placeholder="Large size" size="lg" />
            </div>
          </div>
        </section>

        {/* Button Components Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Button Components</h2>

          {/* Basic Variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Basic Variants</h3>
              <div className="space-y-2">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Sizes</h3>
              <div className="space-y-2">
                <Button size="sm">Small Button</Button>
                <Button>Default Size</Button>
                <Button size="lg">Large Button</Button>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">States</h3>
              <div className="space-y-2">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
          </div>

          {/* Button Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">With Icons</h3>
              <div className="space-y-2">
                <Button leftIcon={<Mail className="h-4 w-4" />}>Send Email</Button>
                <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Next Step</Button>
                <Button
                  leftIcon={<Download className="h-4 w-4" />}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Animations</h3>
              <div className="space-y-2">
                <Button animation="slideUp">Slide Up</Button>
                <Button animation="glow">Glow Effect</Button>
                <Button animation="ripple">Ripple Effect</Button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
              <h3 className="text-lg font-medium mb-4">Full Width</h3>
              <div className="space-y-2">
                <Button fullWidth>Full Width Button</Button>
                <Button
                  variant="secondary"
                  fullWidth
                  leftIcon={<Mail className="h-4 w-4" />}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Subscribe Newsletter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
