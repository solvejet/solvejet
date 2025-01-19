// src/lib/icon-colors.ts

export const getIconColor = (index: number): string => {
  const colors = [
    'text-pink-500', // Pink
    'text-blue-500', // Blue
    'text-purple-500', // Purple
    'text-green-500', // Green
    'text-orange-500', // Orange
    'text-indigo-500', // Indigo
    'text-red-500', // Red
    'text-teal-500', // Teal
  ]

  return colors[index % colors.length]
}

export const getIconBgColor = (index: number): string => {
  const colors = [
    'bg-pink-50 dark:bg-pink-500/10',
    'bg-blue-50 dark:bg-blue-500/10',
    'bg-purple-50 dark:bg-purple-500/10',
    'bg-green-50 dark:bg-green-500/10',
    'bg-orange-50 dark:bg-orange-500/10',
    'bg-indigo-50 dark:bg-indigo-500/10',
    'bg-red-50 dark:bg-red-500/10',
    'bg-teal-50 dark:bg-teal-500/10',
  ]

  return colors[index % colors.length]
}
