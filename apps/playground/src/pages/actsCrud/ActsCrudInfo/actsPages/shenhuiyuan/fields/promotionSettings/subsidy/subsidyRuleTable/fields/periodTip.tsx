import { nodeUtil } from '@easy-page/antd-ui';
import { RuleTableFormState, RuleTableFormProps } from '../interface';

export const periodTip = nodeUtil.createCustomField<
  any,
  RuleTableFormState,
  RuleTableFormProps
>(
  'periodTip',
  '',
  () => {
    return (
      <div className="border-t border-[#DDDDDD]  pt-2 text-sec">
        对已添加的所有时段生效
      </div>
    );
  },
  {
    when: {
      effectedKeys: ['formIdx'],
      show({ effectedData }) {
        const formIdx = effectedData?.['formIdx'];
        return formIdx === 3;
      },
    },
    postprocess: () => {
      return {};
    },
  },
  {
    formItem: {
      className: 'col-span-9 mb-0',
    },
  },
);
