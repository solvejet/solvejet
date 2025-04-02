// src/app/admin/contacts/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table/Table';
import type { Column, CellValue } from '@/components/ui/table/types';
import { useToastStore } from '@/components/ui/toast/toast-store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAPI } from '@/hooks/useAPI';
import { Inbox, Search, Filter, ArrowUpDown, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { JSX } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

// API response interface
interface ContactsResponse {
  success: boolean;
  contacts: ContactSubmission[];
  message?: string;
}

// Extended contact type that works with our Table component
interface TableContactSubmission extends Omit<ContactSubmission, 'services'> {
  services: CellValue;
  [key: string]: CellValue;
}

export default function ContactListPage(): JSX.Element {
  const [filteredContacts, setFilteredContacts] = useState<TableContactSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const toast = useToastStore();
  const api = useAPI();
  const queryClient = useQueryClient();

  // Use react-query for better caching and request management
  const {
    data: contactsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      try {
        const response = await api.get<ContactsResponse>('/admin/contacts');

        // Check if response is successful and has contacts array
        if (!response.success || !Array.isArray(response.contacts)) {
          console.error('Invalid response format:', response);
          return [];
        }

        // Convert ContactSubmission to TableContactSubmission
        return response.contacts.map(contact => {
          return {
            ...contact,
            // Convert each property to ensure it matches CellValue
            _id: contact._id as CellValue,
            name: contact.name as CellValue,
            email: contact.email as CellValue,
            company: contact.company as CellValue,
            phone: contact.phone as CellValue,
            message: contact.message as CellValue,
            services: contact.services as unknown as CellValue,
            status: contact.status as CellValue,
            source: contact.source as CellValue,
            notificationSent: contact.notificationSent as CellValue,
            emailConfirmationSent: contact.emailConfirmationSent as CellValue,
            createdAt: contact.createdAt as CellValue,
            updatedAt: contact.updatedAt as CellValue,
          } as TableContactSubmission;
        });
      } catch (err) {
        console.error('Error fetching contacts:', err);
        // Return an empty array instead of undefined to prevent mapping errors
        return [];
      }
    },
    staleTime: 60000, // Consider data fresh for 1 minute to prevent excessive requests
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
  });

  // Mutation for status changes
  const statusMutation = useMutation({
    mutationFn: async ({
      contactId,
      newStatus,
    }: {
      contactId: string;
      newStatus: 'new' | 'in_progress' | 'completed';
    }) => {
      return api.patch(`/admin/contacts/${contactId}/status`, { status: newStatus });
    },
    onSuccess: () => {
      // Invalidate and refetch queries after mutation
      void queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  // Apply filters whenever filter state or contacts change
  useEffect(() => {
    // If contactsData is undefined or empty, set filteredContacts to empty array
    if (!contactsData || contactsData.length === 0) {
      setFilteredContacts([]);
      return;
    }

    let result = [...contactsData];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(
        contact => typeof contact.status === 'string' && contact.status === statusFilter
      );
    }

    // Apply search filter (case-insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        contact =>
          (typeof contact.name === 'string' && contact.name.toLowerCase().includes(query)) ||
          (typeof contact.email === 'string' && contact.email.toLowerCase().includes(query)) ||
          (typeof contact.company === 'string' && contact.company.toLowerCase().includes(query))
      );
    }

    setFilteredContacts(result);
  }, [contactsData, statusFilter, searchQuery]);

  // Handle status change
  const handleStatusChange = useCallback(
    (contactId: string, newStatus: 'new' | 'in_progress' | 'completed'): void => {
      statusMutation.mutate(
        { contactId, newStatus },
        {
          onSuccess: () => {
            toast.addToast({
              title: 'Status Updated',
              message: `Contact status changed to ${newStatus}`,
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
        }
      );
    },
    [statusMutation, toast]
  );

  // Handle row click to navigate to contact details
  const handleRowClick = useCallback(
    (contact: Record<string, CellValue>): void => {
      // Extract the _id from the row data
      const contactId = contact._id as string;
      if (contactId) {
        router.push(`/admin/contacts/${contactId}`);
      }
    },
    [router]
  );

  // Format services as a comma-separated list
  const formatServices = useCallback((services: unknown): string => {
    if (!services || typeof services !== 'object') return '';

    // Cast to the right type with safety checks
    const servicesObj = services as {
      customSoftware?: boolean;
      webDevelopment?: boolean;
      mobileDevelopment?: boolean;
      cloudServices?: boolean;
      aiSolutions?: boolean;
      staffAugmentation?: boolean;
      other?: boolean;
    };

    const selectedServices = [];
    if (servicesObj.customSoftware) selectedServices.push('Custom Software');
    if (servicesObj.webDevelopment) selectedServices.push('Web Development');
    if (servicesObj.mobileDevelopment) selectedServices.push('Mobile Development');
    if (servicesObj.cloudServices) selectedServices.push('Cloud Services');
    if (servicesObj.aiSolutions) selectedServices.push('AI Solutions');
    if (servicesObj.staffAugmentation) selectedServices.push('Staff Augmentation');
    if (servicesObj.other) selectedServices.push('Other');

    return selectedServices.join(', ');
  }, []);

  // Handle the refetch button click - properly handling the Promise
  const handleRefetch = useCallback(() => {
    void refetch();
  }, [refetch]);

  // Define table columns - modified for type compatibility
  const columns: Column<Record<string, CellValue>>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
      // Remove filterable property from columns to avoid duplicate search functionality
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      cell: (value: CellValue) => (
        <div className="truncate max-w-[200px]">
          {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}
        </div>
      ),
    },
    {
      id: 'services',
      header: 'Services',
      accessorKey: 'services',
      cell: (value: CellValue) => (
        <div className="truncate max-w-[200px]">{formatServices(value)}</div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value: CellValue): React.ReactNode => {
        const status = typeof value === 'string' ? value : '';
        const getStatusStyles = (): string => {
          switch (status) {
            case 'new':
              return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'in_progress':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'completed':
              return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
          }
        };

        const getStatusIcon = (): JSX.Element => {
          switch (status) {
            case 'new':
              return <Inbox className="h-4 w-4 mr-1" />;
            case 'in_progress':
              return <Clock className="h-4 w-4 mr-1" />;
            case 'completed':
              return <CheckCircle className="h-4 w-4 mr-1" />;
            default:
              return <AlertCircle className="h-4 w-4 mr-1" />;
          }
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}
          >
            {getStatusIcon()}
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </span>
        );
      },
    },
    {
      id: 'createdAt',
      header: 'Date',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (value: CellValue): JSX.Element => {
        const dateStr = value ? String(value) : '';
        let formattedDate = 'Invalid date';

        try {
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
          }
        } catch (e) {
          console.error('Date parsing error:', e);
        }

        return <span>{formattedDate}</span>;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: '_id',
      cell: (value: CellValue, row: Record<string, CellValue>) => (
        <div
          className="flex space-x-2"
          onClick={e => {
            // Stop propagation to prevent row click
            e.stopPropagation();
            e.preventDefault(); // Also prevent default behavior
          }}
          style={{ position: 'static' }} // Use static position to avoid z-index issues
        >
          {/* Using Shadcn UI Select component */}
          <Select
            defaultValue={row.status as string}
            onValueChange={(newValue: string) => {
              if (typeof value === 'string') {
                handleStatusChange(value, newValue as 'new' | 'in_progress' | 'completed');
              }
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Change Status</SelectLabel>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Contacts</h1>
        </div>
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Contacts</h2>
          <p className="mb-4">
            {error instanceof Error ? error.message : 'An error occurred while loading contacts'}
          </p>
          <Button onClick={handleRefetch}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-element-500 to-element-700 dark:from-element-400 dark:to-element-600">
            Contact Submissions
          </span>
          <div className="h-1 w-0 group-hover:w-1/3 bg-element-500 mt-1 transition-all duration-300"></div>
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            leftIcon={<ArrowUpDown className="h-4 w-4" />}
            onClick={handleRefetch}
            isLoading={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search by name, email or company..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-element-500 dark:bg-gray-800"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium mr-2">Status:</span>
            {/* Status filter with Shadcn UI Select */}
            <Select
              defaultValue={statusFilter}
              onValueChange={(value: string) => {
                setStatusFilter(value);
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Contact Table with proper styling for scrolling */}
      <div className="relative">
        <Table
          data={filteredContacts as Record<string, CellValue>[]}
          columns={columns}
          onRowClick={handleRowClick}
          emptyMessage="No contact submissions found"
          defaultRowsPerPage={10}
          stickyHeader
          loading={isLoading}
        />
      </div>
    </div>
  );
}
