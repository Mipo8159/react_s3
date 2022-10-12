import {ApiError} from '../../../common/errors/apiError'
import {CreatePostDto} from '../dto/createPost.dto'
import {UpdatePostDto} from '../dto/updatePost.dto'
import PostModel from '../models/post.model'
import {PostType} from '../types/post.types'

export class PostService {
  // GET POSTS
  async getPosts(): Promise<PostType[]> {
    return await PostModel.find().populate('images')
  }

  // GET POST
  async getPost(id: string): Promise<PostType> {
    const post = await PostModel.findById(id).populate('images')
    if (!post) {
      throw ApiError.NotFound('Post not found')
    }
    return post
  }

  // CREATE POST
  async createPost(post: CreatePostDto): Promise<PostType> {
    return await PostModel.create(post)
  }

  // UPDATE POST
  async updatePost(id: string, post: UpdatePostDto): Promise<PostType> {
    return await PostModel.findByIdAndUpdate(id, post, {new: true})
  }

  // DELETE POST
  async removePost(id: string): Promise<boolean> {
    return Boolean(await PostModel.findByIdAndDelete(id))
  }
}
