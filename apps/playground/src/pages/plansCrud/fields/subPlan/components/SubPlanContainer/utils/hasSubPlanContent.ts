import type { FormUtil } from "@easy-page/antd-ui";

export const hasSubPlanContent = (formUtil: FormUtil<Record<string, any>>) => {
  const formData = formUtil?.getOriginFormData() || {};
  const hasName = Boolean(formData['baseInfo.subPlanName']);
  // const hasUserGroup = (formData['baseInfo.userGroup'] || []).length > 0;
  //  const hasBaseLevelPrice = Boolean(formData['baseLevelPrice']);
  return Boolean(hasName)
}

// export {}
