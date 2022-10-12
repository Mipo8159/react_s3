import {EnvConfig} from '../../../config/env.config'
import S3 from 'aws-sdk/clients/s3'
import {v4} from 'uuid'
import {ApiError} from '../../../common/errors/apiError'

export class AwsService extends EnvConfig {
  public s3 = new S3({
    credentials: {
      accessKeyId: this.getEnv('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.getEnv('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.getEnv('AWS_REGION'),
  })

  signedUrl(file: Express.Multer.File) {
    this.s3.getSignedUrl(
      'putObject',
      {
        Bucket: this.getEnv('AWS_BUCKET'),
        Key: v4() + file.originalname,
        ContentType: file.mimetype,
      },
      (err, url) => {
        if (err) throw ApiError.BadRequest(err.message)
        return url
      }
    )
  }
}
