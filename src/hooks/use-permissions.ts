// src/hooks/use-permissions.ts
import { useCallback } from 'react'
import { useAdminAuth } from './use-admin-auth'
import { SystemPermission } from '@/types/admin'

export function usePermissions() {
  const { user } = useAdminAuth()

  const hasPermission = useCallback(
    (permission: SystemPermission) => {
      if (!user) return false
      return user.roles.includes(permission)
    },
    [user]
  )

  const hasAllPermissions = useCallback(
    (permissions: SystemPermission[]) => {
      return permissions.every(hasPermission)
    },
    [hasPermission]
  )

  const hasAnyPermission = useCallback(
    (permissions: SystemPermission[]) => {
      return permissions.some(hasPermission)
    },
    [hasPermission]
  )

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  }
}
