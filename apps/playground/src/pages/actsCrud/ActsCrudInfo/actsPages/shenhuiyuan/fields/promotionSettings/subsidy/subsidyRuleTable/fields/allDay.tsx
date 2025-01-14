import { SubsidyConditionKeyEnum, SubsidyOptEnum } from '@/common';
import { nodeUtil } from '@easy-page/antd-ui';

export const allDay = nodeUtil.createCustomField(
  'allDay',
  '全天',
  () => <></>,
  {
    value: 'allDay',
    required: true,
    postprocess: () => {
      return {
        condition: {
          key: SubsidyConditionKeyEnum.ScAllDay,
          opt: SubsidyOptEnum.Eq,
          minValue: 'allDay',
          maxValue: '',
        },
      };
    },
  },
  {
    formItem: {
      className: 'col-span-3 mb-0',
    },
  },
);
