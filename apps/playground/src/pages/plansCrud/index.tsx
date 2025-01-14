import {
  BizLineEnum,
  PlanTypeEnum,
  configListModel,
  getBizLine,
  getOperationType,
  getPlanId,
  getPlanType,
  userModel,
} from '@/common'
import {
  CreateGodPricePlan,
  CrudShenHuiYuanPlan,
  CrudShenQuanPlan,
  CrudUnionCouponPlan,
} from './planPages'

import { useEffect } from 'react'
import { checkAuthOfPlanCrud } from './utils'
import { useOverWatch } from '@/common/overwatch'
import { OverWatchScenceTypeEnum } from '@/common/overwatch/constant'
import { getPlanConfig } from '@/common/configs'

// eslint-disable-next-line react-refresh/only-export-components
export const PlansCrudPageMap: Record<
  PlanTypeEnum,
  (bizLine: BizLineEnum) => React.ReactNode
> = {
  [PlanTypeEnum.Brand]: () => <></>,
  [PlanTypeEnum.GodPrice]: () => <CreateGodPricePlan />,
  [PlanTypeEnum.ShenHuiYuan]: (bizLine) => {
    return bizLine === 0 ? <CrudShenHuiYuanPlan /> : <CrudShenQuanPlan />
  },
  [PlanTypeEnum.UnionCoupon]: () => <CrudUnionCouponPlan />,
}

export const PlansCrud = () => {
  const { data: userInfo } = userModel.getData()
  const { data: allConfigs } = configListModel.getList() || {}
  const planType = getPlanType()
  const config = getPlanConfig({ planType: planType, configs: allConfigs })

  useOverWatch(
    {
      // 获取操作类型
      scenarioId: getOperationType(),
      // 活动提交场景
      teamId: OverWatchScenceTypeEnum.PlanSubmit,
      // 获取方案ID
      pageId: String(getPlanId()) || '',
      // 获取业务线信息
      bizType: `${getBizLine()}`,
      /** 活动类型 */
      subProjectId: `${getPlanType()}`,
    },
    userInfo
  )

  useEffect(() => {
    if (userInfo.mis) {
      checkAuthOfPlanCrud(userInfo, planType, config?.name)
    }
  }, [])
  return PlansCrudPageMap[planType](config?.bizLine)
}
