import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const canAudit = nodeUtil.createField<boolean>(
  'canAudit',
  '审核报名结果',
  {
    value: false,
    preprocess: ({ defaultValues }) => {
      return get(defaultValues || {}, 'applyControl.audit.isNeedAudit')
    },
    postprocess: ({ value }) => {
      return {
        'applyControl.audit': {
          isNeedAudit: value,
        },
      }
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      tooltip: '打开开关，代表需要运营审核；关闭开关，代表不需要运营审核',
    },
  }
)
