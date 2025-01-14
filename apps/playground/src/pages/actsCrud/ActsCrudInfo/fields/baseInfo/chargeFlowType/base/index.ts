import { ChargeFlowTypeEnum, PoiTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { CommonActCrudFormState } from '../../../interface'

const ExtraTips: Record<PoiTypeEnum, string> = {
  [PoiTypeEnum.All]: '如需配置补贴，您需同时申请直营美补和代理美补权限',
  [PoiTypeEnum.Direct]: '如需配置补贴，您需申请直营美补权限',
  [PoiTypeEnum.Agent]: '如需配置补贴，您需申请代理美补权限',
}

export const chargeFlowType = ({
  disableExtraTips,
  extraInfo,
}: {
  disableExtraTips?: boolean
  extraInfo?: Partial<Record<PoiTypeEnum, string>>
}) =>
  nodeUtil.createField<ChargeFlowTypeEnum[], CommonActCrudFormState>(
    'chargeFlowType',
    '补贴类型',
    {
      mode: 'multiple',
      required: true,
      effectedKeys: ['poiType'],
      validate: ({ value }) => {
        return {
          success: value && value.length > 0,
          errorMsg: '请选择补贴类型',
        }
      },
      preprocess: ({ defaultValues }) => {
        return get(defaultValues, 'activity.chargeFlowType') || []
      },
      postprocess: ({ value }) => {
        return {
          'activity.chargeFlowType': value,
        }
      },
    },
    {
      formItem: {
        customExtra: ({ frameworkProps: { store } }) => {
          const { poiType } = store.getAllState() as CommonActCrudFormState
          if (!poiType || disableExtraTips) {
            return ''
          }
          console.log('extraInfo:', extraInfo)
          if (extraInfo) {
            return extraInfo[poiType] || ''
          }
          return ExtraTips[poiType]
        },
      },
    }
  )
