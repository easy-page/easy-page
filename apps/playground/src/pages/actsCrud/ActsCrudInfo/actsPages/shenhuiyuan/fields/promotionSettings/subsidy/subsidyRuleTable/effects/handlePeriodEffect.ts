import { ChildFormItem, FormUtil, validateNextChildForm } from "@easy-page/antd-ui";
import { RuleTableFormState } from "../interface";

/** 当时段发生变化，校验下一行的值 */
export const handlePeriodEffect = async ({
  childForms,
  formIndex,
  formUtils,
}: {
  childForms: ChildFormItem[];
  formIndex: number;
  formUtils: Record<string, FormUtil<RuleTableFormState>>;
}) => {
  return validateNextChildForm({
    formIndex,
    formUtils,
    childForms,
    keysToValidate: ['period'],
    curFieldKey: 'period',
    checkNextChildForm(nextChildFormData) {
      const period = nextChildFormData.period;
      return Boolean(period[0])
    },
  })
};

