import { EasyPageOnChangeContext } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../fields'

export const clearWmDiscountSubsidyEffects = ({
  formUtil,
}: EasyPageOnChangeContext<CommonActCrudFormState>) => {
  const { subActivity } = formUtil.getOriginFormData() || {}
  console.log('clearSubsidyEffects:', subActivity)
  /**
   * - 这里的 setTimeout 将任务拆分成多个宏队列任务，就不会导致卡顿
   */
  setTimeout(() => {
    Object.values(subActivity?.formUtils || {}).forEach((each) => {
      setTimeout(() => {
        console.log('clearSubsidyEffects:', each)
        each.setField(
          'shopPercent',
          {
            minValue: '',
            maxValue: '',
          },
          {
            validate: false,
          }
        )
        each.setField('mtPercent', '', {
          validate: false,
        })
        each.setField('mtMaxMoney', '', {
          validate: false,
        })
        each.setField(
          'atPercent',
          {
            minValue: '0',
            maxValue: '0',
          },
          {
            validate: false,
          }
        )
        each.setField('atMaxMoney', '0', {
          validate: false,
        })
      }, 0)
    })
  }, 0)
}
