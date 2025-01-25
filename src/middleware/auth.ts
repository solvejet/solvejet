// src/middleware/auth.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb'
import { AdminUser, Role } from '@/models/Admin'
import type { SystemPermission } from '@/types/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface JWTPayload {
  userId: string
  email: string
  roles: string[]
}

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  requiredPermissions: SystemPermission[] = []
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload

    // Connect to database
    await connectToDatabase()

    // Get user with roles
    const user = await AdminUser.findById(decoded.userId)
      .select('email roles isActive')
      .lean()

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }

    // If permissions are required, check them
    if (requiredPermissions.length > 0) {
      // Get user's roles with their permissions
      const roles = await Role.find({
        _id: { $in: user.roles },
      })
        .select('permissions')
        .lean()

      // Flatten permissions from all roles
      const userPermissions = roles.reduce((acc, role) => {
        return [...acc, ...role.permissions]
      }, [] as string[])

      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      )

      if (!hasAllPermissions) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }
    }

    // Add user info to request
    request.headers.set('X-User-Id', decoded.userId)
    request.headers.set('X-User-Email', decoded.email)
    request.headers.set('X-User-Roles', decoded.roles.join(','))

    // Continue to handler
    return handler(request)
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

// Helper function to create auth middleware with specific permissions
export function createPermissionMiddleware(permissions: SystemPermission[]) {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return (request: NextRequest) => withAuth(request, handler, permissions)
  }
}
