/* eslint-disable @typescript-eslint/no-explicit-any */
import { Empty, InputEffectedType, nodeUtil } from '@easy-page/antd-ui';
import { PageState } from '../interface';

export const age = nodeUtil.createField<
  string,
  PageState,
  Empty,
  InputEffectedType
>(
  'age',
  '年龄',
  {
    value: '',
    postprocess(context) {
      return {
        age: Number(context.value),
      };
    },
    preprocess({ defaultValues }) {
      return defaultValues.age;
    },
    actions: [
      {
        effectedKeys: ['name'],
        action: ({ effectedData }) => {
          return {
            effectResult: {
              inputProps: {
                placeholder: `${effectedData.name} 的年龄`,
              },
            },
          };
        },
      },
    ],
    when: {
      effectedKeys: ['name'],
      show({ effectedData }) {
        return effectedData.name !== 'pk';
      },
    },
  },
  {
    formItem: {
      customExtra: ({ value }) => {
        return <div>{value === '10' ? '10' : 'a'}</div>;
      },
    },
  }
);
