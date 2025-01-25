// scripts/seed-admin.ts
import * as dotenv from 'dotenv'
import { z } from 'zod'
import mongoose from 'mongoose'
import { Permission, Role, AdminUser } from '@/models/Admin'
import type { SystemPermission, SystemRole } from '@/types/admin'
import { SystemPermissions, SystemRoles } from '@/types/admin'

// Load environment variables
dotenv.config({ path: '.env' })

// Strong type definitions
interface InitialPermission {
  name: string
  slug: SystemPermission
  description: string
  module: string
}

interface InitialRole {
  name: string
  slug: SystemRole
  description: string
  isSystem: boolean
  permissions: SystemPermission[]
}

// Environment validation schema with strict types
const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  SUPER_ADMIN_EMAIL: z.string().email('Invalid super admin email'),
  SUPER_ADMIN_PASSWORD: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must include uppercase, lowercase, number and special character'
    ),
})

// Utility for consistent text formatting
const capitalize = (str: string): string =>
  str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

// Initial permissions setup with strong typing
const initialPermissions: InitialPermission[] = Object.entries(
  SystemPermissions
).map(([key, slug]) => ({
  name: capitalize(key),
  slug,
  description: `Permission to ${key.toLowerCase().replace(/_/g, ' ')}`,
  module: key.split('_')[0].toLowerCase(),
}))

// Initial roles setup with strong typing
const initialRoles: InitialRole[] = [
  {
    name: 'Super Admin',
    slug: SystemRoles.SUPER_ADMIN,
    description: 'Full system access with all permissions',
    isSystem: true,
    permissions: Object.values(SystemPermissions),
  },
]

// Connection management
async function connectToDatabase(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri)
    console.log('✓ Connected to MongoDB')
  } catch (error) {
    console.error('× MongoDB connection error:', error)
    process.exit(1)
  }
}

// Validate environment variables
async function validateEnv() {
  try {
    const env = {
      MONGODB_URI: process.env.MONGODB_URI,
      SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
      SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
    }

    envSchema.parse(env)
    console.log('✓ Environment variables validated')
    return env as z.infer<typeof envSchema>
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('\n× Environment validation failed:')
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
    }
    process.exit(1)
  }
}

// Main seeding function with proper error handling
async function seedAdminSystem() {
  console.log('\n🚀 Starting admin system setup...\n')

  const env = await validateEnv()
  await connectToDatabase(env.MONGODB_URI)

  try {
    // Create permissions with upsert
    for (const permission of initialPermissions) {
      await Permission.findOneAndUpdate({ slug: permission.slug }, permission, {
        upsert: true,
        new: true,
      })
    }
    console.log('✓ Permissions seeded')

    // Create super admin role
    const [superAdminRole] = initialRoles
    const dbSuperAdminRole = await Role.findOneAndUpdate(
      { slug: superAdminRole.slug },
      superAdminRole,
      { upsert: true, new: true }
    )

    if (!dbSuperAdminRole) {
      throw new Error('Failed to create super admin role')
    }
    console.log('✓ Super admin role created')

    // Create super admin user if doesn't exist
    const superAdminExists = await AdminUser.findOne({
      roles: dbSuperAdminRole._id,
    })

    if (!superAdminExists) {
      await AdminUser.create({
        name: 'Super Admin',
        email: env.SUPER_ADMIN_EMAIL,
        password: env.SUPER_ADMIN_PASSWORD,
        roles: [dbSuperAdminRole._id],
        isActive: true,
      })
      console.log('✓ Super admin user created')
    } else {
      console.log('✓ Super admin user already exists')
    }

    console.log('\n✨ Admin system setup completed successfully!\n')
  } catch (error) {
    console.error(
      '\n× Setup failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('✓ Disconnected from MongoDB')
  }
}

// Execute with proper error handling
seedAdminSystem().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
