import { UI_COMPONENTS } from '../common/constant';
import { CheckBox } from './Checkbox';
import { CheckBoxGroup } from './CheckboxGroup';
import { ChildForm } from './ChildForm';
import { Custom } from './Custom';
import { DatePicker } from './DatePicker';
import { DatePickerRange } from './DatePickerRange';
import { Form } from './Form';
import { FormItem } from './FormItem';
import { Input } from './Input';
import { Layout } from './Layout';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import { RootContainer } from './RootContainer';
import { Select } from './Select';
import { SelectOption } from './SelectOption';
import { Switch } from './Switch';
import { TextArea } from './TextArea';

export * from './Checkbox';
export * from './CheckboxGroup';
export * from './ChildForm';
export * from './Custom';
export * from './DatePicker';
export * from './DatePickerRange';
export * from './Form';
export * from './FormItem';
export * from './Input';
export * from './Layout';
export * from './Radio';
export * from './RadioGroup';
export * from './RootContainer';
export * from './Select';
export * from './SelectOption';
export * from './Switch';
export * from './TextArea';

export const DEFAULT_COMPONENTS = {
  [UI_COMPONENTS.CHECKBOX]: CheckBox,
  [UI_COMPONENTS.CHECKBOXGROUP]: CheckBoxGroup,
  [UI_COMPONENTS.CUSTOM]: Custom,
  [UI_COMPONENTS.FORM]: Form,
  [UI_COMPONENTS.FORMITEM]: FormItem,
  [UI_COMPONENTS.INPUT]: Input,
  [UI_COMPONENTS.LAYOUT]: Layout,
  [UI_COMPONENTS.RADIO]: Radio,
  [UI_COMPONENTS.RADIOGROUP]: RadioGroup,
  [UI_COMPONENTS.ROOTCONTAINER]: RootContainer,
  [UI_COMPONENTS.TEXTAREA]: TextArea,
  [UI_COMPONENTS.SELECT]: Select,
  [UI_COMPONENTS.SELECTOPTION]: SelectOption,
  [UI_COMPONENTS.TEXTAREA]: TextArea,
};

export const EXTRA_COMPONENTS = {
  [UI_COMPONENTS.CHILD_FORM]: ChildForm,
  [UI_COMPONENTS.SWITCH]: Switch,
  [UI_COMPONENTS.DATE_PICKER]: DatePicker,
  [UI_COMPONENTS.DATE_PICKER_RANGE]: DatePickerRange,
};


