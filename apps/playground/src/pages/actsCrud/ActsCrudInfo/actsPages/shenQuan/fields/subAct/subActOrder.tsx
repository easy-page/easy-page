import { ISubActivity } from '@/common/apis/saveAct/interfaces/subAct';
import { nodeUtil } from '@easy-page/antd-ui';

export const subActOrder = nodeUtil.createCustomField<number>(
  'subActOrder',
  '',
  () => {
    return <></>;
  },
  {
    postprocess({ processedFormData }) {
      const subActs: Partial<ISubActivity>[] =
        processedFormData?.['subActivity'] || [];
      if (subActs.length === 0) {
        subActs.push({ order: 1 });
      } else {
        subActs[0].order = 1;
      }
      return {
        subActivity: subActs,
      };
    },
  },
  {
    formItem: {
      noStyle: true,
    },
  },
);
