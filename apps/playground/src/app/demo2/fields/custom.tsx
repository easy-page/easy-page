import { nodeUtil } from '@easy-page/antd-ui';
import { Input } from 'antd';

export const customField = nodeUtil.createCustomField<{
  min: string;
  max: string;
}>(
  'xxx',
  'xx',
  ({ disabled }) => {
    return <Input disabled={disabled} />;
  },
  {
    value: { min: '11', max: '22' },
    actions: [
      {
        effectedKeys: ['desc'],
        initRun: true,
        action: ({ value, effectedData }) => {
          console.log('adssadsadsasdsada');
          return {
            fieldValue: {
              min: '1',
              max: '2',
            },
            validate: false,
            // upt: new Date().getTime(),
          };
        },
      },
    ],
  },
  {
    formItem: {
      className: 'test',
    },
  }
);
