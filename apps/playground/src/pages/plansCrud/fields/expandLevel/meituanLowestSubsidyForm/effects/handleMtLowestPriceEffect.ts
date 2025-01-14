import { ChildFormItem, FormUtil, validateNextChildForm } from "@easy-page/antd-ui";
import { MeituanLowestSubsidyFormState } from "../../../subPlan";
// import { MeituanLowestSubsidyFormState } from "../../../../../interface";

/** 当时段发生变化，校验下一行的值 */
export const handleMtLowestPriceEffect = async ({
  childForms,
  formIndex,
  formUtils,
}: {
  childForms: ChildFormItem[];
  formIndex: number;
  formUtils: Record<string, FormUtil<MeituanLowestSubsidyFormState>>;
}) => {
  return validateNextChildForm({
    formIndex,
    formUtils,
    childForms,
    keysToValidate: ['meituanSubsidyPrice'],
    curFieldKey: 'meituanSubsidyPrice',
    checkNextChildForm(nextChildFormData) {
      return Boolean(nextChildFormData.meituanSubsidyPrice)
    },
  })
};

