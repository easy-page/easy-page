import { ChildFormItem, FormUtil } from "@easy-page/antd-ui";

/** 当删除行时，触发 */
export const handleDeleteMerchantMaxSubsidyFormRow = async ({
  childForms,
  formIndex,
  formUtils,
}: {
  childForms: ChildFormItem[];
  formIndex: number;
  formUtils: Record<string, FormUtil<Record<string, any>>>;
}) => {
  const nextLineIsLast = formIndex + 1 === childForms.length - 1;
  const curLineIsLast = formIndex === childForms.length - 1;
  const isOnlyOneLine = childForms.length === 1;
  const curId = childForms[formIndex]?.id;
  const curFormUtil = formUtils[curId];

  if (curLineIsLast && curFormUtil) {
    const curVal = curFormUtil.getFieldValue('quanqianPrice') || {};
    curFormUtil.setField('quanqianPrice', {
      min: isOnlyOneLine ? '0' : curVal?.min,
      max: undefined,
    }, { validate: true });
    return;
  }

  const nextId = childForms[formIndex + 1]?.id;

  if (nextId) {
    const nextFormUtil = formUtils[nextId];

    const quanqianJia = nextFormUtil?.getFieldValue('quanqianPrice') || {};
    const curVal = curFormUtil.getFieldValue('quanqianPrice') || {};

    try {
      // console.log('nextLineIsFirst:', nextLineIsFirst, nextLineIsLast)
      nextFormUtil.setField('quanqianPrice', {
        min: curVal?.max,
        max: nextLineIsLast ? undefined : quanqianJia.max,
      }, { validate: true });

    } catch (error) {
      console.warn('验证券前价失败:', error?.message);
    }
  }
}