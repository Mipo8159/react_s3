import {NextFunction, Request, Response} from 'express'
import {RouterConfig} from '../../config/router.config'
import {PostController} from './controllers/post.controller'

export class PostRouter extends RouterConfig<PostController> {
  constructor() {
    super(PostController)
  }

  routes(): void {
    this.router.get('/posts', (req: Request, res: Response, next: NextFunction) =>
      this.controller.getPosts(req, res, next)
    )

    this.router.get(
      '/posts/:id',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getPost(req, res, next)
    )

    this.router.post('/posts', (req: Request, res: Response, next: NextFunction) =>
      this.controller.createPost(req, res, next)
    )

    this.router.put(
      '/posts/:id',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.updatePost(req, res, next)
    )

    this.router.delete(
      '/posts/:id',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.removePost(req, res, next)
    )
  }
}
