import { ActFullInfo } from '@/common/apis'
import { OperationType, ActivityStatusEnum } from '@/common/constants'
import { getOperationType } from '@/common/routes'
import { EditableConfig } from '@easy-page/antd-ui'
import { CommonSubActPageState } from '../../../interface'
import { configListModel } from '@/admin/common'
import { getActConfig } from '@/common/configs'
import { ConfigListInfo } from '@/common/apis/getConfigList'

const subActEditableConfigMap: Record<
  OperationType,
  (
    actDetail: ActFullInfo,
    options: {
      disabled?: boolean
      configs: ConfigListInfo[]
    }
  ) => EditableConfig<CommonSubActPageState>
> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo, { disabled, configs }) => {
    // if (disabled) {
    //   return false
    // }
    const actStatus = actDetail?.activity?.status
    if (
      [ActivityStatusEnum.Creating, ActivityStatusEnum.Pause].includes(
        actStatus
      )
    ) {
      return {
        canNotEditKeys: [],
      }
    }
    /** 待邀请 */
    if ([ActivityStatusEnum.Created].includes(actStatus)) {
      /** 2024.10.23 高优惠美补在带邀请状态下允许编辑 */
      return true
      // return {
      //   canNotEditKeys: [
      //     'agent.chargeAmt',
      //     'agent.maxAmount',
      //     'meituan.chargeAmt',
      //     'meituan.maxAmount',
      //     'merchant.chargeAmt',
      //     'merchant.chargeAmt',
      //     'pns.chargeSidePnform',
      //   ],
      // }
    }
    /** 报名中 待生效 生效中 */
    if (
      [
        ActivityStatusEnum.Applying,
        ActivityStatusEnum.TobeActive,
        ActivityStatusEnum.Active,
      ].includes(actStatus)
    ) {
      const config = getActConfig({
        templateId: actDetail?.templateId,
        configs: configs,
      })
      const canEditKeys: Array<keyof CommonSubActPageState> = [
        'name',
        'dishDiscountPriceRate',
        'dishDiscountPrice',
        'facePeople',
        'limitNumber',
        'dishSaleStock', // 菜品优惠库存
        'priceLimit', // 提报价格限制
        'mtPercent', // 每单美团成本占比
        'mtMaxMoney', //每单最高承担金额
      ]
      console.log('config.canEditQualifyAfterApply:', config, configs)
      if (config.actFactorInfo?.canEditQualifyAfterApply) {
        canEditKeys.push('qualify')
      }
      return {
        canEditKeys: canEditKeys,
      }
    }
    if (
      [ActivityStatusEnum.Inviting, ActivityStatusEnum.Terminated].includes(
        actStatus
      )
    ) {
      return false
    }
    return false
  },
}

export const getSubActDisEditableConfig = (
  actDetail: ActFullInfo,
  options: {
    disabled: boolean
    configs: ConfigListInfo[]
  }
): EditableConfig<CommonSubActPageState> => {
  const operationType = getOperationType()
  // return true
  return subActEditableConfigMap[operationType || OperationType.CREATE](
    actDetail,
    options
  )
}
