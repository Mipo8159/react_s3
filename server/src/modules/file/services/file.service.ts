import {ApiError} from '../../../common/errors/apiError'
import {EnvConfig} from '../../../config/env.config'
import FileModel from '../models/file.model'
import {FileType} from '../types/file.types'
import {FilePaginationType} from '../types/filePagination.type'
import {AwsService} from './aws.service'

export class FileService extends EnvConfig {
  constructor(private readonly awsService: AwsService = new AwsService()) {
    super()
  }

  // GET FILES (STORAGE)
  async getFiles(page: number = 1): Promise<FilePaginationType> {
    const limit: number = 18

    const count = await FileModel.find().count()
    const files = await FileModel.find()
      .limit(limit)
      .skip((page - 1) * limit)

    return {
      files,
      meta: {
        page,
        count,
        lastPage: Math.ceil(count / limit),
      },
    }
  }

  // GET FILE (STORAGE)
  async getFile(id: string): Promise<FileType> {
    return 123 as any
  }

  // GET FILE (S3)
  async getS3(key: string): Promise<string> {
    return 123 as any
  }

  // UPLOAD FILE (S3)
  async uploadS3(files: Express.Multer.File[]): Promise<FileType[]> {
    return 123 as any
  }

  // REMOVE (S3)
  async removeFile(id: string): Promise<boolean> {
    return 123 as any
  }
}
