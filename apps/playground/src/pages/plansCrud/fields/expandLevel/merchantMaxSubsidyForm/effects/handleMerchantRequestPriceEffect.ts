import { ChildFormItem, FormUtil, validateNextChildForm } from "@easy-page/antd-ui";
import { MerchantMaxSubsidyFormState } from "../../../subPlan";
// import { MerchantMaxSubsidyFormState } from "../../../../../interface";

/** 当商家最高补贴变化，校验下一行的值 */
export const handleMerchantRequestPriceEffect = async ({
  childForms,
  formIndex,
  formUtils,
}: {
  childForms: ChildFormItem[];
  formIndex: number;
  formUtils: Record<string, FormUtil<MerchantMaxSubsidyFormState>>;
}) => {
  return validateNextChildForm({
    formIndex,
    formUtils,
    childForms,
    keysToValidate: ['merchantRequestPrice'],
    curFieldKey: 'merchantRequestPrice',
    checkNextChildForm(nextChildFormData) {
      return Boolean(nextChildFormData.merchantRequestPrice)
    },
  })
};

