import { DefaultPageProps } from '@easy-page/antd-ui'
import {
  OperationType,
  SubMarketingPlan,
  SubMarketingPlanStatus,
} from '@/common'
import { UnionCouponSubPlanFormState } from '../interface'

export const getEditableConfig = ({
  defaultValue,
  mode,
}: {
  defaultValue: SubMarketingPlan
  mode: OperationType
}): DefaultPageProps<UnionCouponSubPlanFormState>['editable'] => {
  const groupStatus = defaultValue.groupStatus
  if ([OperationType.CREATE, OperationType.COPY].includes(mode)) {
    return true
  }
  // 查看状态不是这个页面，所以这里只有 edit
  if (!defaultValue?.id) {
    /** 没有 id，编辑时，是新增的方案，可以修改字段 */
    return true
  }

  if (groupStatus === SubMarketingPlanStatus.ToStart) {
    return {
      canEditKeys: [
        'baseInfo.subPlanName',
        'baseInfo.userGroup',
        'baseLevelPrice',
        'meituanLowestSubsidy',
        'merchantMaxSubsidy',
        'commissionRatio',
      ],
    }
  }
  if (groupStatus === SubMarketingPlanStatus.Pause) {
    return {
      canNotEditKeys: [
        'baseInfo.subPlanName', // 子方案名称
        'baseInfo.userGroup', // 可用人群
        'baseLevelPrice',
        'merchantMaxSubsidy',
        'commissionRatio',
      ],
    }
  }
  return {
    canEditKeys: ['baseInfo.subPlanName', 'baseInfo.userGroup'],
  }
}
