import { nodeUtil } from '@easy-page/antd-ui'
import {
  ActionTypeEnum,
  BIZ_TYPE_MAP,
  getBizLine,
  InputTypeEnum,
  PoiTypeEnum,
} from '@/common'
import { useMemo } from 'react'
import { CommonActCrudFormState, InviteWay } from '../../../interface'

/** 输入框下方提示文案 */
export const invitationTips = nodeUtil.createCustomField<
  any,
  CommonActCrudFormState
>(
  'invitation-tips',
  ' ',
  ({ frameworkProps: { store } }) => {
    const {
      poiType: poiTypeOfState,
      inputIdsWay: inputType,
      activity,
      dataType,
    } = store.pageState as CommonActCrudFormState
    /** 邀请设置里无：poiTypeOfState */
    const poiType = poiTypeOfState || activity?.poiType
    const invitationTip = useMemo(() => {
      if (poiType === PoiTypeEnum.All) {
        if (
          dataType === InviteWay.ByFilter &&
          inputType === `${InputTypeEnum.FilterAssemble}`
        ) {
          return `仅可选择业务类型为${
            BIZ_TYPE_MAP[getBizLine()]
          }，已生成状态的商家类筛选集`
        }
        if (
          dataType === InviteWay.ByFilter &&
          inputType === `${InputTypeEnum.CityChannel}`
        ) {
          return `已选择全部门店，将圈选出以上城市渠道的全部门店范围`
        }
      }
      if (poiType === PoiTypeEnum.Direct) {
        if (dataType === InviteWay.ByPoiInvite) {
          return '已选择直营门店，上传的门店ID需为直营类型，否则无法保存成功'
        }
        if (dataType === InviteWay.ByMerchantBrand) {
          return '已选择直营门店，仅支持邀请连锁商家下的直营门店参与活动'
        }
        if (
          dataType === InviteWay.ByFilter &&
          inputType === `${InputTypeEnum.FilterAssemble}`
        ) {
          return `已选择直营门店，仅可选择业务类型为${
            BIZ_TYPE_MAP[getBizLine()]
          }，【代理商】因子中排除了代理商，已生成状态的商家类筛选集`
        }
        if (
          dataType === InviteWay.ByFilter &&
          inputType === `${InputTypeEnum.CityChannel}`
        ) {
          return `已选择直营门店，将圈选出以上城市渠道的直营门店范围`
        }
      }
      if (poiType === PoiTypeEnum.Agent) {
        if (dataType === InviteWay.ByPoiInvite) {
          return '已选择代理门店，上传的门店 ID 需为代理类型，否则无法保存成功'
        }
        if (dataType === InviteWay.ByMerchantBrand) {
          return '已选择代理门店，仅支持邀请连锁商家下的代理门店参与活动'
        }
        if (dataType === InviteWay.ByFilter) {
          return `已选择代理门店，仅可选择业务类型为${
            BIZ_TYPE_MAP[getBizLine()]
          }、【代理商】因子选择了代理商、已生成状态的商家类筛选集`
        }
        if (inputType === `${InputTypeEnum.CityChannel}`) {
          return `已选择代理门店，将圈选出以上城市渠道的代理门店范围`
        }
      }
    }, [poiType, dataType, inputType])
    return <div className="text-[gray]">{invitationTip}</div>
  },
  {
    effectedKeys: ['dataType', 'inputIdsWay', 'poiType'],
    postprocess: () => ({}),
    when: {
      effectedKeys: ['chooseOperation', 'dataType', 'inputIdsWay', 'poiType'],
      show({ effectedData }) {
        return effectedData['chooseOperation'] !== `${ActionTypeEnum.Unlimited}`
      },
    },
  },
  {
    formItem: {
      className: 'mb-0',
    },
  }
)
