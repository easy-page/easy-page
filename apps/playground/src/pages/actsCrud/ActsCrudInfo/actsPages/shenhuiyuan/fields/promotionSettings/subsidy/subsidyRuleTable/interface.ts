import { FormUtil, SelectState } from "@easy-page/antd-ui";
import { RangePickerProps } from "antd/es/date-picker";
import { RangeState } from "@/common/fields";

export type PeriodState = RangePickerProps['value']

export type RuleTableFormState = {
  chargeSidePoi: RangeState;
  chargeSideMtb: RangeState;
  chargeSideAgent: RangeState;
  userGroup: SelectState<string>
  period: PeriodState
  allDay?: string;
}
export type RuleTableFormProps = {
  onRemove: (formId: string) => void;
  formId: string;
  formIdx: number;
  lastFormUtil: FormUtil<RuleTableFormState>;
}