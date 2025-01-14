import {
  AuthTypeEnum,
  AuthTypeText,
  CategoryCode,
  CategoryCodeDesc,
} from '@/common'
import { SelectState, UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const categories = nodeUtil.createField<SelectState<CategoryCode[]>>(
  'categories',
  '因子分类',
  {
    mode: 'multiple',
    value: { choosed: [], keyword: '' },
    preprocess({ defaultValues }) {
      const choosed =
        get(defaultValues, 'config.actFactorInfo.categories') || []

      return choosed
    },
    postprocess: ({ value }) => {
      return {
        'config.actFactorInfo.categories': value || [],
      }
    },
    required: true,
  },
  {
    checkBoxGroup: {
      options: Object.keys(CategoryCodeDesc).map((e) => ({
        value: e,
        label: CategoryCodeDesc[e],
      })),
    },
    formItem: { extra: '活动创建时，所需因子包含的分类' },
  }
)
