import { applyReasonField } from './applyReason'
import { applyReasonContainer } from './applyReasonContainer'

export const commonApplyReason = applyReasonContainer().appendChildren([
  applyReasonField,
])
