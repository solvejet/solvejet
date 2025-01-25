// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectToDatabase } from '@/lib/mongodb'
import { AdminUser, Role } from '@/models/Admin'
import { SystemRoles } from '@/types/admin'

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .optional(),
  roles: z.array(z.string()).min(1).optional(),
  isActive: z.boolean().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    await connectToDatabase()

    const user = await AdminUser.findById(id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if updating email and it already exists
    if (validatedData.email && validatedData.email !== user.email) {
      const existingUser = await AdminUser.findOne({
        email: validatedData.email,
      })
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        )
      }
    }

    // Verify roles if updating
    if (validatedData.roles) {
      const roles = await Role.find({ _id: { $in: validatedData.roles } })
      if (roles.length !== validatedData.roles.length) {
        return NextResponse.json(
          { error: 'One or more invalid roles' },
          { status: 400 }
        )
      }
    }

    // Update user
    Object.assign(user, validatedData)
    await user.save()

    // Return updated user without password
    const updatedUser = await AdminUser.findById(user._id)
      .select('-password')
      .populate('roles', 'name')
      .lean()

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
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

    const user = await AdminUser.findById(id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has super admin role
    if (user.roles.includes(SystemRoles.SUPER_ADMIN)) {
      return NextResponse.json(
        { error: 'Cannot delete super admin user' },
        { status: 403 }
      )
    }

    await user.deleteOne()

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
