import { appendParamsToUrl } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export type ToBatchConfigParams = {}
export const toBatchConfig: ToPageHandler<ToBatchConfigParams> = (
  params,
  target
) => {
  window.open(
    appendParamsToUrl(UrlEnum.BatchConfig, {
      ...params,
    }),
    target
  )
}
