import { isEmptyStr } from '@/common'
import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const actDesc = () =>
  nodeUtil.createField(
    'brief',
    '活动简介',
    {
      required: true,
      preprocess({ defaultValues }) {
        return get(defaultValues, 'activity.brief')
      },
      postprocess: ({ value }) => {
        return {
          'activity.brief': value,
        }
      },
      validate: ({ value }) => {
        if (isEmptyStr(value)) {
          return { success: false, errorMsg: '请输入活动简介' }
        }
        if (value.length > 100) {
          return { success: false, errorMsg: '最多只能输入 100 个字符' }
        }
        return { success: true }
      },
    },
    {
      ui: UI_COMPONENTS.TEXTAREA,
      textArea: {
        placeholder: '最多 100 个字',
        maxLength: 100,
        showCount: true,
      },
    }
  )
