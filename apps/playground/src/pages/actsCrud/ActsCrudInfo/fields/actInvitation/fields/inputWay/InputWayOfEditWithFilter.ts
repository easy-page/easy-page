import { baseInputIdsWayOfEdit } from './base'
import { inputId, uplaodId } from './fields'
import { filterRule } from './fields/filter'
import { byFilter, byIdOption, byUpload } from './options'

export const commonInputIdsWayOfEditWithFilter =
  baseInputIdsWayOfEdit().appendChildren([
    byIdOption().appendChildren([inputId()]),
    byUpload().appendChildren([uplaodId()]),
    byFilter().appendChildren([filterRule()]),
  ])
