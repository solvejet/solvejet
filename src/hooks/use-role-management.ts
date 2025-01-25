// src/hooks/use-role-management.ts
import { useState, useCallback } from 'react'
import type { Role, Permission } from '@/types/admin'

interface RoleManagementState {
  roles: Role[]
  permissions: Permission[]
  isLoading: boolean
  error: string | null
}

export function useRoleManagement() {
  const [state, setState] = useState<RoleManagementState>({
    roles: [],
    permissions: [],
    isLoading: true,
    error: null,
  })

  const fetchRoles = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }))

      const response = await fetch('/api/admin/roles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch roles')
      }

      const data = await response.json()
      setState((prev) => ({
        ...prev,
        roles: data.roles,
        isLoading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch roles',
        isLoading: false,
      }))
    }
  }, [])

  const fetchPermissions = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }))

      const response = await fetch('/api/admin/permissions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch permissions')
      }

      const data = await response.json()
      setState((prev) => ({
        ...prev,
        permissions: data.permissions,
        isLoading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch permissions',
        isLoading: false,
      }))
    }
  }, [])

  const createRole = useCallback(async (roleData: Partial<Role>) => {
    try {
      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify(roleData),
      })

      if (!response.ok) {
        throw new Error('Failed to create role')
      }

      const newRole = await response.json()
      setState((prev) => ({
        ...prev,
        roles: [...prev.roles, newRole],
      }))

      return newRole
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to create role')
    }
  }, [])

  const updateRole = useCallback(
    async (id: string, roleData: Partial<Role>) => {
      try {
        const response = await fetch(`/api/admin/roles/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },
          body: JSON.stringify(roleData),
        })

        if (!response.ok) {
          throw new Error('Failed to update role')
        }

        const updatedRole = await response.json()
        setState((prev) => ({
          ...prev,
          roles: prev.roles.map((role) =>
            role.id === id ? updatedRole : role
          ),
        }))

        return updatedRole
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error('Failed to update role')
      }
    },
    []
  )

  const deleteRole = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/admin/roles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete role')
      }

      setState((prev) => ({
        ...prev,
        roles: prev.roles.filter((role) => role.id !== id),
      }))
    } catch (error) {
      throw error instanceof Error ? error : new Error('Failed to delete role')
    }
  }, [])

  return {
    ...state,
    fetchRoles,
    fetchPermissions,
    createRole,
    updateRole,
    deleteRole,
  }
}
