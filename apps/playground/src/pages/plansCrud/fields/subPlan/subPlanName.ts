import { isEmptyStr } from '@/common';
import { nodeUtil } from '@easy-page/antd-ui';

const MAX_LENGTH = 25;
export const subPlanName = nodeUtil.createField('baseInfo.subPlanName', '子方案名称', {
  value: '',
  required: true,
  postprocess({ value }) {
    return {
      name: value
    }
  },
  preprocess({ defaultValues }) {
    console.log('defaultValues:', defaultValues)
    return defaultValues.name;
  },
  validate: ({ value }) => {
    if (isEmptyStr(value)) {
      return { errorMsg: '请输入子方案名称', success: false }
    }
    if (value.length > MAX_LENGTH) {
      return { errorMsg: `必填，最多${MAX_LENGTH}个字`, success: false }
    }
    return { success: true }
  }
}, {
  input: {
    placeholder: '请输入子方案名称',
    maxLength: MAX_LENGTH,
    trigger: 'onBlur'
  }
})