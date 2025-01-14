import { ChildFormItem } from "@easy-page/antd-ui";

export type OperationContext = {
  childForms: ChildFormItem[];
  onRemove?: () => void;
  groupId?: number;
  updateStatusToStop?: () => void;
}