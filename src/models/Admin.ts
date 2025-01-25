// src/models/Admin.ts
import mongoose, { Document, Model } from 'mongoose'

// Base interfaces
interface IPermission {
  name: string
  description: string
  slug: string
  module: string
  createdAt: Date
  updatedAt: Date
}

interface IRole {
  name: string
  description: string
  slug: string
  isSystem: boolean
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

interface IUser {
  email: string
  name: string
  password: string
  roles: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

// Document interfaces
interface PermissionDocument extends IPermission, Document {}
interface RoleDocument extends IRole, Document {}
interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>
}

// Model interfaces with explicit methods
interface PermissionModel extends Model<PermissionDocument> {
  findBySlug(slug: string): Promise<PermissionDocument | null>
}

interface RoleModel extends Model<RoleDocument> {
  findBySlug(slug: string): Promise<RoleDocument | null>
}

interface UserModel extends Model<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>
}

const permissionSchema = new mongoose.Schema<PermissionDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    module: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const roleSchema = new mongoose.Schema<RoleDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isSystem: { type: Boolean, default: false },
    permissions: [{ type: String, ref: 'Permission' }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const adminUserSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Static methods
permissionSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug })
}

roleSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug })
}

adminUserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email })
}

// Middleware to hash password before saving
adminUserSchema.pre('save', async function (this: UserDocument) {
  if (!this.isModified('password')) return

  try {
    const bcrypt = await import('bcryptjs')
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Password hashing failed'
    throw new Error(message)
  }
})

// Methods to compare password
adminUserSchema.methods.comparePassword = async function (
  this: UserDocument,
  candidatePassword: string
): Promise<boolean> {
  try {
    const bcrypt = await import('bcryptjs')
    return bcrypt.compare(candidatePassword, this.password)
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Password comparison failed'
    throw new Error(message)
  }
}

// Create models with proper typing
const Permission = (mongoose.models.Permission ||
  mongoose.model<PermissionDocument, PermissionModel>(
    'Permission',
    permissionSchema
  )) as PermissionModel

const Role = (mongoose.models.Role ||
  mongoose.model<RoleDocument, RoleModel>('Role', roleSchema)) as RoleModel

const AdminUser = (mongoose.models.AdminUser ||
  mongoose.model<UserDocument, UserModel>(
    'AdminUser',
    adminUserSchema
  )) as UserModel

export { Permission, Role, AdminUser }
export type {
  IPermission,
  IRole,
  IUser,
  PermissionDocument,
  RoleDocument,
  UserDocument,
  PermissionModel,
  RoleModel,
  UserModel,
}
