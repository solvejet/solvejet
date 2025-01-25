// app/api/admin/roles/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { Role } from '@/models/Admin'
import { createPermissionMiddleware } from '@/middleware/auth'
import { SystemPermissions } from '@/types/admin'

// Input validation schemas
const createRoleSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  permissions: z.array(z.string()).min(1, 'At least one permission required'),
})

// GET handler with middleware
export const GET = createPermissionMiddleware([SystemPermissions.VIEW_ROLES])(
  async (request: NextRequest) => {
    try {
      await connectToDatabase()

      const page = Number(request.nextUrl.searchParams.get('page')) || 1
      const limit = Number(request.nextUrl.searchParams.get('limit')) || 10
      const search = request.nextUrl.searchParams.get('search') || ''

      const query = search ? { name: { $regex: search, $options: 'i' } } : {}

      const [roles, total] = await Promise.all([
        Role.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 })
          .lean(),
        Role.countDocuments(query),
      ])

      return NextResponse.json({
        roles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error) {
      console.error('Error fetching roles:', error)
      return NextResponse.json(
        { error: 'Failed to fetch roles' },
        { status: 500 }
      )
    }
  }
)

// POST handler with middleware
export const POST = createPermissionMiddleware([SystemPermissions.CREATE_ROLE])(
  async (request: NextRequest) => {
    try {
      const body = await request.json()
      const validatedData = createRoleSchema.parse(body)

      await connectToDatabase()

      // Check if role with same name exists
      const existingRole = await Role.findOne({ name: validatedData.name })
      if (existingRole) {
        return NextResponse.json(
          { error: 'Role with this name already exists' },
          { status: 400 }
        )
      }

      // Create slug from name
      const slug = validatedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')

      const role = await Role.create({
        ...validatedData,
        slug,
        isSystem: false,
      })

      return NextResponse.json(role, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        )
      }

      console.error('Error creating role:', error)
      return NextResponse.json(
        { error: 'Failed to create role' },
        { status: 500 }
      )
    }
  }
)
