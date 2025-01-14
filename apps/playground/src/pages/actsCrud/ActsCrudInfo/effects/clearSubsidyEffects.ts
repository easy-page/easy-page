import { EasyPageOnChangeContext } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../fields'

export const clearSubsidyEffects = ({
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
        each.setField('meituan.chargeAmt', '', {
          validate: false,
        })
        each.setField('meituan.maxAmount', '', {
          validate: false,
        })
        each.setField('agent.chargeAmt', '', {
          validate: false,
        })
        each.setField('agent.maxAmount', '', {
          validate: false,
        })
        each.setField('merchant.chargeAmt', '100', {
          validate: false,
        })
        each.setField('merchant.maxAmount', '', {
          validate: false,
        })
      }, 0)
    })
    setTimeout(() => {
      formUtil.setField(
        'budgetControl',
        {
          choosedItemId: undefined,
          childForms: [],
          formUtils: {},
          childFormDefaultValues: {},
        },
        {
          validate: false,
        }
      )
    }, 0)
  }, 0)
}
