import { nodeUtil } from '@easy-page/antd-ui'
import { ActTypeEnum } from '@/common'
import { getQualify } from './qualify'

export const shenquanQualify = nodeUtil.extends(
  getQualify({
    actType: ActTypeEnum.SG_SHEN_QUAN,
    label: '筛选商家',
  }),
  {
    preprocess() {
      return ({ defaultValues }) => {
        const subActs = defaultValues?.['subActivity'] || []
        return subActs?.[0]?.qualify
      }
    },
    postprocess: () => {
      return ({ value, processedFormData }) => {
        const subActs = processedFormData?.['subActivity'] || []
        if (subActs.length === 0) {
          subActs.push({
            qualify: value,
          })
        } else {
          subActs[0].qualify = value
        }

        return {
          subActivity: subActs,
        }
      }
    },
  }
)
