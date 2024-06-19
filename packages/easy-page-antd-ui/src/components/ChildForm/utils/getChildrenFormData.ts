import { FormUtil } from "@easy-page/react-ui";

export function getChildrenFormData<FormData>(
  formUtils?: Record<string, FormUtil<FormData>>
) {
  return Object.values(formUtils || {}).map((e) => e.getFormData());
}