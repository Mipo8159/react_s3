import {FileController} from './controllers/file.controller'
import {Response, Request, NextFunction} from 'express'
import {RouterConfig} from '../../config/router.config'

export class FileRouter extends RouterConfig<FileController> {
  constructor() {
    super(FileController)
  }

  routes(): void {
    this.router.get('/files', (req: Request, res: Response, next: NextFunction) =>
      this.controller.getFiles(req, res, next)
    )

    this.router.get(
      '/files/:id',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getFile(req, res, next)
    )

    this.router.post(
      '/bucket/s3',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getS3(req, res, next)
    )

    this.router.post('/files', (req: Request, res: Response, next: NextFunction) =>
      this.controller.uploadS3(req, res, next)
    )

    this.router.delete(
      '/files/:id',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.removeS3(req, res, next)
    )
  }
}
