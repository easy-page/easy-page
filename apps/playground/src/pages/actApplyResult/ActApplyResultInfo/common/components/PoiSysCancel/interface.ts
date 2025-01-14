import { CheckAndReturnEnum } from './constant'
import { ToolbarProps } from './fields/toolbar'

export type PoiSysCancelFormState = {
  isAllSelect: CheckAndReturnEnum
  poiIds: string
  reason: string
}

export type PoiSysCancelFormProps = ToolbarProps & {}
