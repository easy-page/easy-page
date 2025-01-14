import { EmploySearch, SubMarketingPlanStatus, isEdit } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { Tooltip, message } from 'antd'
import { areAllElementsInArray } from '@/common'
import { CommonActCrudFormState } from '@/pages/actsCrud/ActsCrudInfo'

const MAX_COUNT = 100

export const userGroup = nodeUtil.createCustomField<string[]>(
  'baseInfo.userGroup',
  '可用人群',
  ({ value, onChange, disabled, frameworkProps: { store } }) => {
    const defaultData = store.getDefaultValues() as CommonActCrudFormState
    const defaultUserGroup = defaultData['baseInfo.userGroup'] || []
    const groupStatus = defaultData['groupStatus']
    return (
      <Tooltip title={value.join('、')}>
        <EmploySearch
          allowClear={false}
          className="w-full"
          disabled={disabled}
          value={value}
          maxTagCount={5}
          mode="tags"
          placeholder={`请填写，最多${MAX_COUNT}个mis号`}
          onChange={(val) => {
            // 如果已经发布，则只能增加不能删除
            if (
              isEdit() &&
              groupStatus === SubMarketingPlanStatus.Started &&
              !areAllElementsInArray(defaultUserGroup, val)
            ) {
              message.error('不可删除')
              return
            }
            onChange(val)
          }}
        />
      </Tooltip>
    )
  },
  {
    postprocess({ value }) {
      return {
        businessPartition: [
          {
            oriMisId: value,
          },
        ],
      }
    },
    preprocess({ defaultValues }) {
      return defaultValues?.businessPartition?.[0]?.oriMisId || []
    },
    required: true,
    validate: ({ value }) => {
      if (!value || value.length === 0 || value.length > MAX_COUNT) {
        return { success: false, errorMsg: `必填，最多${MAX_COUNT}个mis号` }
      }

      return { success: true }
    },
  },
  {}
)
