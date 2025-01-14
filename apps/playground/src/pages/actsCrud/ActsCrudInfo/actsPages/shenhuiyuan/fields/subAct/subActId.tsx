import { isCopy } from '@/common';
import { ISubActivity } from '@/common/apis/saveAct/interfaces/subAct';
import { nodeUtil } from '@easy-page/antd-ui';

export const subActId = nodeUtil.createCustomField<number>(
  'subActId',
  '',
  () => {
    return <></>;
  },
  {
    preprocess({ defaultValues }) {
      const subActs = defaultValues?.['subActivity'] || [];
      if (isCopy()) {
        return '';
      }
      return subActs?.[0]?.id;
    },
    postprocess({ value, processedFormData }) {
      if (isCopy()) {
        return {};
      }
      const subActs: Partial<ISubActivity>[] =
        processedFormData?.['subActivity'] || [];
      if (subActs.length === 0) {
        subActs.push({ id: value });
      } else {
        subActs[0].id = value;
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
