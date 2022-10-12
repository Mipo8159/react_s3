import {NextFunction, Response, Request} from 'express'
import {ApiError} from '../errors/apiError'
import {ErrorStatus} from '../errors/errorStatus'
import {HttpCode} from '../types/http.enum'

export class ErrorMiddleware {
  Middleware(err: Error, _: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
      res.status(err.status).json({
        status: err.status,
        message: ErrorStatus.GetStatus(err.status),
        error: {apiError: err.message},
      })
    }

    // UNPREDICTED ERROR
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json({status: HttpCode.INTERNAL_SERVER_ERROR, error: 'Unpredicted Error'})
    return next()
  }
}
