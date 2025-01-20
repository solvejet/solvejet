// components/ui/select.tsx
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, Search } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  displayValue?: string // For showing different value in input (e.g., just country code)
  icon?: React.ReactNode // Optional icon
}

interface CustomSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: boolean
  className?: string
  label?: string
  searchable?: boolean
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
  className,
  label,
  searchable = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const selectedOption = options.find((option) => option.value === value)

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.code) {
        case 'Enter':
        case 'Space':
          if (!searchable) {
            e.preventDefault()
            if (isOpen && filteredOptions[highlightedIndex]) {
              onChange(filteredOptions[highlightedIndex].value)
              setIsOpen(false)
              setSearchQuery('')
            }
          }
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newIndex = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
          if (newIndex >= 0 && newIndex < filteredOptions.length) {
            setHighlightedIndex(newIndex)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          setSearchQuery('')
          break
      }
    }

    document.addEventListener('mousedown', closeDropdown)
    document.addEventListener('keydown', handleKeyboard)
    return () => {
      document.removeEventListener('mousedown', closeDropdown)
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [isOpen, highlightedIndex, filteredOptions, onChange, searchable])

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="pointer-events-none absolute -top-0.5 left-0 origin-[0] scale-75 text-sm text-muted-foreground">
          {label}
        </label>
      )}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label}
        className={cn(
          'flex h-10 w-full items-center justify-between border-b bg-transparent px-3 py-2 text-sm ring-offset-background transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          error
            ? 'border-destructive'
            : 'border-input hover:border-muted-foreground',
          className
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={cn(!selectedOption && 'text-muted-foreground')}>
          {selectedOption
            ? selectedOption.displayValue || selectedOption.label
            : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 opacity-50 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'absolute left-0 right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border bg-popover shadow-lg',
          'transition-all duration-200',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        )}
      >
        {searchable && (
          <div className="sticky top-0 border-b bg-popover p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md border border-input bg-transparent py-2 pl-8 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            <ul role="listbox" aria-label={label} className="py-1">
              {filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 text-sm',
                    'cursor-pointer transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    option.value === value &&
                      'bg-accent/50 text-accent-foreground',
                    index === highlightedIndex &&
                      'bg-accent text-accent-foreground'
                  )}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                    setSearchQuery('')
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {option.icon}
                    <span className="truncate">{option.label}</span>
                  </div>
                  {option.value === value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No options found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
