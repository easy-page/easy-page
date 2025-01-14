import { OperationType } from "@/common";
import { createPrimaryTitleContainer } from "@/common/fields";

export const createChildPlanContainer = () => createPrimaryTitleContainer(
  'zspt-child-plan-container',
  () => '子方案',
);


export const createZsptPlanContainer = () => createPrimaryTitleContainer(
  'zspt-plan-container',
  (mode) => {
    const titleMap: Record<OperationType, string> = {
      [OperationType.CREATE]: '新建招商方案',
      [OperationType.COPY]: "复制招商方案",
      [OperationType.VIEW]: "查看招商方案",
      [OperationType.EDIT]: "编辑招商方案"
    }
    return titleMap[mode];
  },

);


