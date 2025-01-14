import { inputIdsWay } from './base'
import { inputId, uplaodId } from './fields'
import { filterRule } from './fields/filter'
import { byIdOption, byUpload, byFilter } from './options'

export const inputWayOfCreateWithFilter = inputIdsWay().appendChildren([
  byIdOption().appendChildren([inputId()]),
  byUpload().appendChildren([uplaodId()]),
  byFilter().appendChildren([filterRule()]),
])
