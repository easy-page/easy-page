import {
  ALL,
  FieldBelongFirstLevel,
  FieldBelongSecLevel,
  FieldBelongSecText,
  FieldBelongText,
} from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { TreeSelect } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

const commonOptions: DefaultOptionType[] = [
  {
    value: FieldBelongSecLevel.PromotionBaseInfo,
    title: FieldBelongSecText.promotionBaseInfo,
  },
  {
    value: FieldBelongSecLevel.PromotionQualify,
    title: FieldBelongSecText.promotionQualify,
  },
  {
    value: FieldBelongSecLevel.PromotionRule,
    title: FieldBelongSecText.promotionRule,
  },
  {
    value: FieldBelongSecLevel.SubsidySettings,
    title: FieldBelongSecText.subsidySettings,
  },
]

const TreeOptions: DefaultOptionType[] = [
  {
    value: FieldBelongFirstLevel.BaseInfo,
    title: FieldBelongText.baseInfo,
  },
  {
    value: FieldBelongFirstLevel.PromotionSettings,
    title: FieldBelongText.promotionSettings,
    children: [
      {
        value: FieldBelongSecLevel.SubAct,
        title: FieldBelongSecText.subAct,
        children: [...commonOptions],
      },
      ...commonOptions,
    ],
  },
]

export const belong = nodeUtil.createCustomField<string>(
  'belong',
  '所属模块',
  ({ value, onChange }) => {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        allowClear
        treeDefaultExpandAll
        onChange={(e) => {
          console.log('cccccasdas:', value)
          onChange(e)
        }}
        treeData={TreeOptions}
      />
    )
  },
  {
    validate: ({ value }) => {
      console.log('valuevalue:', value)
      if (!value) {
        return { success: false, errorMsg: '请选择' }
      }
      return { success: true }
    },
  }
)
