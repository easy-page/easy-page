import { CORE_COMPONENTS } from '@easy-page/react-ui';

export const UI_COMPONENTS = {
  ...CORE_COMPONENTS,
  CHILD_FORM: 'childForm',
  SWITCH: 'switch',
  DATE_PICKER: 'datePicker',
  DATE_PICKER_RANGE: 'datePickerRange',
};

export enum TriggerChangeSence {
  /** 来源于验证 */
  FromValidate = 'FromValidate',

  /** 来源于子表单内部变化 */
  FromChildFormChange = 'FromChildFormChange',

  /** 来源于子表单 ref 挂载 */
  FromChildFormRefChange = 'FromChildFormRefChange',
  /** 来源于子表单删除 */
  FromChildFormRemove = 'FromChildFormRemove',
  /** 来源于子表单添加 */
  FromChildFormAdd = 'FromChildFormAdd',
}
