import { nodeUtil } from '@easy-page/antd-ui';

export const testC = nodeUtil.createCustomField(
  'testc',
  '11',
  ({ frameworkProps: { store, upt } }) => {
    const data = store.getPageProps();
    console.log('testttccccc:', upt, JSON.stringify(data.t || {}));
    return <div>{JSON.stringify(data.t || {})}</div>;
  },
  {
    effectedKeys: ['t'],
  },
  {
    layout: { disableLayout: true },
  }
);
