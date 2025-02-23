// src/components/ui/Select.tsx
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  className?: string;
  maxHeight?: number;
  loading?: boolean;
  clearable?: boolean;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      disabled = false,
      error,
      label,
      required = false,
      multiple = false,
      searchable = false,
      className,
      maxHeight = 300,
      loading = false,
      clearable = true,
    },
    ref
  ): React.ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Handle outside clicks
    useEffect((): (() => void) => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return (): void => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Filter options based on search query
    const filteredOptions = options.filter((option): boolean =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle option selection
    const handleSelect = useCallback(
      (option: SelectOption): void => {
        if (option.disabled) {
          return;
        }

        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          const newValues = currentValues.includes(option.value)
            ? currentValues.filter(v => v !== option.value)
            : [...currentValues, option.value];
          onChange?.(newValues);
        } else {
          onChange?.(option.value);
          setIsOpen(false);
        }
        setSearchQuery('');
      },
      [multiple, onChange, value]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent): void => {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            setHighlightedIndex(current =>
              current < filteredOptions.length - 1 ? current + 1 : 0
            );
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            setHighlightedIndex(current =>
              current > 0 ? current - 1 : filteredOptions.length - 1
            );
            break;
          }
          case 'Enter': {
            event.preventDefault();
            if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
              handleSelect(filteredOptions[highlightedIndex]);
            }
            break;
          }
          case 'Escape': {
            setIsOpen(false);
            break;
          }
        }
      },
      [filteredOptions, handleSelect, highlightedIndex]
    );

    // Clear selection
    const handleClear = useCallback(
      (event: React.MouseEvent): void => {
        event.stopPropagation();
        onChange?.(multiple ? [] : '');
        setSearchQuery('');
      },
      [multiple, onChange]
    );

    // Handle click to open
    const handleClick = useCallback((): void => {
      if (!disabled) {
        setIsOpen(true);
      }
    }, [disabled]);

    // Get selected labels
    const selectedLabels = options
      .filter(option =>
        Array.isArray(value) ? value.includes(option.value) : option.value === value
      )
      .map(option => option.label)
      .join(', ');

    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchQuery(e.target.value);
    };

    // Handle search input click
    const handleSearchClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
    };

    const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value);

    return (
      <div className={cn('relative w-full', className)} ref={ref}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          ref={containerRef}
          className={cn(
            'relative w-full cursor-pointer rounded-md border bg-white dark:bg-gray-800',
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:border-gray-400 dark:hover:border-gray-500'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <div className="flex items-center min-h-[2.5rem] px-3 py-2">
            {loading ? (
              <div className="flex items-center text-gray-400">
                <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full mr-2" />
                Loading...
              </div>
            ) : (
              <>
                <div className="flex-grow truncate">
                  {selectedLabels || <span className="text-gray-400">{placeholder}</span>}
                </div>
                <div className="flex items-center ml-2">
                  {clearable && hasValue && (
                    <button
                      onClick={handleClear}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      aria-label="Clear selection"
                      type="button"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-gray-400 transition-transform duration-200',
                      isOpen && 'transform rotate-180'
                    )}
                  />
                </div>
              </>
            )}
          </div>

          {isOpen && !disabled && (
            <div
              className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
              style={{ maxHeight }}
            >
              {searchable && (
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-element-500"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onClick={handleSearchClick}
                    />
                  </div>
                </div>
              )}

              <ul
                ref={listboxRef}
                className="max-h-[calc(300px-2.5rem)] overflow-auto py-1"
                role="listbox"
                aria-multiselectable={multiple}
              >
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-gray-400 text-center">No options found</li>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;

                    const handleOptionClick = (e: React.MouseEvent): void => {
                      e.stopPropagation();
                      handleSelect(option);
                    };

                    return (
                      <li
                        key={option.value}
                        className={cn(
                          'px-3 py-2 text-sm cursor-pointer flex items-center',
                          option.disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                          highlightedIndex === index && 'bg-gray-100 dark:bg-gray-700',
                          isSelected && 'text-element-500 dark:text-element-400'
                        )}
                        onClick={handleOptionClick}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                      >
                        {multiple && (
                          <div
                            className={cn(
                              'w-4 h-4 border rounded mr-2 flex items-center justify-center',
                              isSelected ? 'bg-element-500 border-element-500' : 'border-gray-300'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                        )}
                        <div className="flex-grow">
                          <div>{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-gray-400">{option.description}</div>
                          )}
                        </div>
                        {!multiple && isSelected && (
                          <Check className="h-4 w-4 ml-2 text-element-500" />
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
