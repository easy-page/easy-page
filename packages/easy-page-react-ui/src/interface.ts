/**
 * key: 为组件注册的属性 key
 * value: 为组件注册的属性类型
 * 如：fieldUIConfig = { input: {...}}
 */
export interface FieldUIConfig {
  ui?: string;
  formItemUI?: string;
  layoutUI?: string;
}

/** 页面编辑模式 */
export type EditableConfig<PageState> =
  | boolean
  | {
      /** 白名单模式：只有配置了此 key 的字段可编辑 */
      canEditKeys?: Array<keyof Partial<PageState>>;
      /** 黑名单模式：配置了此 key 的字段不可编辑 */
      canNotEditKeys?: Array<keyof Partial<PageState>>;
    };

export const EASY_PAGE_REACT_UI = 'EASY_PAGE_REACT_UI';
