import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export enum NeedSkuApplyEnum {
  Need = 1,
  NotNeed = 0,
}

export const NeedSkuApplyOptions = [
  {
    label: '是',
    value: NeedSkuApplyEnum.Need,
  },
  {
    label: '否',
    value: NeedSkuApplyEnum.NotNeed,
  },
]

export const needSkuApply = () =>
  nodeUtil.createField(
    'needSku',
    '是否需要商品填报',
    {
      mode: 'single',
      value: NeedSkuApplyEnum.Need,
      preprocess: ({ defaultValues }) => {
        return get(defaultValues || {}, 'needSku')
      },
      postprocess: ({ value }) => {
        return {
          needSku: value,
        }
      },
      required: true,
    },
    {
      radioGroup: {
        options: NeedSkuApplyOptions,
      },

      formItem: {
        tooltip: '选择“是”，将由品类运营进行填报',
      },
    }
  )
