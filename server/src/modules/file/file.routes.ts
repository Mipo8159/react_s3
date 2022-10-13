import {FileController} from './controllers/file.controller'
import {Response, Request, NextFunction} from 'express'
import {RouterConfig} from '../../config/router.config'

export class FileRouter extends RouterConfig<FileController> {
  constructor() {
    super(FileController)
  }

  routes(): void {
    this.router.get(
      '/files/signed-url',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getSigniture(req, res, next)
    )

    this.router.get('/files', (req: Request, res: Response, next: NextFunction) =>
      this.controller.getFiles(req, res, next)
    )

    this.router.post('/files', (req: Request, res: Response, next: NextFunction) =>
      this.controller.createFile(req, res, next)
    )
  }
}
