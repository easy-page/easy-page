import { appendParamsToUrl, CrudActParams } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export const toPreviewRecord: ToPageHandler<Partial<CrudActParams>> = (
  params,
  target
) => {
  window.open(
    appendParamsToUrl(UrlEnum.PreviewRecord, {
      ...params,
    }),
    target
  )
}
