import { nodeUtil } from '@easy-page/antd-ui';

export const expandLevelFieldContainer = nodeUtil.createContainer(
  'expand-level-container',
  ({ children }) => {
    return <div className="flex flex-row">{children}</div>;
  },
  {},
);
