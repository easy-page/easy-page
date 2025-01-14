import { nodeUtil } from '@easy-page/antd-ui'
import { set } from 'lodash'
import { compareNumber, NumberOperator } from '@/common'
import { MeituanLowestSubsidyFormProps } from '../interface'
import { validateExpandLevelPrice } from '../../validates'
import { merchantRequestPrice } from '../../merchantMaxSubsidyForm/fields'
import { MeituanLowestSubsidyFormState } from '../../../subPlan'

// 复用一下 merchantRequestPrice 相关配置
export const meituanSubsidyPrice = nodeUtil.extends<
  string,
  MeituanLowestSubsidyFormState,
  MeituanLowestSubsidyFormProps
>(merchantRequestPrice(), {
  id: 'meituanSubsidyPrice',
  value: '',
  fieldUIConfig(oldFieldUIConfig) {
    const newConfig = oldFieldUIConfig || {}
    set(newConfig, 'formItem.className', 'col-span-1 mb-0')
    return newConfig
  },
  validate() {
    return async (context) => {
      const { value, pageProps } = context
      const { lastFormUtil } = pageProps
      const res = await validateExpandLevelPrice(context as any)
      if (!res.success) {
        return res
      }

      // if (value && Number(value) === 0) {
      //   return {
      //     success: false,
      //     errorMsg: '必填，小数需以0.5结束。（不可为0）',
      //   };
      // }

      // 验证比上一个阶梯的值大
      const lastVal = lastFormUtil?.getFieldValue?.('meituanSubsidyPrice')
      if (lastVal && !compareNumber(value, lastVal, NumberOperator.Gte)) {
        return {
          success: false,
          errorMsg: '高阶梯补贴金额需大于等于低阶梯补贴金额 ',
        }
      }
      return { success: true }
    }
  },
})
