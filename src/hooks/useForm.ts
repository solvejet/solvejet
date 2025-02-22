// src/hooks/useForm.ts
import { useState, useCallback } from 'react';
import { z } from 'zod';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
}

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
  });

  const handleChange = useCallback((name: keyof T, value: T[keyof T]): void => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: undefined },
    }));
  }, []);

  const reset = useCallback((): void => {
    setFormState({
      values: initialValues,
      errors: {},
      isSubmitting: false,
    });
  }, [initialValues]);

  const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      if (validationSchema) {
        const validatedData = await validationSchema.parseAsync(formState.values);
        await onSubmit(validatedData);
      } else {
        await onSubmit(formState.values);
      }
      
      // Optional: Reset form after successful submission
      // reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as Partial<Record<keyof T, string[]>>;
        const formattedErrors: Partial<Record<keyof T, string>> = {};
        
        Object.entries(fieldErrors).forEach(([key, value]) => {
          if (value && value.length > 0) {
            formattedErrors[key as keyof T] = value[0];
          }
        });

        setFormState(prev => ({
          ...prev,
          errors: formattedErrors,
        }));
      } else if (error instanceof Error) {
        // Handle other types of errors
        setFormState(prev => ({
          ...prev,
          errors: {
            form: error.message,
          } as Partial<Record<keyof T, string>>,
        }));
      }
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.values, onSubmit, validationSchema]);

  return {
    values: formState.values,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  };
};

//  Example Usage with Types
// interface LoginForm {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

// const loginSchema = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   rememberMe: z.boolean(),
// });

// Usage example:
/*
const LoginComponent: React.FC = () => {
  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        type="email"
        value={form.values.email}
        onChange={(e) => form.handleChange('email', e.target.value)}
      />
      {form.errors.email && <span>{form.errors.email}</span>}
      
      <input
        type="password"
        value={form.values.password}
        onChange={(e) => form.handleChange('password', e.target.value)}
      />
      {form.errors.password && <span>{form.errors.password}</span>}
      
      <input
        type="checkbox"
        checked={form.values.rememberMe}
        onChange={(e) => form.handleChange('rememberMe', e.target.checked)}
      />
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
*/