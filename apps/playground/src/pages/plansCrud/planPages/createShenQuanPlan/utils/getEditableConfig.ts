import { DefaultPageProps } from "@easy-page/antd-ui";
import { OperationType, PlanStatusEnum } from "@/common";
import { ShenQuanPlanFormState } from "../interface";

export const getEditableConfig = (
  { mode, planStatus }: {
    mode: OperationType
    planStatus: PlanStatusEnum,
  }
): DefaultPageProps<ShenQuanPlanFormState>['editable'] => {
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