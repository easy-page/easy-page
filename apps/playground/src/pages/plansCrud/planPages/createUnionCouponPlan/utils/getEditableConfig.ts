import { DefaultPageProps } from "@easy-page/antd-ui";
import { OperationType, PlanStatusEnum } from "@/common";
import { UnionCouponPlanFormState } from "../interface";

export const getEditableConfig = (
  { mode, planStatus }: {
    mode: OperationType
    planStatus: PlanStatusEnum,
  }
): DefaultPageProps<UnionCouponPlanFormState>['editable'] => {
  if ([OperationType.CREATE, OperationType.COPY].includes(mode)) {
    return true;
  }
  if (planStatus === PlanStatusEnum.TobePublish) {
    return {
      canEditKeys: ['name', 'intro']
    }
  }
  return {
    canEditKeys: ['intro']
  }
}