/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DEFAULT_COMPONENTS,
  EasyPage,
  EXTRA_COMPONENTS,
  nodeUtil,
  PageUtil,
} from '@easy-page/antd-ui';
import { PageState } from '../interface';

const pageUtil = new PageUtil({
  pageId: 'demo2221',
});

export const baseCheck = () =>
  nodeUtil.createField('base', 'aa', {
    value: '1',
    mode: 'single',
    required: true,
    // effectedKeys: ['editable'],
    postprocess: ({ value }) => {
      if (!value) {
        return {};
      }
      return {
        'invitation.actionType': value,
      };
    },
  });

export const commonCheck = baseCheck().appendChildren([
  nodeUtil.createNode('1', { name: 'aa' }),
  nodeUtil.createNode('2', { name: 'bb' }),
]);

export const check = nodeUtil.extends(commonCheck, {
  value: '2',
  actions(oldActions) {
    return [
      {
        effectedKeys: ['desc'],
        initRun: true,
        action: () => {
          console.log('1112321321: 执行 action');
          return {
            fieldValue: '1',
            validate: false,
          };
        },
      },
    ];
  },
  postprocess: () => {
    return ({ value }) => {
      return {
        // 神价默认写死为1
        'invitation.actionType': 1,
        'invitation.scene': 'xxx',
      };
    };
  },
});

pageUtil.addFields([check]);

export const pageInfo = pageUtil.getPageInfo();
console.log('pageInfo:', pageInfo);

export const check2 = nodeUtil.createChildForm('xxxx', {
  childFormContext: ['desc'],
  childFormContainer: ({
    childFormContextData,
    setChildFormRef,
    value,
    disabled,
    onChange,
  }) => {
    return (
      <EasyPage<PageState, any>
        components={{
          ...DEFAULT_COMPONENTS,
          ...EXTRA_COMPONENTS,
        }}
        key={'asda11'}
        pageId="css1111ss"
        defaultValues={{
          activities: [
            {
              test: 'xxx',
            },
            {
              test: 'xxx22',
            },
          ],
        }}
        context={{
          // t: userInfo,
          editable: disabled ? false : true,
        }}
        pageType="form"
        {...pageInfo}
      />
    );
  },
});
