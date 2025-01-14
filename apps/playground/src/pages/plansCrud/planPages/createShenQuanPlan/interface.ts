import { ToolbarProps } from "@/common/fields/common/toolbar/interface";
import { CommonPlanFormProps } from "../../fields/interface";
import { ChildFormState, DefaultPageProps } from "@easy-page/antd-ui";
import { PlanStatusEnum } from "@/common";

export type ShenQuanPlanFormState = {
  planType: string
  id?: number;
  name?: string;
  status?: PlanStatusEnum;
  intro?: string;
  subPlan?: ChildFormState<Record<string, any>>;
}

export type ShenQuanPlanFormProps = CommonPlanFormProps & ToolbarProps & DefaultPageProps<ShenQuanPlanFormState>