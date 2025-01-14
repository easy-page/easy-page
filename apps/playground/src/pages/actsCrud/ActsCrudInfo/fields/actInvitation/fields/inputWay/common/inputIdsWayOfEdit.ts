import { baseInputIdsWayOfEdit } from '../base'
import { inputId, uplaodId } from '../fields'
import { byIdOption, byUpload } from '../options'

export const commonInputIdsWayOfEdit = baseInputIdsWayOfEdit().appendChildren([
  byIdOption().appendChildren([inputId()]),
  byUpload().appendChildren([uplaodId()]),
])
