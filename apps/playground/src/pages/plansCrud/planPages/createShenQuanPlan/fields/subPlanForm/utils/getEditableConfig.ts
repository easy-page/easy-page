import { DefaultPageProps } from '@easy-page/antd-ui'
import { ShenQuanSubPlanFormState } from '../interface'
import {
  OperationType,
  SubMarketingPlan,
  SubMarketingPlanStatus,
} from '@/common'

export const getEditableConfig = ({
  defaultValue,
  mode,
}: {
  defaultValue: SubMarketingPlan
  mode: OperationType
}): DefaultPageProps<ShenQuanSubPlanFormState>['editable'] => {
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
        'settingGears',
      ],
    }
  }
  console.log('groupStatus胡雪', groupStatus)
  if (groupStatus === SubMarketingPlanStatus.Pause) {
    return {
      canNotEditKeys: [
        'baseInfo.subPlanName', // 子方案名称
        'baseInfo.userGroup', // 可用人群
        'baseLevelPrice',
        'merchantMaxSubsidy',
        'settingGears', // 设置档位
      ],
    }
  }
  return {
    canEditKeys: ['baseInfo.subPlanName', 'baseInfo.userGroup'],
  }
}
