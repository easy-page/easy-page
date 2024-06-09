import { nodeUtil } from '@easy-page/antd-ui';

export const testC = nodeUtil.createCustomField(
  'testc',
  '11',
  ({ frameworkProps: { store } }) => {
    const data = store.getPageProps();
    return <div>{(data?.t || []).join(',')}</div>;
  },
  {
    effectedKeys: ['t'],
  }
);
