import { PoiTypeEnum, PoiTypeText } from '@/common'
import { basePoiType } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { set } from 'lodash'

export const csPoiType = nodeUtil
  .extends(basePoiType(), {
    fieldUIConfig(oldFieldUIConfig) {
      const newConfig = oldFieldUIConfig || {}
      set(
        newConfig,
        'formItem.tooltip',
        '选择直营门店时，后续活动邀请只能对直营门店发起邀请；选择代理门店同理；选择全部门店时可同时对直营和代理门店发起邀请'
      )
      return newConfig
    },
  })
  .appendChildren([
    nodeUtil.createNode(
      PoiTypeEnum.All,
      { name: PoiTypeText.all },
      { radio: { disabled: true } }
    ),
    nodeUtil.createNode(PoiTypeEnum.Direct, { name: PoiTypeText.direct }),
    nodeUtil.createNode(
      PoiTypeEnum.Agent,
      { name: PoiTypeText.agent },
      {
        radio: {
          disabled: true,
        },
      }
    ),
  ])
