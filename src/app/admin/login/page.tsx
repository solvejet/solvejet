// src/app/admin/login/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAdminAuth } from '@/hooks/use-admin-auth'
import { useCsrf } from '@/hooks/use-csrf'
import { toast } from 'sonner'
import { Lock, Mail, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Form schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

const backgroundVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function LoginPage() {
  const { login } = useAdminAuth()
  const router = useRouter()
  const { isLoading: isCsrfLoading, error: csrfError } = useCsrf()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Show error if CSRF token fails to load
  React.useEffect(() => {
    if (csrfError) {
      toast.error(
        'Failed to initialize security token. Please refresh the page.'
      )
    }
  }, [csrfError])

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      toast.success('Login successful')
      router.push('/admin/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    }
  }

  // Early return for loading state
  if (isCsrfLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Theme toggle */}
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>

      {/* Animated background gradients */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute -left-[10%] top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 mix-blend-multiply blur-[130px] dark:mix-blend-normal" />
        <div className="absolute right-[20%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 mix-blend-multiply blur-[130px] dark:mix-blend-normal" />
        <div className="absolute bottom-0 left-[20%] h-[400px] w-[600px] rounded-full bg-emerald-500/10 mix-blend-multiply blur-[130px] dark:mix-blend-normal" />
      </motion.div>

      {/* Login container */}
      <motion.div
        variants={formVariants}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-md"
      >
        {/* Glass card */}
        <div className="glass-card overflow-hidden rounded-xl border bg-background/50 p-8 backdrop-blur-[12px]">
          {/* Logo section */}
          <div className="mb-8 text-center">
            <Logo width={140} height={46} className="mx-auto" />
            <h1 className="mt-6 text-2xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  icon={<Mail className="h-5 w-5" />}
                  autoComplete="email"
                  {...register('email')}
                />

                <Input
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  icon={<Lock className="h-5 w-5" />}
                  autoComplete="current-password"
                  {...register('password')}
                />
              </div>

              <Button
                type="submit"
                className={cn(
                  'w-full gap-2',
                  isSubmitting && 'cursor-not-allowed opacity-50'
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </AnimatePresence>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SolveJet. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
