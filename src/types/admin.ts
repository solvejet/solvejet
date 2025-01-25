// src/types/admin.ts

export type Permission = {
  id: string
  name: string
  description: string
  slug: string
  module: string
  createdAt: Date
  updatedAt: Date
}

export type Role = {
  id: string
  name: string
  description: string
  slug: string
  isSystem: boolean
  permissions: string[] // Array of permission IDs
  createdAt: Date
  updatedAt: Date
}

export type User = {
  id: string
  email: string
  name: string
  roles: string[] // Array of role IDs
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

// Pre-defined permissions
export const SystemPermissions = {
  // User Management
  VIEW_USERS: 'view_users',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',

  // Role Management
  VIEW_ROLES: 'view_roles',
  CREATE_ROLE: 'create_role',
  UPDATE_ROLE: 'update_role',
  DELETE_ROLE: 'delete_role',

  // Permission Management
  VIEW_PERMISSIONS: 'view_permissions',
  ASSIGN_PERMISSIONS: 'assign_permissions',

  // Content Management
  MANAGE_CONTENT: 'manage_content',
  PUBLISH_CONTENT: 'publish_content',

  // System Settings
  MANAGE_SETTINGS: 'manage_settings',
} as const

export type SystemPermission =
  (typeof SystemPermissions)[keyof typeof SystemPermissions]

// Pre-defined roles
export const SystemRoles = {
  SUPER_ADMIN: 'super_admin',
} as const

export type SystemRole = (typeof SystemRoles)[keyof typeof SystemRoles]

// Role-Permission mapping type
export type RolePermissionMapping = {
  [key in SystemRole]: SystemPermission[]
}

// Default role-permission mappings
export const DefaultRolePermissions: RolePermissionMapping = {
  [SystemRoles.SUPER_ADMIN]: Object.values(SystemPermissions),
}
