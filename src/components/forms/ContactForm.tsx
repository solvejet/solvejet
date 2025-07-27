// src/components/forms/ContactForm.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
    User,
    Mail,
    MessageSquare,
    Upload,
    Mic,
    MicOff,
    Play,
    Pause,
    Trash2,
    FileText,
    X,
    Send,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, type SelectOption } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { event } from '@/lib/analytics';
import { useConversionTracking } from '@/hooks/useConversionTracking';

interface ContactFormData {
    name: string;
    email: string;
    enquiryType: string;
    subject: string;
    message: string;
    attachments: File[];
    recording: Blob | null;
}

interface FormErrors {
    name?: string;
    email?: string;
    enquiryType?: string;
    subject?: string;
    message?: string;
    attachments?: string;
    recording?: string;
}

interface LocalStorageSubmission {
    id: string;
    timestamp: string;
    data: {
        name: string;
        email: string;
        enquiryType: string;
        subject: string;
        message: string;
        attachments: Array<{
            name: string;
            size: number;
            type: string;
            lastModified: number;
        }>;
        recording: {
            size: number;
            type: string;
            duration: number;
        } | null;
    };
}

interface FileData {
    [key: string]: string | ArrayBuffer | null;
}

const enquiryTypes: SelectOption[] = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'project', label: 'New Project', icon: FileText },
    { value: 'support', label: 'Technical Support', icon: AlertCircle },
    { value: 'partnership', label: 'Partnership', icon: User },
    { value: 'careers', label: 'Careers', icon: User },
    { value: 'consultation', label: 'Free Consultation', icon: MessageSquare },
];

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        enquiryType: '',
        subject: '',
        message: '',
        attachments: [],
        recording: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
    const [isRequestingPermission, setIsRequestingPermission] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Conversion tracking hook
    const { trackContactFormSubmission } = useConversionTracking();

    // Check microphone permission on component mount
    React.useEffect(() => {
        const checkMicrophonePermission = async () => {
            if (typeof window !== 'undefined' && navigator.permissions) {
                try {
                    const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
                    setMicrophonePermission(permission.state);

                    permission.onchange = () => {
                        setMicrophonePermission(permission.state);
                    };
                } catch {
                    console.warn('Permission API not supported');
                    setMicrophonePermission('prompt');
                }
            } else {
                setMicrophonePermission('prompt');
            }
        };

        checkMicrophonePermission();
    }, []);

    // Validation
    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.enquiryType) {
            newErrors.enquiryType = 'Please select an enquiry type';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        if (formData.attachments.length > 5) {
            newErrors.attachments = 'Maximum 5 files allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle input changes
    const handleInputChange = useCallback((
        field: keyof Omit<ContactFormData, 'attachments' | 'recording'>,
        value: string
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    // Handle file upload
    const handleFileUpload = useCallback((files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files).filter(file => {
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, attachments: 'File size must be less than 10MB' }));
                return false;
            }
            return true;
        });

        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newFiles].slice(0, 5)
        }));

        if (errors.attachments) {
            setErrors(prev => ({ ...prev, attachments: undefined }));
        }

        event({
            action: 'upload_files',
            category: 'engagement',
            label: 'contact_form_attachment'
        });
    }, [errors.attachments]);

    // Remove attachment
    const removeAttachment = useCallback((index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    }, []);

    // Request microphone permission
    const requestMicrophonePermission = useCallback(async () => {
        setIsRequestingPermission(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setMicrophonePermission('granted');
            setErrors(prev => ({ ...prev, recording: undefined }));

            event({
                action: 'microphone_permission_granted',
                category: 'engagement',
                label: 'contact_form_microphone_access'
            });
        } catch (error) {
            console.error('Permission denied:', error);
            setMicrophonePermission('denied');

            event({
                action: 'microphone_permission_denied',
                category: 'engagement',
                label: 'contact_form_microphone_access'
            });
        } finally {
            setIsRequestingPermission(false);
        }
    }, []);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                }
            });

            setMicrophonePermission('granted');

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (eventData) => {
                audioChunksRef.current.push(eventData.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setFormData(prev => ({ ...prev, recording: audioBlob }));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingDuration(0);

            recordingTimerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

            setErrors(prev => ({ ...prev, recording: undefined }));

            event({
                action: 'start_recording',
                category: 'engagement',
                label: 'contact_form_voice_recording'
            });
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setMicrophonePermission('denied');

            let errorMessage = 'Unable to access microphone. ';

            if (error instanceof Error) {
                if (error.name === 'NotAllowedError') {
                    errorMessage += 'Please allow microphone access in your browser settings.';
                } else if (error.name === 'NotFoundError') {
                    errorMessage += 'No microphone found on your device.';
                } else if (error.name === 'NotSupportedError') {
                    errorMessage += 'Audio recording is not supported in this browser.';
                } else {
                    errorMessage += 'Please check your browser permissions and try again.';
                }
            } else {
                errorMessage += 'Please check your browser permissions and try again.';
            }

            setErrors(prev => ({ ...prev, recording: errorMessage }));
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
                recordingTimerRef.current = null;
            }

            event({
                action: 'stop_recording',
                category: 'engagement',
                label: 'contact_form_voice_recording_complete'
            });
        }
    }, [isRecording]);

    const playRecording = useCallback(() => {
        if (formData.recording) {
            if (audioElementRef.current) {
                audioElementRef.current.pause();
                audioElementRef.current = null;
            }

            const audio = new Audio(URL.createObjectURL(formData.recording));
            audioElementRef.current = audio;

            audio.onended = () => {
                setIsPlaying(false);
                audioElementRef.current = null;
            };

            audio.play();
            setIsPlaying(true);
        }
    }, [formData.recording]);

    const pauseRecording = useCallback(() => {
        if (audioElementRef.current) {
            audioElementRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const deleteRecording = useCallback(() => {
        setFormData(prev => ({ ...prev, recording: null }));
        setRecordingDuration(0);
        if (audioElementRef.current) {
            audioElementRef.current.pause();
            audioElementRef.current = null;
        }
        setIsPlaying(false);
    }, []);

    // Format recording duration
    const formatDuration = useCallback((seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Save to localStorage with proper typing
    const saveToLocalStorage = useCallback((data: ContactFormData) => {
        try {
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]') as LocalStorageSubmission[];
            const newSubmission: LocalStorageSubmission = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                data: {
                    ...data,
                    attachments: data.attachments.map(file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: file.lastModified,
                    })),
                    recording: data.recording ? {
                        size: data.recording.size,
                        type: data.recording.type,
                        duration: recordingDuration,
                    } : null,
                },
            };

            submissions.push(newSubmission);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            if (data.attachments.length > 0 || data.recording) {
                const fileData: FileData = {};

                data.attachments.forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        fileData[`attachment_${index}`] = reader.result;
                        localStorage.setItem(`files_${newSubmission.id}`, JSON.stringify(fileData));
                    };
                    reader.readAsDataURL(file);
                });

                if (data.recording) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        fileData.recording = reader.result;
                        localStorage.setItem(`files_${newSubmission.id}`, JSON.stringify(fileData));
                    };
                    reader.readAsDataURL(data.recording);
                }
            }

            if (process.env.NODE_ENV === 'development') {
                console.warn('Form data saved to localStorage:', newSubmission);
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [recordingDuration]);

    // Handle form submission
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Save to localStorage first
            saveToLocalStorage(formData);

            // Extract names from full name
            const nameParts = formData.name.trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            // Track conversion on both LinkedIn and Meta
            const conversionResult = await trackContactFormSubmission(
                formData.email,
                firstName,
                lastName,
                undefined, // phone number not collected in this form
                formData.enquiryType,
                'both' // Track on both platforms
            );

            // Log conversion results for debugging
            if (process.env.NODE_ENV === 'development') {
                console.warn('Conversion tracking results:', conversionResult);
            }

            // Simulate API call for form submission (replace with your actual API)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            setShowSuccess(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                enquiryType: '',
                subject: '',
                message: '',
                attachments: [],
                recording: null,
            });
            setRecordingDuration(0);

            // Track successful submission in analytics
            event({
                action: 'submit_contact_form',
                category: 'conversion',
                label: 'contact_form_success'
            });

            // Additional analytics with enquiry type
            event({
                action: 'contact_form_submission_by_type',
                category: 'engagement',
                label: formData.enquiryType
            });

            // Track conversion success/failure
            if (conversionResult.success) {
                event({
                    action: 'conversion_tracking_success',
                    category: 'conversion',
                    label: 'contact_form_conversion_api'
                });
            } else {
                event({
                    action: 'conversion_tracking_failed',
                    category: 'conversion',
                    label: 'contact_form_conversion_api_error'
                });

                // Log the error for debugging
                if (process.env.NODE_ENV === 'development') {
                    console.warn('Conversion tracking failed:', conversionResult.error);
                    if (conversionResult.results) {
                        console.warn('Platform results:', conversionResult.results);
                    }
                }
            }

            // Hide success message after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ message: 'Failed to submit form. Please try again.' });

            // Track form submission error
            event({
                action: 'contact_form_submission_error',
                category: 'error',
                label: error instanceof Error ? error.message : 'unknown_error'
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, saveToLocalStorage, trackContactFormSubmission]);

    if (showSuccess) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                <p className="text-gray-600 mb-6 text-lg">
                    We&apos;ve received your message and will get back to you within 24 hours.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Your inquiry has been tracked and we&apos;ll use this data to improve our services.
                </p>
                <Button
                    onClick={() => setShowSuccess(false)}
                    variant="primary"
                    size="lg"
                >
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name and Email */}
            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    leftIcon={User}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    placeholder="Enter your full name"
                    required
                />
                <Input
                    label="Email Address"
                    leftIcon={Mail}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="Enter your email address"
                    required
                />
            </div>

            {/* Enquiry Type and Subject */}
            <div className="grid sm:grid-cols-2 gap-6">
                <Select
                    label="Enquiry Type"
                    options={enquiryTypes}
                    value={formData.enquiryType}
                    onChange={(e) => handleInputChange('enquiryType', e.target.value)}
                    error={errors.enquiryType}
                    placeholder="Select enquiry type"
                    required
                />
                <Input
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    error={errors.subject}
                    placeholder="Brief subject of your inquiry"
                    required
                />
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-medium mb-3 text-brand-dark">
                    Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your project or inquiry in detail. What are your goals, timeline, and specific requirements?"
                        rows={6}
                        className={cn(
                            'w-full px-6 py-4 border-2 rounded-2xl bg-white',
                            'transition-all duration-200 resize-none',
                            'outline-none focus:outline-none text-base',
                            'placeholder:text-gray-400',
                            errors.message ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-500 hover:border-gray-300'
                        )}
                        required
                    />
                </div>
                {errors.message && (
                    <p className="text-sm text-red-500 mt-2">{errors.message}</p>
                )}
                <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500">
                        Minimum 10 characters
                    </span>
                    <span className={cn(
                        "text-sm",
                        formData.message.length < 10 ? "text-gray-400" : "text-brand-600"
                    )}>
                        {formData.message.length} characters
                    </span>
                </div>
            </div>

            {/* File Attachments */}
            <div>
                <label className="block text-sm font-medium mb-3 text-brand-dark">
                    Attachments (Optional)
                </label>
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
                            'hover:border-brand-400 hover:bg-brand-50',
                            errors.attachments ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        )}
                    >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Click to upload files or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                            Max 5 files, 10MB each. Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, JPG, PNG
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                        className="hidden"
                    />

                    {errors.attachments && (
                        <p className="text-sm text-red-500">{errors.attachments}</p>
                    )}

                    {/* Uploaded Files */}
                    {formData.attachments.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700">
                                Uploaded Files ({formData.attachments.length}/5):
                            </p>
                            {formData.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-brand-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeAttachment(index)}
                                        className="p-2 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                                        aria-label="Remove file"
                                    >
                                        <X className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Voice Recording */}
            <div>
                <label className="block text-sm font-medium mb-3 text-brand-dark">
                    Voice Recording (Optional)
                </label>
                <div className="space-y-4">
                    {!formData.recording ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    variant={isRecording ? "destructive" : "outline"}
                                    size="lg"
                                    icon={isRecording ? MicOff : Mic}
                                    className="flex-shrink-0"
                                    disabled={microphonePermission === 'denied' || isRequestingPermission}
                                >
                                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                                </Button>
                                {isRecording && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-lg font-medium text-gray-700">
                                            Recording... {formatDuration(recordingDuration)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Permission Prompt */}
                            {microphonePermission === 'prompt' && (
                                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                                    <Mic className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-800">
                                            Enable voice recording
                                        </p>
                                        <p className="text-sm text-blue-700 mt-1 mb-3">
                                            Click &quot;Allow Microphone&quot; to record a voice message for your inquiry.
                                        </p>
                                        <Button
                                            type="button"
                                            onClick={requestMicrophonePermission}
                                            variant="outline"
                                            size="sm"
                                            loading={isRequestingPermission}
                                            icon={Mic}
                                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                        >
                                            {isRequestingPermission ? 'Requesting Access...' : 'Enable Voice Recording'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl border border-brand-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center">
                                        <Mic className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">Voice Recording</p>
                                        <p className="text-sm text-gray-600">
                                            Duration: {formatDuration(recordingDuration)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        onClick={isPlaying ? pauseRecording : playRecording}
                                        variant="outline"
                                        size="md"
                                        icon={isPlaying ? Pause : Play}
                                    >
                                        {isPlaying ? 'Pause' : 'Play'}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={deleteRecording}
                                        variant="ghost"
                                        size="md"
                                        icon={Trash2}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {errors.recording && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{errors.recording}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
                <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    loading={isSubmitting}
                    fullWidth
                    icon={Send}
                    disabled={isSubmitting}
                    className="text-lg font-semibold py-4"
                >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                    We&apos;ll respond within 24 hours and use this data to improve our services.
                </p>

                {/* Conversion Tracking Notice */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                        <span className="font-medium">Privacy Notice:</span> Your form submission is tracked for marketing purposes.
                        All personal data is encrypted and handled securely according to our privacy policy.
                        You can opt out of tracking at any time.
                    </p>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;