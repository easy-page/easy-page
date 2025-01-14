import { appendParamsToUrl } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export enum DiffTabs {
  DiffField = 'diffField',
  DiffAct = 'diffAct',
}

export type ConfigDiffParams = {
  tab?: DiffTabs
}

export const DiffTabsText: Record<DiffTabs, string> = {
  [DiffTabs.DiffField]: '对比配置项',
  [DiffTabs.DiffAct]: '对比活动',
}

export const toConfigDiff: ToPageHandler<ConfigDiffParams> = (
  params,
  target
) => {
  window.open(
    appendParamsToUrl(UrlEnum.ConfigDiff, {
      tab: DiffTabs.DiffField,
      ...params,
    }),
    target
  )
}
