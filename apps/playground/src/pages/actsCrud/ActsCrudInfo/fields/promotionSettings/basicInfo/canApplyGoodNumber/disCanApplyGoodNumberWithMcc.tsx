import { nodeUtil } from '@easy-page/antd-ui'
import { canApplyGoodCount } from './common'
import { mccModel, checkNumberInvalid } from '@/common'

export const disCanApplyGoodNumberWithMcc = nodeUtil.extends(
  canApplyGoodCount(),
  {
    actions() {
      return [
        {
          initRun: true,
          action: () => {
            const { data } = mccModel.getData()
            return {
              effectResult: {
                inputProps: { placeholder: 'uuuuu' },
              },
            }
          },
        },
      ]
    },
    validate(oldValidate) {
      return ({ value }) => {
        return { success: false, errorMsg: '请修改为 MCC 配置' }
        // const { data } = mccModel.getData()
        // if (!value) {
        //   return {
        //     success: false,
        //     errorMsg: '请输入可报名商品数',
        //   }
        // }
        // const res = checkNumberInvalid(value, {
        //   checkInRange: { min: 1, max: 100 },
        //   checkInteger: true,
        // })
        // if (
        //   // TODO: pikun 替换成 mcc 里的key
        //   !res.success
        // ) {
        //   return {
        //     success: false,
        //     errorMsg: `请输入1-之间的整数`,
        //   }
        // }
        // return { success: true }
      }
    },
  }
)
