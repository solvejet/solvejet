// src/components/forms/contact-form.tsx
'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { useAnalytics } from '@/hooks/use-analytics'
import { toast } from 'sonner'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
] as const

type AcceptedFileType = (typeof ACCEPTED_FILE_TYPES)[number]

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid corporate email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  details: z.string().min(10, 'Please describe your needs'),
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

export function ContactForm() {
  const { trackGTMEvent } = useAnalytics()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  // Utility function to convert File to base64
  const fileToBase64 = (file: File | Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const onSubmit = async (data: FormData) => {
    try {
      // Track form submission attempt
      trackGTMEvent({
        event: 'contact_form_submit_attempt',
        formData: {
          hasFiles: files.length > 0,
          hasVoiceNote: !!audioBlob,
        },
      })

      // Process files if present
      const processedFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await fileToBase64(file),
        }))
      )

      // Process voice note if present
      let processedVoiceNote
      if (audioBlob) {
        const voiceNoteData = await fileToBase64(audioBlob)
        processedVoiceNote = { data: voiceNoteData }
      }

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          files: files.length > 0 ? processedFiles : undefined,
          voiceNote: processedVoiceNote,
          consent: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result: ContactResponse = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form')
      }

      // Track successful submission
      trackGTMEvent({
        event: 'contact_form_submit_success',
        formData: {
          id: result.data?.id,
          hasFiles: files.length > 0,
          hasVoiceNote: !!audioBlob,
        },
      })

      // Show success message and reset form
      toast.success("Form submitted successfully! We'll be in touch soon.")
      reset()
      setFiles([])
      setAudioBlob(null)
    } catch (error) {
      console.error('Error submitting form:', error)

      // Track submission error
      trackGTMEvent({
        event: 'contact_form_submit_error',
        formData: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })

      toast.error('Failed to submit form. Please try again.')
    }
  }

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles)
      const validFiles = filesArray.filter(
        (file) =>
          file.size <= MAX_FILE_SIZE &&
          ACCEPTED_FILE_TYPES.includes(file.type as AcceptedFileType)
      )
      setFiles((prev) => [...prev, ...validFiles])

      // Track file selection
      trackGTMEvent({
        event: 'contact_form_file_upload',
        fileData: {
          count: validFiles.length,
          types: validFiles.map((file) => file.type),
        },
      })
    }
  }

  // Handle file removal
  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    trackGTMEvent({ event: 'contact_form_file_remove' })
  }

  // Recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())

        trackGTMEvent({
          event: 'contact_form_voice_recorded',
          recordingData: {
            duration: recordingTime,
            size: blob.size,
          },
        })
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      trackGTMEvent({ event: 'contact_form_voice_start' })

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000) as unknown as NodeJS.Timeout
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast.error('Failed to access microphone. Please check your permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      setRecordingTime(0)
    }
  }

  // Format time for recording
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Name*"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input label="Company" {...register('company')} />

        <Input
          label="Corporate email*"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Phone*"
          type="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

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
        {/* Voice Recording */}
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

        {/* File Upload */}
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
                        <X className="h-4w-4" />
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