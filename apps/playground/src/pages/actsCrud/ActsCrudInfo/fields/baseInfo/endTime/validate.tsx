import { Empty, Validate } from '@easy-page/antd-ui'
import dayjs from 'dayjs'
import { ActTimeLimit } from '../actTime'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'
import { getDisabledState } from '@/common'

export const endTimeValidate: Validate<
  dayjs.Dayjs,
  CommonActCrudFormState,
  CommonActCrudFormProps
> = ({ value, pageState, pageProps }) => {
  const disabled = getDisabledState('endTime', pageProps.editable)

  if (disabled) {
    return { success: true }
  }
  if (!value) {
    return { success: false, errorMsg: '请选择商家报名截止时间' }
  }

  if (value.isBefore(dayjs())) {
    return { success: false, errorMsg: '商家报名截止时间需要是未来的时间' }
  }

  const endTime = pageState['promotionTime.timeRange']?.[1]

  if (endTime && value.isAfter(endTime.endOf('day'))) {
    return {
      success: false,
      errorMsg: '商家报名截止时间不可晚于活动结束时间',
    }
  }
  return {
    success: true,
  }
}
