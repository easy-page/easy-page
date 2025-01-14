import { DefaultPageProps } from "@easy-page/antd-ui";
import { ShenhuiyuanSubPlanFormState } from "../interface";
import { OperationType, SubMarketingPlan, SubMarketingPlanStatus } from "@/common";

export const getEditableConfig = (
  { defaultValue, mode }: {
    defaultValue: SubMarketingPlan,
    mode: OperationType
  }
): DefaultPageProps<ShenhuiyuanSubPlanFormState>['editable'] => {
  const groupStatus = defaultValue.groupStatus;
  if ([OperationType.CREATE, OperationType.COPY].includes(mode)) {
    return true;
  }
  // 查看状态不是这个页面，所以这里只有 edit
  if (!defaultValue?.id) {
    /** 没有 id，编辑时，是新增的方案，可以修改字段 */
    return true
  }

  if (groupStatus === SubMarketingPlanStatus.ToStart) {
    return {
      canEditKeys: ['baseInfo.subPlanName', 'baseInfo.userGroup', 'baseLevelPrice', 'meituanLowestSubsidy', 'merchantMaxSubsidy',]
    }
  }
  if (groupStatus === SubMarketingPlanStatus.Pause) {
    return {
      canNotEditKeys: [
        'baseInfo.subPlanName', // 子方案名称
        'baseInfo.userGroup', // 可用人群
        // 'baseLevelPrice',
        // 'merchantMaxSubsidy',
      ],
    }
  }
  return {
    canEditKeys: ['baseInfo.subPlanName', 'baseInfo.userGroup']
  }
}