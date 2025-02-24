import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TableProps, SortConfig, FilterConfig, CellValue } from './types';

export function Table<T extends Record<string, CellValue>>({
  data,
  columns,
  loading = false,
  error,
  emptyMessage = 'No data available',
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
  onRowClick,
  className,
  showSelection = false,
  selectedRows = [],
  onSelectionChange,
  stickyHeader = false,
}: TableProps<T>): React.ReactElement {
  // Refs
  const parentRef = useRef<HTMLDivElement>(null);

  // State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(
    new Set(selectedRows.map(row => JSON.stringify(row)))
  );
  const [containerHeight, setContainerHeight] = useState<number>(400);

  // Effect to update container height based on viewport
  useEffect((): (() => void) => {
    const updateContainerHeight = (): void => {
      if (parentRef.current) {
        const viewportHeight = window.innerHeight;
        const tableTop = parentRef.current.getBoundingClientRect().top;
        const padding = 120; // Space for pagination and margins
        setContainerHeight(Math.max(400, viewportHeight - tableTop - padding));
      }
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    return (): void => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  // Calculate default column widths
  const columnWidths = useMemo((): Record<string, string> => {
    const totalColumns = showSelection ? columns.length + 1 : columns.length;
    const defaultWidth = `${String(100 / totalColumns)}%`;

    return columns.reduce<Record<string, string>>((acc, column) => {
      acc[column.id] = column.width ?? defaultWidth;
      return acc;
    }, {});
  }, [columns, showSelection]);

  // Memoized filtered and sorted data
  const filteredData = useMemo((): T[] => {
    return data.filter(row =>
      filters.every(filter => {
        const value = row[filter.key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(filter.value.toLowerCase());
      })
    );
  }, [data, filters]);

  const sortedData = useMemo((): T[] => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (aValue === bValue) return 0;

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo((): T[] => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  // Handlers
  const handleSort = useCallback((key: string): void => {
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' ? { key, direction: 'desc' } : null;
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const handleFilter = useCallback((key: string, value: string): void => {
    setFilters(current => {
      const nextFilters = current.filter(f => f.key !== key);
      if (value) nextFilters.push({ key, value });
      return nextFilters;
    });
    setCurrentPage(1);
  }, []);

  const handleSelectAll = useCallback((): void => {
    setSelectedRowIds(current => {
      const newSelected =
        current.size === paginatedData.length
          ? new Set<string>()
          : new Set(paginatedData.map(row => JSON.stringify(row)));

      if (onSelectionChange) {
        const selectedItems = Array.from(newSelected).map(id => JSON.parse(id) as T);
        onSelectionChange(selectedItems);
      }

      return newSelected;
    });
  }, [paginatedData, onSelectionChange]);

  const handleSelectRow = useCallback(
    (row: T): void => {
      const rowId = JSON.stringify(row);
      setSelectedRowIds(current => {
        const newSelected = new Set(current);
        if (newSelected.has(rowId)) {
          newSelected.delete(rowId);
        } else {
          newSelected.add(rowId);
        }

        if (onSelectionChange) {
          const selectedItems = Array.from(newSelected).map(id => JSON.parse(id) as T);
          onSelectionChange(selectedItems);
        }

        return newSelected;
      });
    },
    [onSelectionChange]
  );

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {columns
          .filter(column => column.filterable)
          .map(column => (
            <div key={column.id} className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Filter ${column.header}`}
                className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-element-500"
                onChange={(e): void => {
                  handleFilter(column.id, e.target.value);
                }}
                value={filters.find(f => f.key === column.id)?.value ?? ''}
              />
            </div>
          ))}
      </div>

      {/* Table Container */}
      <div
        ref={parentRef}
        className="relative rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ height: `${String(containerHeight)}px` }}
      >
        <table className="w-full text-sm text-left table-fixed">
          {/* Header */}
          <thead
            className={cn(
              'text-xs uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
              stickyHeader && 'sticky top-0 z-10'
            )}
          >
            <tr>
              {showSelection && (
                <th className="w-16 p-4 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={
                      selectedRowIds.size === paginatedData.length && paginatedData.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.id}
                  className={cn('px-6 py-3', column.sortable && 'cursor-pointer select-none')}
                  style={{
                    width: columnWidths[column.id],
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  onClick={(): void => {
                    if (column.sortable) handleSort(column.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{column.header}</span>
                    {column.sortable &&
                      (sortConfig?.key === column.id ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {loading ? (
              <tr>
                <td
                  colSpan={showSelection ? columns.length + 1 : columns.length}
                  className="px-6 py-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={showSelection ? columns.length + 1 : columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={(): void => {
                    if (onRowClick) onRowClick(row);
                  }}
                >
                  {showSelection && (
                    <td className="w-16 p-4 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedRowIds.has(JSON.stringify(row))}
                        onChange={(e): void => {
                          e.stopPropagation();
                          handleSelectRow(row);
                        }}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.id}
                      className="px-6 py-4"
                      style={{
                        width: columnWidths[column.id],
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                    >
                      <div className="truncate">
                        {column.cell
                          ? column.cell(row[column.accessorKey], row)
                          : String(row[column.accessorKey] ?? '')}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <select
              className="px-2 py-1 border rounded-lg text-sm"
              value={rowsPerPage}
              onChange={(e): void => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {String(option)} per page
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              {`${String((currentPage - 1) * rowsPerPage + 1)}-${String(
                Math.min(currentPage * rowsPerPage, sortedData.length)
              )} of ${String(sortedData.length)}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
              onClick={(): void => {
                setCurrentPage(p => Math.max(1, p - 1));
              }}
              disabled={currentPage === 1}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
              onClick={(): void => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
              }}
              disabled={currentPage === totalPages}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
