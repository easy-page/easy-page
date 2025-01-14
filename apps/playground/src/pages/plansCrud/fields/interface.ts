import { ChildFormState } from "@easy-page/antd-ui";

export type CommonPlanFormProps = {
  maxExpandLevelMcc: number;
  maxSubPlanCount: number;
}




/** 通用的表单字段定义 */
export type CommonPlanFormState = {
  /** 不同的方案，子方案内容不一样，所以是：Record */
  subPlan: ChildFormState<Record<string, any>>
}