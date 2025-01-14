import { PageUtil } from '@easy-page/antd-ui'
import { actPeriodSelect, ActPeriodSelectOptions } from '../fields'

const pu = new PageUtil({ pageId: 'act-period-form' })

export const getActPeriodPageInfo = (
  formIndex: number,
  options?: ActPeriodSelectOptions
) => {
  pu.addFields([actPeriodSelect(formIndex, options)])
  return pu.getPageInfo()
}
