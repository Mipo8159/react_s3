import mongoose from 'mongoose'

export class CreatePostDto {
  title: string
  body: string
  description: string
  images: mongoose.Types.ObjectId[]
}
