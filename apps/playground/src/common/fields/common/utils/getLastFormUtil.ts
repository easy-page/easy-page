import { ChildFormState } from "@easy-page/antd-ui";

export const getLastFormUtil = ({
  formIndex,
  value,
}: {
  formIndex: number;
  value: ChildFormState<Record<string, any>>;
}) => {
  const { childForms, formUtils } = value;
  const lastChildForm = childForms[formIndex - 1];
  if (lastChildForm) {
    return formUtils?.[lastChildForm.id];
  }
  return undefined;
};
