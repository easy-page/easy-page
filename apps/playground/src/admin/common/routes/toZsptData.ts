import { appendParamsToUrl } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export const toZsptData: ToPageHandler<{ isQa?: 'yes' }> = (params, target) => {
  window.open(
    appendParamsToUrl(UrlEnum.ZsptData, {
      ...params,
    }),
    target
  )
}
