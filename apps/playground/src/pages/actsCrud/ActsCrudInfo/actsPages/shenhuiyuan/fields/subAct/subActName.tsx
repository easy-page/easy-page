import { ISubActivity } from '@/common/apis/saveAct/interfaces/subAct';
import { generateId, nodeUtil } from '@easy-page/antd-ui';

export const subActName = nodeUtil.createCustomField<number>(
  'subActName',
  '',
  () => {
    return <></>;
  },
  {
    postprocess({ processedFormData }) {
      const subActs: Partial<ISubActivity>[] =
        processedFormData?.['subActivity'] || [];
      if (subActs.length === 0) {
        subActs.push({ name: generateId('subactname') });
      } else {
        subActs[0].name = generateId('subactname');
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
