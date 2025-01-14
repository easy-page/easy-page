import { nodeUtil } from '@easy-page/antd-ui'
import { PoiTypeEnum } from '@/common'
import { CommonActCrudFormState } from '../../interface'

const TipsMap: Record<PoiTypeEnum, string> = {
  [PoiTypeEnum.All]: '',
  [PoiTypeEnum.Direct]:
    '邀请门店类型已选直营门店，故仅直营门店可收到活动，代理门店会被过滤',
  [PoiTypeEnum.Agent]:
    '邀请门店类型已选代理门店，故仅代理门店可收到活动，直营门店会被过滤',
}

export const poiTypeTips = nodeUtil.createCustomField<
  any,
  CommonActCrudFormState
>(
  'id-tips',
  ' ',
  ({ frameworkProps: { store } }) => {
    const { poiType = PoiTypeEnum.All } =
      store.pageState as CommonActCrudFormState

    return <div>{TipsMap[poiType]}</div>
  },
  {
    effectedKeys: ['poiType'],
  },
  {
    formItem: {
      className: 'mb-0',
    },
  }
)
