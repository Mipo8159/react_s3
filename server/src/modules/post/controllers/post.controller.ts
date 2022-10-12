import {Request, Response} from 'express'
import {NextFunction} from 'express-serve-static-core'
import {HttpResponse} from '../../../common/classes/httpResponse.class'
import {PostService} from '../services/post.service'

export class PostController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly postService: PostService = new PostService()
  ) {}

  // GET POSTS
  async getPosts(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.postService.getPosts()
      return this.httpResponse.Ok(res, {posts: result})
    } catch (error) {
      return next(error)
    }
  }

  // GET POST
  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const result = await this.postService.getPost(id)
      return this.httpResponse.Ok(res, {post: result})
    } catch (error) {
      return next(error)
    }
  }

  // CREATE POST
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body.post
      const result = await this.postService.createPost(dto)
      return this.httpResponse.Created(res, {post: result})
    } catch (error) {
      return next(error)
    }
  }

  // UPDATE POST
  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const dto = req.body.post
      const result = await this.postService.updatePost(id, dto)
      return this.httpResponse.Ok(res, {post: result})
    } catch (error) {
      return next(error)
    }
  }

  // DELETE POST
  async removePost(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      const result = await this.postService.removePost(id)
      return this.httpResponse.Ok(res, {removed: result})
    } catch (error) {
      return next(error)
    }
  }
}
