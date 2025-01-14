import { appendParamsToUrl, OperationType } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'
import { AdminTabs } from '../constant'

export enum ConfigListParamsEmnum {
  Tab = 'tab',
}

export type ConfigListParams = {
  [ConfigListParamsEmnum.Tab]?: AdminTabs
}

export const toConfigList: ToPageHandler<ConfigListParams> = (
  params,
  target
) => {
  window.open(appendParamsToUrl(UrlEnum.Home, params), target)
}
