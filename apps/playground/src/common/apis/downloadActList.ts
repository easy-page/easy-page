import { BizLineEnum } from '../constants'
import { postReq, RequestHandler } from '../libs'
import { ActListFilter } from './actList'

export type DownloadActListParams = {
  downloadType: DownloadType
  downloadTemplateIdList: number[]
  queryActListReq: ActListFilter & {
    bizLine?: BizLineEnum
  }
}

export enum DownloadType {
  Merge = 'merge',
  SplitByPoiBrand = 'splitByPoiBrand',
}

export type DownloadActListRes = {}

export const downloadActList: RequestHandler<
  DownloadActListParams,
  DownloadActListRes
> = (params) => {
  return postReq('/api/zspt/operation/act/downloadActList', params)
}
