// src/types/mongoose.d.ts
import type mongoose from 'mongoose'

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  } | undefined
}

export interface MongooseConnection {
  conn: mongoose.Connection | null
  promise: Promise<mongoose.Connection> | null
}