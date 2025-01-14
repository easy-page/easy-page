import { isEmptyStr } from '@/common';
import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';

export const planDesc = nodeUtil.createField('intro', '方案介绍', {
  value: '',
  required: true,
  validate: ({ value }) => {
    if (isEmptyStr(value)) {
      return { errorMsg: '必填，最多100个字', success: false }
    }
    return { success: true }
  }
}, {
  ui: UI_COMPONENTS.TEXTAREA,
  textArea: {
    placeholder: '必填，最多100个字',
    maxLength: 100,
    showCount: true
  }
})