import { ValidateOtherChildFormOptions, validateOtherChildForm } from "./validateOtherChildForm";

export function validateNextChildForm<FormData>(options: Omit<ValidateOtherChildFormOptions<FormData>, 'otherLine'>) {
  return validateOtherChildForm({
    ...options,
    otherLine: 1
  })
}