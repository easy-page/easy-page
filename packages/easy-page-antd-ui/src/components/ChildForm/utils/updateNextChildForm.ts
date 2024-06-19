import { UpdateOtherChildFormOptions, updateOtherChildForm } from "./updateOtherChildForm";

/** 验证上一个子表单 */
export function updateNextChildForm<FormData>(options: Omit<UpdateOtherChildFormOptions<FormData>, 'otherLine'>) {
  return updateOtherChildForm({
    ...options,
    otherLine: 1
  })
}