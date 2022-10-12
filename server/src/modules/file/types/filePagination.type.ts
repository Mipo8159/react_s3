import {FileType} from './file.type'

export type FilePaginationType = {
  files: FileType[]
  meta: {
    page: number
    count: number
    lastPage: number
  }
}
