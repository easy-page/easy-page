import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';
import { Input } from 'antd';

export const desc = nodeUtil.createField(
  'desc',
  '介绍',
  {
    value: '',
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
  }
);

export const desc1 = nodeUtil.createCustomField(
  'desc',
  '介绍',
  ({ value, onChange }) => {
    /** 自定义输入框组件 */
    return <Input value={value} onChange={onChange} />;
  },
  {
    value: '',
  }
);
