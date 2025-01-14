/**
 * - 用于编辑时，提交带上记录 ID
 */

import { isCopy } from '@/common/routes'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const recordStatus = () =>
  nodeUtil.createCustomField(
    'actStatus',
    '',
    () => {
      return <></>
    },
    {
      preprocess({ defaultValues }) {
        return get(defaultValues, 'activity.status') || -1
      },
    },
    {
      formItem: {
        noStyle: true,
        className: 'mb-0',
      },
    }
  )
