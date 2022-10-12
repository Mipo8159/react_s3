import mongoose from 'mongoose'
import {FileType} from '../types/file.types'

const FileSchema = new mongoose.Schema<FileType>(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    imgUrl: {
      type: String,
      unique: true,
    },
  },
  {timestamps: true}
)

export default mongoose.model<FileType>('File', FileSchema)
