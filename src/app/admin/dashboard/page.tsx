// src/app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table/Table';
import type { CellValue, Column } from '@/components/ui/table/types';
import {
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  BarChart2,
  Activity,
  Clipboard,
  CheckCircle,
} from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  delay?: number;
}

function StatsCard({ title, value, change, icon, trend, delay = 0 }: StatsCardProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return (): void => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Card
      className={cn(
        'p-6 transition-all duration-500 transform hover:shadow-lg hover:-translate-y-1 hover:border-element-400 relative overflow-hidden group',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-element-100/0 to-element-100/0 group-hover:from-element-100/20 group-hover:to-element-100/5 transition-all duration-500"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="p-3 bg-element-50 dark:bg-element-900 rounded-lg transition-all duration-300 group-hover:bg-element-100 dark:group-hover:bg-element-800 group-hover:shadow">
          {icon}
        </div>
        <span
          className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          } transition-all duration-300 ease-in-out flex items-center ${
            trend === 'up' ? 'group-hover:text-green-600' : 'group-hover:text-red-600'
          }`}
        >
          {change}
          <span
            className={`ml-1 transition-transform duration-300 ${
              trend === 'up'
                ? 'transform rotate-45 group-hover:translate-y-[-2px]'
                : 'transform -rotate-45 group-hover:translate-y-[2px]'
            }`}
          >
            {trend === 'up' ? '↗' : '↘'}
          </span>
        </span>
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-element-600 dark:group-hover:text-element-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-2xl font-semibold mt-2 transition-all duration-500 group-hover:scale-105 origin-left">
          {value}
        </p>
      </div>
    </Card>
  );
}

// Activity Item component for recent activities
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  index: number;
}

function ActivityItem({ icon, title, description, time, index }: ActivityItemProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 100);
    return (): void => {
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      )}
    >
      <div className="p-2 rounded-full bg-element-50 dark:bg-element-900 text-element-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-gray-100">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{description}</p>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{time}</div>
    </div>
  );
}

// Table data types
interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
  [key: string]: CellValue; // Add index signature to satisfy Record constraint
}

const recentOrders: RecentOrder[] = [
  {
    id: '1',
    customer: 'John Doe',
    product: 'Website Development',
    amount: 2999,
    status: 'Completed',
    date: '2024-02-24',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    product: 'Mobile App',
    amount: 4999,
    status: 'Pending',
    date: '2024-02-23',
  },
  {
    id: '3',
    customer: 'Robert Johnson',
    product: 'UI/UX Design',
    amount: 1599,
    status: 'In Progress',
    date: '2024-02-22',
  },
  {
    id: '4',
    customer: 'Emily Adams',
    product: 'API Integration',
    amount: 3499,
    status: 'Completed',
    date: '2024-02-21',
  },
  {
    id: '5',
    customer: 'Michael Chen',
    product: 'Database Migration',
    amount: 2299,
    status: 'Pending',
    date: '2024-02-20',
  },
];

// Recent activities
const recentActivities = [
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: 'Order Completed',
    description: "Emily's project was delivered successfully",
    time: 'Just now',
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: 'New Order',
    description: 'Michael Chen purchased Database Migration service',
    time: '2h ago',
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: 'Meeting Reminder',
    description: 'Team standup in 30 minutes',
    time: '3h ago',
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: 'New Appointment',
    description: 'Client consultation with Jane Smith',
    time: '5h ago',
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: 'System Update',
    description: 'Server maintenance completed successfully',
    time: 'Yesterday',
  },
];

export default function AdminDashboard(): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return (): void => {
      clearTimeout(timer);
    };
  }, []);

  // Define columns within the component to ensure proper type inference
  const columns: Column<RecentOrder>[] = [
    {
      id: 'customer',
      header: 'Customer',
      accessorKey: 'customer',
      sortable: true,
      cell: (value): JSX.Element => (
        <div className="font-medium text-gray-900 dark:text-gray-100 hover:text-element-500 dark:hover:text-element-400 transition-colors duration-200">
          {String(value)}
        </div>
      ),
    },
    {
      id: 'product',
      header: 'Product',
      accessorKey: 'product',
      cell: (value): JSX.Element => (
        <div className="text-gray-600 dark:text-gray-300">{String(value)}</div>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      cell: (value): JSX.Element => (
        <div className="font-mono font-medium text-gray-900 dark:text-gray-100">
          ${Number(value).toLocaleString()}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value): JSX.Element => {
        const status = String(value);
        const getStatusStyles = (): string => {
          switch (status) {
            case 'Completed':
              return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50';
            case 'Pending':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50';
            case 'In Progress':
              return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50';
            default:
              return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';
          }
        };

        return (
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${getStatusStyles()}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      sortable: true,
      cell: (value): JSX.Element => (
        <div className="text-gray-500 dark:text-gray-400">{String(value)}</div>
      ),
    },
    {
      id: 'actions',
      header: '',
      accessorKey: 'id',
      cell: (): JSX.Element => (
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-element-500 dark:text-gray-400 dark:hover:text-element-400"
        >
          View
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-element-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-element-500 to-element-700 dark:from-element-400 dark:to-element-600">
            Dashboard
          </span>
          <div className="h-1 w-0 group-hover:w-1/3 bg-element-500 mt-1 transition-all duration-300"></div>
        </h1>
        <Button
          className="transition-all duration-300 hover:scale-105"
          rightIcon={
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          }
        >
          View Reports
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="12,345"
          change="+12.5%"
          trend="up"
          icon={
            <Users className="h-6 w-6 text-element-600 dark:text-element-400 group-hover:scale-110 transition-transform duration-300" />
          }
          delay={100}
        />
        <StatsCard
          title="Revenue"
          value="$54,321"
          change="+8.2%"
          trend="up"
          icon={
            <DollarSign className="h-6 w-6 text-element-600 dark:text-element-400 group-hover:scale-110 transition-transform duration-300" />
          }
          delay={200}
        />
        <StatsCard
          title="Orders"
          value="789"
          change="-3.1%"
          trend="down"
          icon={
            <ShoppingCart className="h-6 w-6 text-element-600 dark:text-element-400 group-hover:scale-110 transition-transform duration-300" />
          }
          delay={300}
        />
        <StatsCard
          title="Growth"
          value="23.5%"
          change="+4.75%"
          trend="up"
          icon={
            <TrendingUp className="h-6 w-6 text-element-600 dark:text-element-400 group-hover:scale-110 transition-transform duration-300" />
          }
          delay={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Clipboard className="mr-2 h-5 w-5 text-element-500" />
                Recent Orders
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="text-sm transition-all duration-200 hover:bg-element-50 dark:hover:bg-element-900"
              >
                View All
              </Button>
            </div>
            <div className="transform transition-all duration-500 hover:scale-[1.01] origin-top">
              <Table<RecentOrder>
                data={recentOrders}
                columns={columns}
                showSelection={false}
                className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Activity className="mr-2 h-5 w-5 text-element-500" />
                Recent Activities
              </h2>
              <Button variant="ghost" size="sm" className="text-sm">
                View All
              </Button>
            </div>
            <div className="space-y-1">
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <Card className="p-6 transition-all duration-300 hover:shadow-md mt-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart2 className="mr-2 h-5 w-5 text-element-500" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { name: 'Analytics', icon: <BarChart2 className="h-5 w-5" /> },
            { name: 'Products', icon: <ShoppingCart className="h-5 w-5" /> },
            { name: 'Customers', icon: <Users className="h-5 w-5" /> },
            { name: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
          ].map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center justify-center py-4 gap-2 transition-all duration-300 hover:bg-element-50 dark:hover:bg-element-900 hover:scale-105 hover:shadow-sm"
              leftIcon={item.icon}
            >
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
