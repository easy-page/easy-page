import { ChildFormItem, FormUtil, updateNextChildForm } from "@easy-page/antd-ui";
import { MerchantMaxSubsidyFormState } from "../../../subPlan";
// import { MerchantMaxSubsidyFormState } from "../../../../../interface";

/** 当券前价格变化时，更新下一行的最小券前价格 */
export const handleQuanQianJiaEffect = async ({
  childForms,
  formIndex,
  formId,
  formUtils,
  validateMerchantRequestPrice,
  curVal,
}: {
  childForms: ChildFormItem[];
  curVal: Partial<MerchantMaxSubsidyFormState>;
  formIndex: number;
  formId: string;
  validateMerchantRequestPrice: boolean;
  formUtils: Record<string, FormUtil<Record<string, any>>>;
}) => {
  
  if (validateMerchantRequestPrice) {
    const formUtil = formUtils[formId];
    formUtil?.validate(['merchantRequestPrice'])
  }
  return updateNextChildForm<MerchantMaxSubsidyFormState>({
    childForms,
    formIndex: formIndex,
    formUtils,
    curFieldKey: 'quanqianPrice',
    updateData({ nextChildFormUtil }) {
      const quanqianJia = nextChildFormUtil?.getFieldValue('quanqianPrice') || {};
      return {
        quanqianPrice: {
          ...quanqianJia,
          min: curVal?.quanqianPrice?.max
        }
      }
    },
    validateField: {
      quanqianPrice: true
    }
  })
};



