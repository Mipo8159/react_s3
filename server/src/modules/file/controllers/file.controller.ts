import {Request, Response, NextFunction} from 'express'
import {HttpResponse} from '../../../common/classes/httpResponse.class'
import {FileService} from '../services/file.service'

export class FileController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly fileService: FileService = new FileService()
  ) {}

  // SIGNED URL
  async getSigniture(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.fileService.getSigniture()
      return this.httpResponse.Ok(res, {signature: result})
    } catch (error) {
      return next(error)
    }
  }

  // GET FILES
  async getFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const {page} = req.query
      const result = await this.fileService.getFiles(Number(page))
      return this.httpResponse.Ok(res, {files: result})
    } catch (error) {
      return next(error)
    }
  }

  // GET FILE
  async getFile(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const result = await this.fileService.getFile(id)
      return this.httpResponse.Ok(res, {file: result})
    } catch (error) {
      return next(error)
    }
  }

  // UPLOAD FILE S3
  async uploadS3(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as any
      const result = await this.fileService.uploadS3(files)
      return this.httpResponse.Created(res, {files: result})
    } catch (error) {
      return next(error)
    }
  }

  // REMOVE FILE S3
  async removeS3(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const result = await this.fileService.removeFile(id)
      return this.httpResponse.Ok(res, {removed: result})
    } catch (error) {
      return next(error)
    }
  }

  async getS3(req: Request, res: Response, next: NextFunction) {
    try {
      const {key} = req.body
      const result = await this.fileService.getS3(key)
      return this.httpResponse.Ok(res, {s3: result})
    } catch (error) {
      return next(error)
    }
  }
}
