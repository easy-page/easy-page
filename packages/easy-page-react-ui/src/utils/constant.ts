export const CORE_COMPONENTS = {
  INPUT: 'input',
  TEXTAREA: 'textArea',
  SELECT: 'select',
  SELECTOPTION: 'selectOption',
  RADIO: 'radio',
  RADIOGROUP: 'radioGroup',
  CHECKBOX: 'checkBox',
  CHECKBOXGROUP: 'checkBoxGroup',
  // NUMBERINPUT: 'numberInput',
  FORM: 'form',
  FORMITEM: 'formItem',
  LAYOUT: 'layout',
  CUSTOM: 'custom',
  ROOTCONTAINER: 'rootContainer',
  // SWITCH: 'switch',
  // UPLOAD: 'upload',
};

/**
 * 映射默认组件的父节点和选项的关系
 */
export const UI_OPTION_MAP = {
  [CORE_COMPONENTS.SELECT]: CORE_COMPONENTS.SELECTOPTION,
  [CORE_COMPONENTS.CHECKBOXGROUP]: CORE_COMPONENTS.CHECKBOX,
  [CORE_COMPONENTS.RADIOGROUP]: CORE_COMPONENTS.RADIO,
};
