import { Empty, RadioEffectedType, nodeUtil } from '@easy-page/antd-ui';

export const sex = nodeUtil
  .createField<string, { name: string }, Empty, RadioEffectedType>(
    'sex',
    '性别',
    {
      value: '',
      mode: 'single',
    },
    {
      radioGroup: {
        className: 'flex flex-row items-center',
      },
      layout: {
        disableLayout: true,
        indentation: false,
        childrenContainerClassName: '',
      },
    }
  )
  .appendChildren([
    nodeUtil
      .createNode(
        'man',
        {
          name: '男12321321213',
        },
        {
          radio: {
            tips: '123213123',
          },
          // layout: {
          //   disableLayout: true,
          // },
        }
      )
      .appendChildren([
        nodeUtil.createField(
          'like',
          '看书',
          { value: '' },
          {
            formItem: {
              noStyle: true,
            },
          }
        ),
      ]),
    nodeUtil.createNode(
      'female',
      { name: '女' },
      {
        radio: {
          className: 'ml-2',
        },
      }
    ),
  ]);
