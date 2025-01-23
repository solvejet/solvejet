// src/components/forms/contact-form.tsx
'use client'

import React, { JSX } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CustomSelect } from '@/components/ui/select'
import { toast } from 'sonner'
import { useAnalytics } from '@/hooks/use-analytics'
import { useCsrf } from '@/hooks/use-csrf'
import { countryCodes, subjectOptions } from '@/data/country-codes'
import {
  Mic,
  Upload,
  Loader2,
  HelpCircle,
  X,
  StopCircle,
  File as FileIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

// Constants and types
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
] as const

type AcceptedFileType = (typeof ACCEPTED_FILE_TYPES)[number]

// Form schema with strict types
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid corporate email'),
  countryCode: z.string().min(1, 'Country code is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(1, 'Please select a subject'),
  details: z.string().min(10, 'Please provide more details'),
  message: z.string().optional(), // Add this
  files: z
    .custom<FileList>()
    .transform((files) => (files ? Array.from(files) : []))
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      'Max file size is 10MB'
    )
    .refine(
      (files) =>
        files.every((file) =>
          ACCEPTED_FILE_TYPES.includes(file.type as AcceptedFileType)
        ),
      'Invalid file type'
    )
    .optional(),
  voiceNote: z.instanceof(Blob).optional(),
})

type FormData = z.infer<typeof formSchema>

interface ContactResponse {
  success: boolean
  message?: string
  data?: {
    id: string
    createdAt: string
  }
  error?: string
  details?: Array<{
    code: string
    message: string
    path: string[]
  }>
}

