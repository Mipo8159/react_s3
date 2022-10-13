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

  // CREATE FILE
  async createFile(req: Request, res: Response, next: NextFunction) {
    try {
      const {key} = req.body
      console.log(key)
      const result = await this.fileService.createFile(key)
      return this.httpResponse.Ok(res, {file: result})
    } catch (error) {
      return next(error)
    }
  }
}
