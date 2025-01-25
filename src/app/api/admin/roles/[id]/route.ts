// app/api/admin/roles/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { Role } from '@/models/Admin'

const updateRoleSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional(),
  permissions: z
    .array(z.string())
    .min(1, 'At least one permission required')
    .optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateRoleSchema.parse(body)

    await connectToDatabase()

    const role = await Role.findById(id)
    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Prevent modification of system roles
    if (role.isSystem) {
      return NextResponse.json(
        { error: 'Cannot modify system roles' },
        { status: 403 }
      )
    }

    // Update role
    Object.assign(role, validatedData)
    if (validatedData.name) {
      role.slug = validatedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    }

    await role.save()

    return NextResponse.json(role)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating role:', error)
    return NextResponse.json(
      { error: 'Failed to update role' },
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

    const role = await Role.findById(id)
    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Prevent deletion of system roles
    if (role.isSystem) {
      return NextResponse.json(
        { error: 'Cannot delete system roles' },
        { status: 403 }
      )
    }

    await role.deleteOne()

    return NextResponse.json(
      { message: 'Role deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting role:', error)
    return NextResponse.json(
      { error: 'Failed to delete role' },
      { status: 500 }
    )
  }
}
