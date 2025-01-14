import { RangeState } from '@/common/fields'
import { CommonActCrudFormState } from '../../interface'

export type StockReqFormState = {
  baseLevelStock: RangeState
  expandLevelStock: RangeState
}

export type StockReqFormProps = Partial<CommonActCrudFormState>
