// src/hooks/useForm.ts
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  touched: Partial<Record<keyof T, boolean>>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
  formId: string; // Unique identifier for the form
  tracking?: {
    category?: string;
    disableTracking?: boolean;
  };
}

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
  formId,
  tracking = {},
}: UseFormProps<T>): UseFormReturn<T> => {
  const { trackEvent } = useAnalytics();
  const { category = 'form_interaction', disableTracking = false } = tracking;

  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    touched: {},
  });

  // Track form field interaction
  const trackFieldInteraction = useCallback(
    (fieldName: string, action: 'change' | 'blur', hasError?: boolean): void => {
      if (disableTracking) return;

      trackEvent({
        name: `form_field_${action}`,
        category,
        label: `${formId}_${fieldName}`,
        properties: {
          formId,
          fieldName,
          hasError,
          value: action === 'change' ? 1 : undefined,
        },
      });
    },
    [trackEvent, formId, category, disableTracking]
  );

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]): void => {
      setFormState(prev => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        errors: { ...prev.errors, [name]: undefined },
        touched: { ...prev.touched, [name]: true },
      }));

      trackFieldInteraction(String(name), 'change');
    },
    [trackFieldInteraction]
  );

  const handleBlur = useCallback(
    (name: keyof T): void => {
      setFormState(prev => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
      }));

      trackFieldInteraction(String(name), 'blur');
    },
    [trackFieldInteraction]
  );

  const reset = useCallback((): void => {
    setFormState({
      values: initialValues,
      errors: {},
      isSubmitting: false,
      touched: {},
    });

    if (!disableTracking) {
      trackEvent({
        name: 'form_reset',
        category,
        label: formId,
        properties: { formId },
      });
    }
  }, [initialValues, trackEvent, formId, category, disableTracking]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      setFormState(prev => ({ ...prev, isSubmitting: true }));

      if (!disableTracking) {
        trackEvent({
          name: 'form_submit_attempt',
          category,
          label: formId,
          properties: { formId },
        });
      }

      try {
        let validatedData: T;

        if (validationSchema) {
          validatedData = await validationSchema.parseAsync(formState.values);
        } else {
          validatedData = formState.values;
        }

        await onSubmit(validatedData);

        if (!disableTracking) {
          trackEvent({
            name: 'form_submit_success',
            category,
            label: formId,
            properties: { formId },
          });
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

          if (!disableTracking) {
            trackEvent({
              name: 'form_validation_error',
              category,
              label: formId,
              properties: {
                formId,
                fieldErrors: Object.keys(formattedErrors),
              },
            });
          }
        } else if (error instanceof Error) {
          setFormState(prev => ({
            ...prev,
            errors: {
              form: error.message,
            } as Partial<Record<keyof T, string>>,
          }));

          if (!disableTracking) {
            trackEvent({
              name: 'form_submit_error',
              category,
              label: formId,
              properties: {
                formId,
                errorMessage: error.message,
              },
            });
          }
        }
      } finally {
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    },
    [formState.values, onSubmit, validationSchema, trackEvent, formId, category, disableTracking]
  );

  return {
    values: formState.values,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    touched: formState.touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};
