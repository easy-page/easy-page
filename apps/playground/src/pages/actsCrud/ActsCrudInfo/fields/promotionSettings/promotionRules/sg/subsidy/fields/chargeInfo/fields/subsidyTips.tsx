import { nodeUtil } from '@easy-page/antd-ui';

export const maxCountTips = nodeUtil.createCustomField(
  'subsidy-tip-text',
  '',
  () => <div className="mx-2 w-max">最高不超过</div>,
  {},
);
