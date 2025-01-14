import { CUSTOM_COMPONENTS_UI } from '@/common/components/easypage';
import { nodeUtil } from '@easy-page/antd-ui';
import { get } from 'lodash';

export const ruleDesc = nodeUtil.createField<string>(
  'ruleDesc',
  '活动规则',
  {
    value: '',
    required: true,
    preprocess({ defaultValues }) {
      return get(defaultValues, 'activity.ruleDesc') || '';
    },
    postprocess: ({ value }) => {
      return {
        'activity.ruleDesc': value,
      };
    },
    validate: ({ value }) => {
      if (
        !value ||
        value === '<p></p>' ||
        value === '<p><br></p>' ||
        value === '<p> </p>'
      ) {
        return { success: false, errorMsg: '请输入活动规则' };
      }
      if (value.includes('<p><img src="https://km')) {
        return {
          success: false,
          errorMsg: '内网文档图片不可直接复制，请先下载至本地后再手动上传',
        };
      }
      return { success: true };
    },
  },
  {
    ui: CUSTOM_COMPONENTS_UI.EDITOR,
    editor: {
      disableToolBar: false,
      disableDraggable: true,
      editorClassName: 'px-4',
      containerClassName: 'border border-[#D9D9D9] rounded-sm min-h-[200px]',
    },
    formItem: {
      validateTrigger: 'onBlur',
    },
  },
);
