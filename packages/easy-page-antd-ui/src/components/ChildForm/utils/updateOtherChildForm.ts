import { FormUtil } from "@easy-page/react-ui";
import { ChildFormItem } from "../interface";

export type UpdateDataContext<FormData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  curFieldVal: any;
  nextChildFormUtil: FormUtil<FormData>
  curChildFormUtil: FormUtil<FormData>
}

export type UpdateOtherChildFormOptions<FormData> = {

  /** 当前子表单的基本信息 */
  childForms: ChildFormItem[];
  /** 当前表单 idx */
  formIndex: number;
  /** 当前子表单的所有 formUtil */
  formUtils: Record<string, FormUtil<FormData>>;
  /** 期望校验下一行的字段 ID 数组 */
  updateData: (context: UpdateDataContext<FormData>) => Partial<FormData>;
  /** 更新字段的时候是否做校验 */
  validateField: Partial<Record<keyof FormData, boolean>>;
  /** 当前行，变化的字段 ID */
  curFieldKey: keyof FormData;
  /** +1 表示上一行 ，-1 表示下一行，-3 表示下面第 3 行。 */
  otherLine: number;
}

/** 基于当前字段的变化，当前行变化合法的情况下，去改下一行相关内容 */
export async function updateOtherChildForm<FormData>({ childForms, otherLine, validateField, updateData, curFieldKey, formIndex, formUtils }: UpdateOtherChildFormOptions<FormData>) {
  const nextId = childForms[formIndex + otherLine]?.id;
  const curId = childForms[formIndex]?.id;
  if (nextId) {
    const nextFormUtil = formUtils[nextId];
    const curFormUtil = formUtils[curId];
    const curFieldVal = nextFormUtil?.getFieldValue(curFieldKey);
    try {
      const res = await curFormUtil?.validate([curFieldKey as string]);
      /** 合法的数才更新下一个字段 */
      if ((res.err || []).length === 0) {

        const datas = updateData({ curFieldVal: curFieldVal, nextChildFormUtil: nextFormUtil, curChildFormUtil: curFormUtil })
        const keysToUpdate = Object.keys(datas);
        keysToUpdate.forEach(each => {
          nextFormUtil.setField(each, datas[each as keyof FormData], { validate: validateField[each as keyof FormData] });
        })

      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.warn('验证失败:', error?.message);
    }
  }
}