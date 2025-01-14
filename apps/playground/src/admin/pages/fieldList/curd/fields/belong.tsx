import {
  FieldBelongFirstLevel,
  FieldBelongSecLevel,
  FieldBelongSecText,
  FieldBelongText,
} from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { Cascader, TreeSelect } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import { cloneDeep } from 'lodash'

interface Option {
  value: string
  label: string
  children?: Option[]
}

const commonOptions: Option[] = [
  {
    value: FieldBelongSecLevel.PromotionBaseInfo,
    label: FieldBelongSecText.promotionBaseInfo,
  },
  {
    value: FieldBelongSecLevel.PromotionQualify,
    label: FieldBelongSecText.promotionQualify,
  },
  {
    value: FieldBelongSecLevel.PromotionRule,
    label: FieldBelongSecText.promotionRule,
  },
  {
    value: FieldBelongSecLevel.SubsidySettings,
    label: FieldBelongSecText.subsidySettings,
  },
]

const getTreeOptions = (options: Option[]): Option[] => {
  const handleKey = (
    curOptions: DefaultOptionType[],
    parentKey: string = ''
  ) => {
    curOptions.forEach((each) => {
      // 构造当前节点的完整key
      const curParentKey = (
        parentKey ? `${parentKey}.${each.value}` : each.value || ''
      ) as string
      each.value = curParentKey // 更新节点的value为新的key

      // 如果当前节点有子节点，则递归处理
      if (each.children) {
        handleKey(each.children, curParentKey)
      }
    })
    // 注意：这里不需要返回curOptions，因为我们在原地修改了数组
  }

  handleKey(options) // 调用handleKey处理原始options
  console.log('optionsoptions:', options)
  return options // 返回修改后的options
}

const TreeOptions: Option[] = [
  {
    value: FieldBelongFirstLevel.BaseInfo,
    label: FieldBelongText.baseInfo,
  },
  {
    value: FieldBelongFirstLevel.PromotionSettings,
    label: FieldBelongText.promotionSettings,
    children: [
      {
        value: FieldBelongSecLevel.SubAct,
        label: FieldBelongSecText.subAct,
        children: [...cloneDeep(commonOptions)],
      },
      ...cloneDeep(commonOptions),
    ],
  },
]

export const belong = nodeUtil.createCustomField<string[]>(
  'belong',
  '所属模块',
  ({ value, onChange }) => {
    return (
      <Cascader
        showSearch={false}
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        allowClear
        onChange={(e) => {
          console.log('eeeeeeeee:', e)
          onChange(e)
        }}
        options={TreeOptions}
      />
    )
  },

  {
    required: true,
    postprocess({ value }) {
      return {
        belong: value.join('.'),
      }
    },
    preprocess({ defaultValues }) {
      if (!defaultValues.belong) {
        return []
      }
      return (defaultValues?.belong || '').split('.')
    },
    validate: ({ value }) => {
      if (!value || value.length === 0) {
        return { success: false, errorMsg: '请选择' }
      }
      return { success: true }
    },
  }
)
