import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui';
import { SearchRuleId } from '../../../constants';
import dayjs, { Dayjs } from 'dayjs';
import { FormatStyle } from '@/common';

export const applyTime = nodeUtil.createField<Dayjs | undefined>(
  SearchRuleId.ApplyTime,
  '报名时间',
  {
    value: undefined,
    postprocess: ({ value }) => {
      if (!value) {
        return {};
      }
      return {
        applyStartTime: dayjs(value[0]).format(FormatStyle.YYYYMMDDHHmmss),
        applyEndTime: dayjs(value[1]).set('hour', 23).set('minute', 59).set('second', 59).format(FormatStyle.YYYYMMDDHHmmss),
      };
    },
  },
  {
    ui: UI_COMPONENTS.DATE_PICKER_RANGE,
  },
);
