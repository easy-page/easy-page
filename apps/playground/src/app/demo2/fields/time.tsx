import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';
import { DatePickerProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

export const time1 = nodeUtil.createField<DatePickerProps['value']>(
  'time1',
  '时间',
  {
    value: undefined,
    postprocess(context) {
      return {
        time1: context.value?.toString(),
      };
    },
  },
  { ui: UI_COMPONENTS.DATE_PICKER }
);

export const time2 = nodeUtil.createField<RangePickerProps['value'][]>(
  'time2',
  '时间范围',
  {
    postprocess(context) {
      return {
        time2: context.value?.map((e) => e?.toString()),
      };
    },
  },
  { ui: UI_COMPONENTS.DATE_PICKER_RANGE }
);
