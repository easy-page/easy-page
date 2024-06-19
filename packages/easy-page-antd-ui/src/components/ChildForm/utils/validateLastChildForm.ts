import { ValidateOtherChildFormOptions, validateOtherChildForm } from "./validateOtherChildForm";

/** 验证上一个子表单 */
export function validateLastChildForm<FormData>(options: Omit<ValidateOtherChildFormOptions<FormData>, 'otherLine'>) {
  return validateOtherChildForm({
    ...options,
    otherLine: -1
  })
}