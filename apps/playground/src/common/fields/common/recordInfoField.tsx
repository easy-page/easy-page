/**
 * - 用于编辑时，提交带上记录 ID
 */

import { isCopy } from '@/common/routes'
import { nodeUtil } from '@easy-page/antd-ui'

export const recordInfoField = (
  id: string,
  options?: {
    submitFieldId?: string
    value?: any
  }
) =>
  nodeUtil.createCustomField(
    id,
    '',
    () => {
      return <></>
    },
    {
      value: options?.value,
      postprocess({ value }) {
        if (!value || isCopy()) {
          return {}
        }
        return {
          [options?.submitFieldId || id]: value,
        }
      },
    },
    {
      formItem: {
        noStyle: true,
        className: 'mb-0',
      },
    }
  )
