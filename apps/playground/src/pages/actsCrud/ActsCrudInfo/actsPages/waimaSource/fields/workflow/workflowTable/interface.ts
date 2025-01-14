import { FormUtil, SelectState } from '@easy-page/antd-ui'
import { RangePickerProps } from 'antd/es/date-picker'
import { RangeState } from '@/common/fields'
import { CommonActCrudFormState } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { WmsActFormState } from '../../../interface'

export type CommonDateRangeState = {
  startTime?: any
  endTime?: any
}

export type WorkFlowTableFormState = {
  purchaseManager?: CommonDateRangeState
  skuAdmin?: CommonDateRangeState
  supplier?: CommonDateRangeState
}
export type WorkFlowTableFormProps = Partial<WmsActFormState>
