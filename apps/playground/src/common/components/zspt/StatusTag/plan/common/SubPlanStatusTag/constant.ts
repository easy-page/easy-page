
import { ShowStatusBoxProps } from "../../../common";
import { CommonPlanStatusProps } from "../constant";
import { SubMarketingPlanStatus } from "@/common/apis";

export const SubPlanStatusColors: Record<SubMarketingPlanStatus, ShowStatusBoxProps> = {
  /** TODO：待开启颜色待确认, 本次没有对齐颜色 */
  [SubMarketingPlanStatus.ToStart]: CommonPlanStatusProps.red,
  [SubMarketingPlanStatus.Started]: CommonPlanStatusProps.green,
  /** TODO：已结束颜色待确认, 本次没有对齐颜色 */
  [SubMarketingPlanStatus.End]: CommonPlanStatusProps.gray,
  [SubMarketingPlanStatus.Pause]: CommonPlanStatusProps.gray
}