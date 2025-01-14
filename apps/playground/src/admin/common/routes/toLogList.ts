import { appendParamsToUrl } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export enum LogListParamsEmnum {}

export type LogListParams = {}

export const toLogList: ToPageHandler<LogListParams> = (params, target) => {
  window.open(appendParamsToUrl(UrlEnum.LogList, params), target)
}
