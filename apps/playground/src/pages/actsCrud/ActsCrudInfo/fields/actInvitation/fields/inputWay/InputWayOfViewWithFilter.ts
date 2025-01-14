import { inputIdsWay } from './base'
import { uplaodId } from './fields'
import { filterRule } from './fields/filter'
import { byIdOption, byUpload, byFilter } from './options'

export const inputWayOfViewWithFilter = inputIdsWay().appendChildren([
  byIdOption(),
  byUpload().appendChildren([uplaodId()]),
  byFilter().appendChildren([filterRule()]),
])
