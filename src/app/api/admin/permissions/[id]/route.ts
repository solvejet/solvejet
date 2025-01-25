// app/api/admin/permissions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { Permission } from '@/models/Admin'

const updatePermissionSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  module: z
    .string()
    .min(2, 'Module name must be at least 2 characters')
    .optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updatePermissionSchema.parse(body)

    await connectToDatabase()

    const permission = await Permission.findById(id)
    if (!permission) {
      return NextResponse.json(
        { error: 'Permission not found' },
        { status: 404 }
      )
    }

    // Update permission
    Object.assign(permission, validatedData)
    if (validatedData.name) {
      permission.slug = validatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
    }

    await permission.save()

    return NextResponse.json(permission)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating permission:', error)
    return NextResponse.json(
      { error: 'Failed to update permission' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectToDatabase()

    const permission = await Permission.findById(id)
    if (!permission) {
      return NextResponse.json(
        { error: 'Permission not found' },
        { status: 404 }
      )
    }

    await permission.deleteOne()

    return NextResponse.json(
      { message: 'Permission deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting permission:', error)
    return NextResponse.json(
      { error: 'Failed to delete permission' },
      { status: 500 }
    )
  }
}
