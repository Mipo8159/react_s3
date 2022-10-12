import mongoose from 'mongoose'

export type FileType = {
  _id: mongoose.Types.ObjectId
  key: string
  imgUrl: string
  createtAt: string
  updatedAt: string
}
