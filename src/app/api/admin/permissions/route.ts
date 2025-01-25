// app/api/admin/permissions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { Permission } from '@/models/Admin'
import { createPermissionMiddleware } from '@/middleware/auth'
import { SystemPermissions } from '@/types/admin'

// Input validation schema
const createPermissionSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  module: z.string().min(2, 'Module name must be at least 2 characters'),
})

// Define type for MongoDB query
interface MongoRegexQuery {
  $regex: string
  $options: string
}

interface PermissionQuery {
  $or?: Array<{
    name?: MongoRegexQuery
    description?: MongoRegexQuery
  }>
  moduleType?: string
}

// GET handler with middleware
export const GET = createPermissionMiddleware([
  SystemPermissions.VIEW_PERMISSIONS,
])(async (request: NextRequest) => {
  try {
    await connectToDatabase()

    const page = Number(request.nextUrl.searchParams.get('page')) || 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 10
    const search = request.nextUrl.searchParams.get('search') || ''
    const moduleType = request.nextUrl.searchParams.get('moduleType')

    const query: PermissionQuery = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    if (moduleType) {
      query.moduleType = moduleType
    }

    const [permissions, total] = await Promise.all([
      Permission.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ moduleType: 1, name: 1 })
        .lean(),
      Permission.countDocuments(query),
    ])

    // Get unique moduleTypes for filtering
    const moduleTypes = await Permission.distinct('moduleType')

    return NextResponse.json({
      permissions,
      moduleTypes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching permissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    )
  }
})

// POST handler with middleware
export const POST = createPermissionMiddleware([
  SystemPermissions.ASSIGN_PERMISSIONS,
])(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const validatedData = createPermissionSchema.parse(body)

    await connectToDatabase()

    // Check if permission with same name exists
    const existingPermission = await Permission.findOne({
      name: validatedData.name,
    })
    if (existingPermission) {
      return NextResponse.json(
        { error: 'Permission with this name already exists' },
        { status: 400 }
      )
    }

    // Create slug from name
    const slug = validatedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')

    const permission = await Permission.create({
      ...validatedData,
      slug,
    })

    return NextResponse.json(permission, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating permission:', error)
    return NextResponse.json(
      { error: 'Failed to create permission' },
      { status: 500 }
    )
  }
})