export function ContactForm(): JSX.Element {
  const { trackGTMEvent } = useAnalytics()
  const { csrfToken, isLoading: isLoadingCsrf, error: csrfError } = useCsrf()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: '+1',
      subject: '',
    },
  })

  // File state
  const [files, setFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Recording state
  const [isRecording, setIsRecording] = React.useState(false)
  const [recordingTime, setRecordingTime] = React.useState(0)
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null)
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Handle CSRF error
  React.useEffect(() => {
    if (csrfError) {
      toast.error(
        'Failed to initialize form security. Please refresh the page.'
      )
    }
  }, [csrfError])

  // File handling utilities
  const fileToBase64 = async (file: File | Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  // File handlers
  const handleFileSelect = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
      if (!selectedFiles) return

      const filesArray = Array.from(selectedFiles)
      const validFiles = filesArray.filter(
        (file) =>
          file.size <= MAX_FILE_SIZE &&
          ACCEPTED_FILE_TYPES.includes(file.type as AcceptedFileType)
      )

      setFiles((prev) => [...prev, ...validFiles])

      trackGTMEvent({
        event: 'contact_form_file_upload',
        fileData: {
          count: validFiles.length,
          types: validFiles.map((file) => file.type),
        },
      })
    },
    [trackGTMEvent]
  )

  const handleFileRemove = React.useCallback(
    (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index))
      trackGTMEvent({ event: 'contact_form_file_remove' })
    },
    [trackGTMEvent]
  )

  // Recording handlers
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('Your browser does not support audio recording')
        return
      }

      // Try to get stream with the correct constraint types
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/ogg',
      })
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())

        trackGTMEvent({
          event: 'contact_form_voice_recorded',
          recordingData: {
            duration: recordingTime,
            size: blob.size,
            mimeType: mediaRecorder.mimeType,
          },
        })
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000) as unknown as NodeJS.Timeout
    } catch (error) {
      console.error('Microphone error:', error)

      if (error instanceof Error) {
        switch (error.name) {
          case 'NotAllowedError':
            toast.error('Please allow microphone access when prompted')
            break
          case 'NotFoundError':
            toast.error(
              'No microphone found. Please check your device settings'
            )
            break
          case 'NotReadableError':
            toast.error('Microphone is already in use by another application')
            break
          default:
            toast.error('Failed to access microphone. Please try again')
        }
      }
    }
  }

  const stopRecording = React.useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      setRecordingTime(0)
    }
  }, [isRecording])

  // Form submission
  const onSubmit = async (data: FormData): Promise<void> => {
    if (!csrfToken) {
      toast.error('Security token missing. Please refresh the page.')
      return
    }

    try {
      trackGTMEvent({
        event: 'contact_form_submit_attempt',
        formData: {
          hasFiles: files.length > 0,
          hasVoiceNote: !!audioBlob,
        },
      })

      // Process files
      const processedFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await fileToBase64(file),
        }))
      )

      // Process voice note
      let processedVoiceNote
      if (audioBlob) {
        const voiceNoteData = await fileToBase64(audioBlob)
        processedVoiceNote = { data: voiceNoteData }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          ...data,
          message: data.details, // Add this line
          files: files.length > 0 ? processedFiles : undefined,
          voiceNote: processedVoiceNote,
          consent: true,
        }),
      })

      const result: ContactResponse = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form')
      }

      trackGTMEvent({
        event: 'contact_form_submit_success',
        formData: {
          id: result.data?.id,
          hasFiles: files.length > 0,
          hasVoiceNote: !!audioBlob,
        },
      })

      toast.success("Form submitted successfully! We'll be in touch soon.")
      reset()
      setFiles([])
      setAudioBlob(null)
    } catch (error) {
      console.error('Error submitting form:', error)
      trackGTMEvent({
        event: 'contact_form_submit_error',
        formData: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })
      toast.error('Failed to submit form. Please try again.')
    }
  }

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Utility function for formatting time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoadingCsrf) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (csrfError) {
    return (
      <div className="rounded-lg border border-destructive p-4 text-center">
        <p className="text-destructive">
          Failed to initialize form security. Please refresh the page.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name Input */}
        <Input
          label="Name*"
          error={errors.name?.message}
          {...register('name')}
        />

        {/* Company Input */}
        <Input label="Company" {...register('company')} />

        {/* Email Input */}
        <Input
          label="Corporate email*"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Phone Input Group */}
        <div className="flex gap-2">
          <div className="w-1/3">
            <Controller
              name="countryCode"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={countryCodes.map(({ code, country }) => ({
                    value: code,
                    label: country,
                    displayValue: code,
                    icon: (
                      <span className="font-medium text-muted-foreground">
                        {code}
                      </span>
                    ),
                  }))}
                  error={!!errors.countryCode}
                  className="mt-6 h-[42px]"
                  placeholder="Code"
                />
              )}
            />
            {errors.countryCode && (
              <p className="mt-1 text-sm text-destructive">
                {errors.countryCode.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Input
              label="Phone*"
              type="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
        </div>

        {/* Subject Select */}
        <div className="md:col-span-2">
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <CustomSelect
                value={field.value}
                onChange={field.onChange}
                options={subjectOptions}
                error={!!errors.subject}
                className="h-[42px]"
                placeholder="Select a subject*"
              />
            )}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-destructive">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <textarea
          {...register('details')}
          className={cn(
            'min-h-[120px] w-full border-b border-input bg-transparent px-0 py-3 text-lg outline-none transition-colors',
            'placeholder:text-muted-foreground/60',
            'focus:border-primary',
            errors.details && 'border-destructive'
          )}
          placeholder="Describe your needs in detail*"
        />
        {errors.details && (
          <p className="text-sm text-destructive">{errors.details.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Voice Recording Section */}
        <motion.div
          className="rounded-lg border border-dashed p-6"
          whileHover={{ borderColor: 'hsl(var(--primary))' }}
          transition={{ duration: 0.2 }}
        >
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Record a voice message about your project
          </p>

          <div className="space-y-4">
            <Button
              type="button"
              variant={isRecording ? 'destructive' : 'outline'}
              className="w-full"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" />
                  Stop Recording ({formatTime(recordingTime)})
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Start Recording
                </>
              )}
            </Button>

            <AnimatePresence>
              {audioBlob && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2"
                >
                  <audio
                    controls
                    src={URL.createObjectURL(audioBlob)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAudioBlob(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          className="rounded-lg border border-dashed p-6"
          whileHover={{ borderColor: 'hsl(var(--primary))' }}
          transition={{ duration: 0.2 }}
        >
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Attach additional documents
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <button
                type="button"
                className="ml-2 text-muted-foreground hover:text-primary"
                title="Max file size: 10MB per file. Supported formats: PDF, DOC, DOCX, JPG, PNG"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept={ACCEPTED_FILE_TYPES.join(',')}
              onChange={handleFileSelect}
            />

            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {files.map((file, index) => (
                    <motion.div
                      key={`${file.name}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between rounded-md bg-accent/50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileRemove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-end gap-4">
        {/* Privacy Policy Link */}
        <p className="text-sm text-muted-foreground">
          By clicking Send, you agree to our{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send'
          )}
        </Button>
      </div>
    </form>
  )
}
