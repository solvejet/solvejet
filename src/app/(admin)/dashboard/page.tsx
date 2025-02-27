// src/app/(admin)/dashboard/page.tsx
'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table/Table';
import type { Column, CellValue } from '@/components/ui/table/types';
import { ArrowUpRight, Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import type { JSX } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatsCard({ title, value, change, icon, trend }: StatsCardProps): JSX.Element {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-element-50 dark:bg-element-900 rounded-lg">{icon}</div>
        <span
          className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
        >
          {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
    </Card>
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
  // Add more sample data as needed
];

export default function AdminDashboard(): JSX.Element {
  // Define columns within the component to ensure proper type inference
  const columns: Column<RecentOrder>[] = [
    {
      id: 'customer',
      header: 'Customer',
      accessorKey: 'customer',
      sortable: true,
    },
    {
      id: 'product',
      header: 'Product',
      accessorKey: 'product',
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      cell: (value): string => `$${Number(value).toLocaleString()}`,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value): JSX.Element => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === 'Completed'
              ? 'bg-green-100 text-green-800'
              : value === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      sortable: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button>
          View Reports
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="12,345"
          change="+12.5%"
          trend="up"
          icon={<Users className="h-6 w-6 text-element-600" />}
        />
        <StatsCard
          title="Revenue"
          value="$54,321"
          change="+8.2%"
          trend="up"
          icon={<DollarSign className="h-6 w-6 text-element-600" />}
        />
        <StatsCard
          title="Orders"
          value="789"
          change="-3.1%"
          trend="down"
          icon={<ShoppingCart className="h-6 w-6 text-element-600" />}
        />
        <StatsCard
          title="Growth"
          value="23.5%"
          change="+4.75%"
          trend="up"
          icon={<TrendingUp className="h-6 w-6 text-element-600" />}
        />
      </div>

      {/* Recent Orders Table */}
      <Card className="mt-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <Table<RecentOrder> data={recentOrders} columns={columns} showSelection={false} />
        </div>
      </Card>
    </div>
  );
}
