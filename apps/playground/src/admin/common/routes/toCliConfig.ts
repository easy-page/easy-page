import { appendParamsToUrl } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export type CliEditConfigParams = {
  configId: string
}

export const toCliEditConfig: ToPageHandler<CliEditConfigParams> = (
  params,
  target
) => {
  window.open(appendParamsToUrl(UrlEnum.EditCliConfig, params), target)
}
