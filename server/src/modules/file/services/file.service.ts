import {EnvConfig} from '../../../config/env.config'
import FileModel from '../models/file.model'
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

  // SIGNED URL
  async getSigniture() {
    return await this.awsService.signedUrl()
  }

  // CREATE FILE
  async createFile(key: string) {
    return await FileModel.create({key})
  }
}
