import { ActFullInfo, ISubActivity } from '@/common'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { CommonSubActPageState } from '../../../../interface'

export const guideInput = nodeUtil.createField<string, CommonSubActPageState>(
  'guideInput',
  ' ',
  {
    postprocess({ value, pageState }) {
      if (!pageState.openGuide) {
        return {}
      }
      return {
        'poiBuildProduct.value': value,
      }
    },
    when: {
      effectedKeys: ['openGuide'],
      show({ effectedData }) {
        return effectedData['openGuide']
      },
    },
    preprocess({ defaultValues }) {
      const remotePoiBuildProduct = (defaultValues as ISubActivity)
        ?.poiBuildProduct
      return remotePoiBuildProduct?.value || ''
    },
    validate: ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '请输入商品规则，上限20个，使用英文逗号隔开',
        }
      }
      if (value && !/^(?!,)[a-zA-Z0-9,]+(?<!,)$/.test(value)) {
        return {
          success: false,
          errorMsg:
            '仅支持录入数字、英文字符和英文逗号，英文逗号不能在开始和结尾，请检查后修改。',
        }
      }
      const ids = value.split(',')
      if (value && ids.length > 20) {
        return {
          success: false,
          errorMsg: '请输入商品规则，上限20个，使用英文逗号隔开',
        }
      }

      return { success: true }
    },
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
    textArea: {
      handleChange({ value, onChange }) {
        // 增加自动去除空格逻辑
        const curVal: string = value || ''
        onChange({ target: { value: curVal.replace(/\s/g, '') } } as any)
      },
      placeholder:
        '引导商家创建的标品需符合报名资质中设置的商品规则。最多输入20个，使用英文逗号隔开。',
    },
  }
)
