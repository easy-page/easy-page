import { PlanStatusEnum } from "@/common/constants";
import { CommonPlanStatusProps } from "../constant";
import { ShowStatusBoxProps } from "../../../common/interface";

export const PlanStatusColors: Record<PlanStatusEnum, ShowStatusBoxProps> = {
  [PlanStatusEnum.TobePublish]: CommonPlanStatusProps.red,
  [PlanStatusEnum.Published]: CommonPlanStatusProps.green,
  [PlanStatusEnum.Terminated]: CommonPlanStatusProps.gray
}