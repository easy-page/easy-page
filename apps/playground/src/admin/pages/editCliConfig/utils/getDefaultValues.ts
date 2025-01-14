import { ConfigListInfo } from '@/common/apis/getConfigList'
import { TemplateIdType } from '@/common/constants/fieldMaps/interface'
import { TemplateMap } from '../constants'

export const getDefaultValues = ({
  configDetail,
  configsMap,
}: {
  configDetail?: ConfigListInfo
  configsMap?: Partial<Record<TemplateIdType, ConfigListInfo>>
}) => {
  const template = configDetail?.crudConfig?.template
  return {
    ...(configDetail || {}),
    crudConfig: {
      ...(configDetail?.crudConfig || {}),
      template: {
        choosed: template,
        options: Object.keys(TemplateMap).map((each) => ({
          label: configsMap?.[each as TemplateIdType]?.name,
          value: each,
        })),
      },
    },
  }
}
