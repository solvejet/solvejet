// src/app/admin/contacts/[id]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { useToastStore } from '@/components/ui/toast/toast-store';
import { useAPI } from '@/hooks/useAPI';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Globe,
  Check,
  X,
  MapPin,
  Calendar,
  UserCircle,
  CheckCircle,
  Clock,
  Inbox,
} from 'lucide-react';
import type { JSX } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

// For the status buttons, we can also use Shadcn UI's RadioGroup component
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Define the contact submission type to match our MongoDB model
interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  services: {
    customSoftware: boolean;
    webDevelopment: boolean;
    mobileDevelopment: boolean;
    cloudServices: boolean;
    aiSolutions: boolean;
    staffAugmentation: boolean;
    other: boolean;
  };
  status: 'new' | 'in_progress' | 'completed';
  source: string;
  notificationSent: boolean;
  emailConfirmationSent: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

// API response type
interface ContactDetailResponse {
  success: boolean;
  contact: ContactSubmission;
  message?: string;
}

export default function ContactDetailPage(): JSX.Element {
  const [currentStatus, setCurrentStatus] = useState<'new' | 'in_progress' | 'completed'>('new');

  const params = useParams();
  const router = useRouter();
  const toast = useToastStore();
  const api = useAPI();
  const queryClient = useQueryClient();
  const contactId = params.id as string;

  // Use react-query for data fetching to properly cache and prevent redundant requests
  const {
    data: contactData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['contact', contactId],
    queryFn: async () => {
      try {
        const response = await api.get<ContactDetailResponse>(`/admin/contacts/${contactId}`);

        if (!response.success) {
          throw new Error('Failed to load contact details');
        }

        return response.contact;
      } catch (err) {
        console.error('Error fetching contact details:', err);
        throw err;
      }
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Update current status when contact data is loaded
  useEffect(() => {
    if (contactData) {
      setCurrentStatus(contactData.status);
    }
  }, [contactData]);

  // Mutation for status changes
  const statusMutation = useMutation({
    mutationFn: async (newStatus: 'new' | 'in_progress' | 'completed') => {
      return await api.patch(`/admin/contacts/${contactId}/status`, { status: newStatus });
    },
    onSuccess: () => {
      // Invalidate both the specific contact and the contacts list queries
      void queryClient.invalidateQueries({ queryKey: ['contact', contactId] });
      void queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  // Handle status change
  const handleStatusChange = useCallback(
    (newStatus: 'new' | 'in_progress' | 'completed'): void => {
      if (newStatus === currentStatus) return;

      statusMutation.mutate(newStatus, {
        onSuccess: () => {
          setCurrentStatus(newStatus);
          toast.addToast({
            title: 'Status Updated',
            message: `Contact status changed to ${newStatus.replace('_', ' ')}`,
            variant: 'success',
          });
        },
        onError: err => {
          console.error('Error updating status:', err);
          toast.addToast({
            title: 'Error',
            message: 'Failed to update contact status',
            variant: 'error',
          });
        },
      });
    },
    [contactId, currentStatus, statusMutation, toast]
  );

  // Format services as a list with icons
  const formatServices = useCallback((services: ContactSubmission['services']): string[] => {
    const serviceItems = [];
    if (services.customSoftware) serviceItems.push('Custom Software');
    if (services.webDevelopment) serviceItems.push('Web Development');
    if (services.mobileDevelopment) serviceItems.push('Mobile Development');
    if (services.cloudServices) serviceItems.push('Cloud Services');
    if (services.aiSolutions) serviceItems.push('AI Solutions');
    if (services.staffAugmentation) serviceItems.push('Staff Augmentation');
    if (services.other) serviceItems.push('Other');

    return serviceItems;
  }, []);

  // Format date string
  const formatDate = useCallback((dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  // Get status badge
  const getStatusBadge = useCallback((status: 'new' | 'in_progress' | 'completed'): JSX.Element => {
    const styles = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };

    const icons = {
      new: <Inbox className="h-4 w-4 mr-1" />,
      in_progress: <Clock className="h-4 w-4 mr-1" />,
      completed: <CheckCircle className="h-4 w-4 mr-1" />,
    };

    const labels = {
      new: 'New',
      in_progress: 'In Progress',
      completed: 'Completed',
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {icons[status]}
        {labels[status]}
      </span>
    );
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-element-500" />
      </div>
    );
  }

  if (error || !contactData) {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => {
              router.push('/admin/contacts');
            }}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Contacts
          </Button>
          <h1 className="text-2xl font-semibold">Contact Details</h1>
        </div>
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Contact</h2>
          <p className="mb-4">{error instanceof Error ? error.message : 'Contact not found'}</p>
          <Button
            onClick={() => {
              router.push('/admin/contacts');
            }}
          >
            Return to Contact List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with navigation and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => {
              router.push('/admin/contacts');
            }}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-semibold">Contact from {contactData.name}</h1>
        </div>
        <div className="flex items-center gap-3">{getStatusBadge(currentStatus)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main contact info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b dark:border-gray-700">
              Contact Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 mt-1">
                  <UserCircle className="h-6 w-6 text-element-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full Name
                  </h3>
                  <p className="text-lg">{contactData.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 mt-1">
                  <Mail className="h-6 w-6 text-element-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email Address
                  </h3>
                  <p className="text-lg">
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-element-600 dark:text-element-400 hover:underline"
                    >
                      {contactData.email}
                    </a>
                  </p>
                </div>
              </div>

              {contactData.phone && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 mt-1">
                    <Phone className="h-6 w-6 text-element-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone Number
                    </h3>
                    <p className="text-lg">
                      <a
                        href={`tel:${contactData.phone}`}
                        className="text-element-600 dark:text-element-400 hover:underline"
                      >
                        {contactData.phone}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {contactData.company && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 mt-1">
                    <Building className="h-6 w-6 text-element-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Company
                    </h3>
                    <p className="text-lg">{contactData.company}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Message */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-element-500" />
              Message
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg whitespace-pre-wrap">
              {contactData.message}
            </div>
          </Card>

          {/* Services Interest */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Check className="h-5 w-5 mr-2 text-element-500" />
              Services Interest
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {formatServices(contactData.services).map((service, index) => (
                <div
                  key={index}
                  className="flex items-center bg-element-50 dark:bg-element-900/30 text-element-700 dark:text-element-300 px-4 py-3 rounded-lg"
                >
                  <Check className="h-5 w-5 mr-2 text-element-500" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Side panel with metadata and actions */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Status Management</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>

                {/* Using Shadcn UI RadioGroup for status selection */}
                <RadioGroup
                  value={currentStatus}
                  onValueChange={(value: string) => {
                    handleStatusChange(value as 'new' | 'in_progress' | 'completed');
                  }}
                  className="space-y-2"
                >
                  <div
                    className={cn(
                      'flex items-center space-x-2 rounded-md border p-3',
                      currentStatus === 'new' && 'bg-element-50 border-element-500'
                    )}
                  >
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="flex items-center cursor-pointer">
                      <Inbox className="h-4 w-4 mr-2" />
                      New
                    </Label>
                  </div>

                  <div
                    className={cn(
                      'flex items-center space-x-2 rounded-md border p-3',
                      currentStatus === 'in_progress' && 'bg-element-50 border-element-500'
                    )}
                  >
                    <RadioGroupItem value="in_progress" id="in_progress" />
                    <Label htmlFor="in_progress" className="flex items-center cursor-pointer">
                      <Clock className="h-4 w-4 mr-2" />
                      In Progress
                    </Label>
                  </div>

                  <div
                    className={cn(
                      'flex items-center space-x-2 rounded-md border p-3',
                      currentStatus === 'completed' && 'bg-element-50 border-element-500'
                    )}
                  >
                    <RadioGroupItem value="completed" id="completed" />
                    <Label htmlFor="completed" className="flex items-center cursor-pointer">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          {/* Metadata */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Submission Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Submitted On
                </h3>
                <p className="mt-1">{formatDate(contactData.createdAt)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  Source
                </h3>
                <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-element-100 text-element-800 dark:bg-element-900 dark:text-element-300">
                  {contactData.source}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  IP Address
                </h3>
                <p className="mt-1">{contactData.ipAddress ?? 'Not recorded'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Notifications
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="mr-2">Email Confirmation:</span>
                    {contactData.emailConfirmationSent ? (
                      <span className="inline-flex items-center text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4 mr-1" /> Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600 dark:text-red-400">
                        <X className="h-4 w-4 mr-1" /> Not Sent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2">Admin Notification:</span>
                    {contactData.notificationSent ? (
                      <span className="inline-flex items-center text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4 mr-1" /> Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600 dark:text-red-400">
                        <X className="h-4 w-4 mr-1" /> Not Sent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
