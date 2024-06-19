import { FormUtil } from "@easy-page/react-ui";

export function getChildrenOriginFormData<FormData>(
  formUtils?: Record<string, FormUtil<FormData>>
) {
  return Object.values(formUtils || {}).map((e) => e.getOriginFormData());
}