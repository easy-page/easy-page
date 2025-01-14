import { nodeUtil } from '@easy-page/antd-ui';

export const meituanMinSubsidyFieldContainer = nodeUtil.createContainer(
  'meituan-minsubsidy-container',
  ({ children }) => {
    return <div className="flex flex-row">{children}</div>;
  },
  {},
);
