import { inputIdsWay } from '../base'
import { inputId, uplaodId } from '../fields'
import { byIdOption, byUpload } from '../options'

export const commonInputWayOfCreate = inputIdsWay().appendChildren([
  byIdOption().appendChildren([inputId()]),
  byUpload().appendChildren([uplaodId()]),
])
