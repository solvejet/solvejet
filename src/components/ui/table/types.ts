// src/components/ui/table/types.ts
import type { ReactNode } from 'react';

export type CellValue = string | number | boolean | Date | null | undefined;

export interface Column<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (value: T[keyof T], row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  key: string;
  value: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onRowClick?: (row: T) => void;
  className?: string;
  showSelection?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  stickyHeader?: boolean;
}
