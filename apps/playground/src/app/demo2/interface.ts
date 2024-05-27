import { SelectState } from '@easy-page/antd-ui';
import { DatePickerProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

export type PageState = {
  name: string;
  age: string;
  hobby: string[];
  friend: SelectState<string>;
  swtccc: boolean;
  time1: DatePickerProps['value'];
  time2: RangePickerProps['value'];
  sex: string;
  desc: string;
};
