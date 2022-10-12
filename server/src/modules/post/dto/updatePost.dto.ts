import mongoose from 'mongoose'

export class UpdatePostDto {
  title?: string
  body?: string
  description?: string
  images?: mongoose.Types.ObjectId[]
}
