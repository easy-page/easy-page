import {
  EffectActionHandlerType,
  FormUtil,
  generateId,
} from '@easy-page/antd-ui'
import { SubMarketingPlan, preprocessMeituanSubsidy } from '@/common'
import { MeituanLowestSubsidyContainerState } from '../merchantMaxSubsidyForm/interface'
import { CommonSubPlanFormProps, CommonSubPlanFormState } from '../../subPlan'

export const MeituanLowestPrefix = 'meituanLowestSubsidy'

// // 以商家实际补贴价格为 key，value 为对应的 formUtil
// const convertFormUtilsMap = (formUtils: Record<string, FormUtil<MeituanLowestSubsidyFormState>>): Record<string, {
//   id: string;
//   formUtil: FormUtil<MeituanLowestSubsidyFormState>
// }> => {
//   const newFormUtils: Record<string, {
//     id: string;
//     formUtil: FormUtil<MeituanLowestSubsidyFormState>
//   }> = {};
//   Object.keys(formUtils || {}).forEach(each => {
//     const data = formUtils?.[each]?.getFieldValue('merchantRequestPrice');
//     if (data !== undefined) {
//       newFormUtils[data] = {
//         id: each,
//         formUtil: formUtils?.[each]
//       };
//     }
//   })
//   return newFormUtils;
// }

/**
 * 当商家最高补贴变化的时候，更新美团最低补贴表格
 */
export const handleMerchantMaxSubsidyChange: EffectActionHandlerType<
  MeituanLowestSubsidyContainerState,
  CommonSubPlanFormState,
  CommonSubPlanFormProps,
  any,
  Record<string, any>
> = ({ effectedData, value, defaultValues }) => {
  const meituanSubsidyDefaultVals =
    preprocessMeituanSubsidy(
      (defaultValues as SubMarketingPlan).subsidyRule || []
    ) || []
  const {
    childForms,
    formUtils = {},
    childFormDefaultValues = {},
    ...rest
  } = value
  const merchantMaxSubsidy = effectedData['merchantMaxSubsidy']
  if (!merchantMaxSubsidy) {
    return {}
  }
  let newChildForms = [...childForms]

  // 商家实际补贴价格-被删除的
  let needToRemoveIds = Object.keys(formUtils)

  ;(merchantMaxSubsidy.childForms || []).forEach((each, idx) => {
    const merchantMaxSubsidyFormUtil = merchantMaxSubsidy.formUtils?.[each.id]

    // 商家最高补贴
    const merchantMaxSubsidyVal = merchantMaxSubsidyFormUtil?.getFieldValue(
      'merchantRequestPrice'
    )

    // 如果还存在，则无需删除
    needToRemoveIds = needToRemoveIds.filter((e) => e !== each.id)

    const curMtUtil = formUtils[each.id]
    if (curMtUtil) {
      // 修改表单
      curMtUtil.setField('merchantRequestPrice', merchantMaxSubsidyVal)
    } else {
      // 新增表单，并设置默认值
      newChildForms.push({ label: '', id: each.id })

      const meituanSubsidyPrice = meituanSubsidyDefaultVals.find(
        (e) => e.merchantRequestPrice === merchantMaxSubsidyVal
      )?.meituanSubsidyPrice

      childFormDefaultValues[each.id] = {
        merchantRequestPrice: merchantMaxSubsidyVal,
        meituanSubsidyPrice,
      }
    }
  })

  // 处理需要删除的行
  newChildForms = newChildForms.filter((e) => !needToRemoveIds.includes(e.id))
  /** 删除表单引用 */
  needToRemoveIds.forEach((each) => {
    delete formUtils[each]
  })

  return {
    fieldValue: {
      childForms: newChildForms,
      childFormDefaultValues,
      formUtils,
      ...rest,
    },
    /**
     * - 如果不设置这个会存在问题
     * - 因为 action 会增加子表单，onChange 时，子表单 ref 还未挂载
     * - 此时触发 validate，其 value 中还没有 ref
     * - validate 未验证完时，ref 挂载完毕，更新到 value 中
     * - validateAllChildForm 校验完成，又更新了 value，但此时自己还没有 ref
     * - 就把 ref 清空了。
     *  */
    validate: false,
  }
}
