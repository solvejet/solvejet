// src/components/ui/Select.tsx
'use client';

import React, { forwardRef, useState, useRef, useEffect, type SelectHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: LucideIcon;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    leftIcon?: LucideIcon;
    options: SelectOption[];
    placeholder?: string;
    loading?: boolean;
    fullWidth?: boolean;
    variant?: 'default' | 'filled';
    size?: 'sm' | 'md' | 'lg';
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    readOnly?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            helperText,
            error,
            leftIcon: LeftIcon,
            options = [],
            placeholder = 'Select an option...',
            loading = false,
            fullWidth = true,
            variant = 'default',
            size = 'md',
            disabled,
            value,
            onChange,
            readOnly = false,
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState(value || '');
        const dropdownRef = useRef<HTMLDivElement>(null);
        const selectRef = useRef<HTMLSelectElement>(null);

        const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
        const brandPrimary = '#3C86FF';
        const brandDark = '#1e1d28';

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        // Update selected value when value prop changes
        useEffect(() => {
            setSelectedValue(value || '');
        }, [value]);

        const containerClasses = cn(
            'relative',
            fullWidth ? 'w-full' : 'w-auto'
        );

        const sizeClasses = {
            sm: 'py-2 text-sm',
            md: 'py-3 text-base',
            lg: 'py-4 text-lg',
        };

        const baseSelectClasses = cn(
            // Base styles
            'w-full bg-transparent cursor-pointer',
            'transition-all duration-200 ease-in-out',
            // Border bottom only
            'border-0 border-b-2',
            'rounded-none',
            // Cross-platform touch optimization
            'touch-manipulation',
            // Remove all focus/active effects and default styling
            'outline-none focus:outline-none active:outline-none',
            'focus:ring-0 active:ring-0',
            'appearance-none',
            // Sizing
            sizeClasses[size],
            'leading-relaxed',
            // Icon spacing
            LeftIcon ? 'pl-10' : 'pl-0',
            'pr-10', // Always space for dropdown arrow
            // States
            disabled || loading || readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            // Variant styles
            variant === 'filled' ? 'bg-gray-50 px-4 rounded-t-md' : '',
            // Hide default select
            'sr-only',
            className
        );

        const customSelectClasses = cn(
            'w-full cursor-pointer transition-all duration-200 ease-in-out',
            'border-0 border-b-2 rounded-none',
            'outline-none focus:outline-none',
            sizeClasses[size],
            'leading-relaxed',
            LeftIcon ? 'pl-10' : 'pl-0',
            'pr-10',
            disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            variant === 'filled' ? 'bg-gray-50 px-4 rounded-t-md' : 'bg-transparent',
        );

        const getTextColor = () => {
            if (!selectedValue) return '#9ca3af'; // placeholder color
            return brandDark;
        };

        const selectedOption = options.find(option => option.value === selectedValue);

        const iconClasses = cn(
            'absolute top-1/2 transform -translate-y-1/2 left-0',
            'w-5 h-5',
            'pointer-events-none'
        );

        const dropdownIconClasses = cn(
            'absolute top-1/2 transform -translate-y-1/2 right-0',
            'w-5 h-5 transition-transform duration-200',
            'pointer-events-none',
            isOpen ? 'rotate-180' : '',
            loading ? 'hidden' : ''
        );

        const dropdownClasses = cn(
            'absolute top-full left-0 right-0 z-50',
            'bg-white border border-gray-200 rounded-lg shadow-lg',
            'max-h-60 overflow-y-auto custom-dropdown',
            'transform transition-all duration-200 ease-out',
            isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none',
            'mt-1'
        );

        const optionClasses = (option: SelectOption, isSelected: boolean) => cn(
            'flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150',
            'hover:bg-gray-50 active:bg-gray-100',
            isSelected ? 'font-medium' : '',
            option.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
            'text-sm'
        );

        const LoadingSpinner = () => (
            <svg
                className="absolute top-1/2 transform -translate-y-1/2 right-0 w-5 h-5 animate-spin"
                style={{ color: brandPrimary }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        const handleOptionClick = (option: SelectOption) => {
            if (option.disabled) return;

            setSelectedValue(option.value);
            setIsOpen(false);

            // Trigger onChange event
            if (onChange && selectRef.current) {
                const event = {
                    target: { ...selectRef.current, value: option.value },
                    currentTarget: selectRef.current,
                } as React.ChangeEvent<HTMLSelectElement>;
                onChange(event);
            }
        };

        const handleCustomSelectClick = () => {
            if (!disabled && !loading && !readOnly) {
                setIsOpen(!isOpen);
            }
        };

        return (
            <div className={containerClasses} ref={dropdownRef}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium mb-2"
                        style={{ color: brandDark }}
                    >
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {LeftIcon && (
                        <LeftIcon
                            className={iconClasses}
                            style={{ color: '#9ca3af' }}
                        />
                    )}

                    {/* Hidden native select for form submission */}
                    <select
                        ref={(node) => {
                            if (typeof ref === 'function') {
                                ref(node);
                            } else if (ref) {
                                ref.current = node;
                            }
                            selectRef.current = node;
                        }}
                        id={selectId}
                        className={baseSelectClasses}
                        disabled={disabled || loading || readOnly}
                        value={selectedValue}
                        onChange={onChange}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Custom select display */}
                    <div
                        className={customSelectClasses}
                        style={{
                            color: getTextColor(),
                        }}
                        onClick={handleCustomSelectClick}
                        role="button"
                        tabIndex={disabled || readOnly ? -1 : 0}
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleCustomSelectClick();
                            } else if (e.key === 'Escape') {
                                setIsOpen(false);
                            }
                        }}
                    >
                        <div className="flex items-center gap-2">
                            {selectedOption?.icon && (
                                <selectedOption.icon className="w-4 h-4" style={{ color: brandPrimary }} />
                            )}
                            <span className="truncate">
                                {selectedOption ? selectedOption.label : placeholder}
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <ChevronDown
                            className={dropdownIconClasses}
                            style={{ color: isOpen ? brandPrimary : '#9ca3af' }}
                        />
                    )}

                    {/* Custom dropdown */}
                    <div className={dropdownClasses}
                        style={{
                            // Custom scrollbar for dropdown
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#e2e8f0 #f8fafc',
                        }}
                    >
                        {options.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-500">
                                No options available
                            </div>
                        ) : (
                            options.map((option) => {
                                const isSelected = option.value === selectedValue;
                                return (
                                    <div
                                        key={option.value}
                                        className={optionClasses(option, isSelected)}
                                        onClick={() => handleOptionClick(option)}
                                        style={{
                                            color: isSelected ? brandPrimary : brandDark,
                                            backgroundColor: isSelected ? `${brandPrimary}10` : 'transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!option.disabled && !isSelected) {
                                                e.currentTarget.style.backgroundColor = '#f8fafc';
                                                e.currentTarget.style.color = brandPrimary;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!option.disabled && !isSelected) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = brandDark;
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            {option.icon && (
                                                <option.icon
                                                    className="w-4 h-4 flex-shrink-0"
                                                    style={{ color: isSelected ? brandPrimary : '#9ca3af' }}
                                                />
                                            )}
                                            <span className="truncate">{option.label}</span>
                                        </div>
                                        {isSelected && (
                                            <Check
                                                className="w-4 h-4 flex-shrink-0"
                                                style={{ color: brandPrimary }}
                                            />
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {(error || helperText) && (
                    <div className="mt-2">
                        {error ? (
                            <p className="text-sm text-red-500">{error}</p>
                        ) : helperText ? (
                            <p className="text-sm text-gray-500">{helperText}</p>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select, type SelectOption };