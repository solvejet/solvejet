// src/lib/seed-admin.ts
import { connectToDatabase } from './mongodb'
import { Permission, Role, AdminUser } from '@/models/Admin'
import { SystemPermissions, SystemRoles } from '@/types/admin'

interface InitialPermission {
  name: string
  slug: string
  description: string
  module: string
}

interface InitialRole {
  name: string
  slug: string
  description: string
  isSystem: boolean
  permissions: string[]
}

const initialPermissions: InitialPermission[] = Object.entries(
  SystemPermissions
).map(([key, slug]) => ({
  name: key.split('_').map(capitalize).join(' '),
  slug,
  description: `Permission to ${key.toLowerCase().replace(/_/g, ' ')}`,
  module: key.split('_')[0].toLowerCase(),
}))

const initialRoles: InitialRole[] = [
  {
    name: 'Super Admin',
    slug: SystemRoles.SUPER_ADMIN,
    description: 'Full system access with all permissions',
    isSystem: true,
    permissions: Object.values(SystemPermissions),
  },
]

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export async function seedAdminSystem() {
  try {
    await connectToDatabase()

    // Create permissions
    for (const permission of initialPermissions) {
      await Permission.findOneAndUpdate({ slug: permission.slug }, permission, {
        upsert: true,
        new: true, // Return the modified document
      })
    }

    // Create super admin role
    const [superAdminRole] = initialRoles
    const dbSuperAdminRole = await Role.findOneAndUpdate(
      { slug: superAdminRole.slug },
      superAdminRole,
      {
        upsert: true,
        new: true, // Return the modified document
      }
    )

    if (!dbSuperAdminRole) {
      throw new Error('Failed to create super admin role')
    }

    // Create super admin user if it doesn't exist
    const superAdminExists = await AdminUser.findOne({
      roles: dbSuperAdminRole._id,
    })

    if (!superAdminExists) {
      const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
      const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD

      if (!superAdminEmail || !superAdminPassword) {
        throw new Error(
          'SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD environment variables are required'
        )
      }

      await AdminUser.create({
        name: 'Super Admin',
        email: superAdminEmail,
        password: superAdminPassword,
        roles: [dbSuperAdminRole._id],
        isActive: true,
      })
    }

    console.log('Admin system seeded successfully')
  } catch (error) {
    console.error(
      'Error seeding admin system:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    throw error
  }
}
