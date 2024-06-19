/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormUtil } from "@easy-page/react-ui";
import { ChildFormItem } from "../interface";

export type ValidateOtherChildFormOptions<FormData> = {

  /** 当前子表单的基本信息 */
  childForms: ChildFormItem[];
  /** 当前表单 idx */
  formIndex: number;
  /** 当前子表单的所有 formUtil */
  formUtils: Record<string, FormUtil<FormData>>;
  /** 期望校验下一行的字段 ID 数组 */
  keysToValidate: Array<keyof FormData>;
  /** 当前行，变化的字段 ID */
  curFieldKey: keyof FormData;
  /** +1 表示上一行 ，-1 表示下一行，-3 表示下面第 3 行。 */
  otherLine: number;
  /** 需要验证的下一个表单，当前表单内容 */
  checkNextChildForm?: (nextChildFormData: Partial<FormData>) => boolean;
}

export async function validateOtherChildForm<FormData>({ childForms, checkNextChildForm, otherLine, keysToValidate, curFieldKey, formIndex, formUtils }: ValidateOtherChildFormOptions<FormData>) {
  const nextId = childForms[formIndex + otherLine]?.id;
  const curId = childForms[formIndex]?.id;
  if (nextId) {
    const nextFormUtil = formUtils[nextId];
    const curFormUtil = formUtils[curId];
    const nextChildFormData = nextFormUtil?.getOriginFormData() as Partial<FormData>;
    const needToValidate = checkNextChildForm ? checkNextChildForm(nextChildFormData) : true;
    if (!needToValidate) {
      return
    }
    try {
      const res = await curFormUtil?.validate([curFieldKey as string]);
      /** 合法的数值才校验下一行 */
      if ((res.err || []).length === 0) {
        nextFormUtil?.validate(keysToValidate as string[]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.warn('验证失败:', error?.message);
    }
  }
}