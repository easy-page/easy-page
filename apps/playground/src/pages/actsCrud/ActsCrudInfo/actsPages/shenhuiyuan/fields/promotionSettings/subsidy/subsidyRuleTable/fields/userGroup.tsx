import { SubsidyConditionKeyEnum, SubsidyOptEnum } from '@/common';
import { SelectState, UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';

export const userGroup = nodeUtil.createField<SelectState<string>>(
  'userGroup',
  '人群',
  {
    value: {
      choosed: 'newGuest',
      options: [{ label: '门店新客', value: 'newGuest', disabled: true }],
    },
    required: true,
    mode: 'single',
    postprocess: () => {
      return {
        condition: {
          key: SubsidyConditionKeyEnum.ScTargetUserType,
          opt: SubsidyOptEnum.Eq,
          minValue: '1',
          maxValue: '',
        },
      };
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    formItem: {
      className: 'col-span-3  mb-0',
    },
    select: {
      disabled: true,
      placeholder: '请选择',
    },
  },
);
