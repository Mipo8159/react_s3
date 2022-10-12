import mongoose from 'mongoose'
import {PostType} from '../types/post.types'

export const PostSchema = new mongoose.Schema<PostType>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'File',
      },
    ],
  },
  {timestamps: true}
)

export default mongoose.model<PostType>('Post', PostSchema)
