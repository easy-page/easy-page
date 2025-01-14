import { baseInputIdsWayOfEdit } from './base'
import { inputId, uplaodId } from './fields'
import { filterRule } from './fields/filter'
import { byIdOption, byUpload, byFilterOptionOfEdit } from './options'

export const shyInputIdsWayOfEditWithFilter =
  baseInputIdsWayOfEdit().appendChildren([
    byIdOption().appendChildren([inputId()]),
    byUpload().appendChildren([uplaodId()]),
    byFilterOptionOfEdit().appendChildren([filterRule()]),
  ])
