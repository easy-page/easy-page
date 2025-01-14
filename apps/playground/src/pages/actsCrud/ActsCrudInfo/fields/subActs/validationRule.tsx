import { ISubActivity } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

/** 用于给后端传递暂时不需要用的数据，兼容历史的 hack */
export const validationRule = nodeUtil.createCustomField<number>(
  'validationRule',
  '',
  () => {
    return <></>
  },
  {
    postprocess({ processedFormData }) {
      const subActs: Partial<ISubActivity>[] =
        processedFormData?.['subActivity'] || []
      if (subActs.length === 0) {
        subActs.push({
          validationRule: {
            // 子活动报名规则
            enterMin: 1, // 最小档位数量
            enterMax: -1, // 最大档位数量, -1不限
          },
        })
      } else {
        subActs[0].validationRule = {
          // 子活动报名规则
          enterMin: 1, // 最小档位数量
          enterMax: -1, // 最大档位数量, -1不限
        }
      }
      return {
        subActivity: subActs,
      }
    },
  },
  {
    formItem: {
      noStyle: true,
    },
  }
)
