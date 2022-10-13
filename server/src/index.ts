import express, {Response, Request, NextFunction, Router} from 'express'
import {EnvConfig} from './config/env.config'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'
import {ErrorMiddleware} from './common/middlewares/error.middleware'
import {PostRouter} from './modules/post/post.routes'
import {FileRouter} from './modules/file/file.routes'

class Main extends EnvConfig {
  private port: number = this.getNumEnv('PORT')
  private app: express.Application = express()

  constructor() {
    super()

    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(cookieParser())
    this.app.use(morgan('dev'))
    this.app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
      })
    )

    // Routes Middleware
    this.app.use('/api', this.router())

    // Error Middleware
    this.app.use((err: Error, _: Request, res: Response, next: NextFunction) =>
      new ErrorMiddleware().Middleware(err, _, res, next)
    )

    this.connectDB().then(() => this.listen())
  }

  private router(): Array<Router> {
    return [new FileRouter().router, new PostRouter().router]
  }

  private async connectDB() {
    await this.innitConn()
      .then(() => console.log(colors.magenta.bold('Database connected')))
      .catch((err) => console.log(colors.red.bold(err)))
  }

  private listen() {
    this.app.listen(this.port, () =>
      console.log(
        colors.cyan.bold(`Api is running on http://localhost:${this.port}`)
      )
    )
  }
}

new Main()
