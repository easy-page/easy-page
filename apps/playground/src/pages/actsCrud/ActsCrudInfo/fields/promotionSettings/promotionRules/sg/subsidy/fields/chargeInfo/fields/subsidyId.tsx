import { isEdit } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { appendSubsidyIdVosToSubAct } from '../../../utils'

/** 用于编辑时提交 */
export const subsidyIdForEdit = nodeUtil.createCustomField(
  'subsidyId',
  '',
  () => {
    return <></>
  },
  {
    value: undefined,
    preprocess({ defaultValues }) {
      return get(defaultValues, 'contentList.0.subsidy.id') || undefined
    },
    postprocess({ value, processedFormData }) {
      if (!isEdit()) {
        return {}
      }
      // 这里的字段一般是：meituan.chargeAmt，agent.chargeAmt，merchant.chargeAmt
      // 我们需要第一个key 用于提交
      return appendSubsidyIdVosToSubAct(value, processedFormData)
    },
  },
  {
    formItem: {
      noStyle: true,
      className: 'mb-0',
    },
  }
)
