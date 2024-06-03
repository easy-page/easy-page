/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataContext,
  EffectActionType,
  EffectKeys,
  PostprocessContext,
  Schema,
  SchemaNodeOption,
  Validate,
  WhenType,
} from '@easy-page/core';
import { FieldUIConfig } from '../../interface';
import { UIConfig } from '../../view';

export type CommonPageUtilProps<T> = T & {
  /** 根元素 ID */
  pageId: string;
  /** 页面名设置 */
  pageName?: string;
  rootUIConfig?: FieldUIConfig;
  commonUIConfig?: FieldUIConfig;
};
export type PageInfo<PageState, PageProps> = {
  schema: Schema<any, PageState, PageProps>;
  uiConfig: UIConfig;
  // schemaDefaultValues: Partial<PageState>;
};

export type NodeOption<
  FieldType,
  PageState = Record<string, any>,
  PageProps = Record<string, any>,
  EffectResultType = any
> = Omit<
  SchemaNodeOption<FieldType, PageState, PageProps, EffectResultType> & {
    value?: FieldType;
    /** 快捷 api 设置 */
    required?: boolean;
    /**
     * - 选择型组件，若使用 appendChildren 创建选项，必填此配置，如：下拉框、单选框、多选框等
     * - mode 代替 childrenRelation 配置，更好理解
     * - mode = undefined => childrenRelation = 'none'
     * - mode = single => childrenRelation = 'single'， 默认 radioGroup 组件
     * - mode = multiple => childrenRelation = 'coexit'，默认：checkboxGroup 组件
     *  */
    mode?: 'single' | 'multiple';
  },
  'childrenRelation'
>;

export type NodeWithChildrenOption<
  FieldType,
  PageState = Record<string, any>,
  PageProps = Record<string, any>,
  EffectResultType = any
> = NodeOption<FieldType, PageState, PageProps, EffectResultType> & {
  /** 对于存在孩子节点的，进行统一 UI 配置 */
  childrenUIConfig?: FieldUIConfig;
  /** 通用配置，配置子元素显示与隐藏，如子元素自己配置，则使用子元素本身的 */
  childrenWhen?: WhenType<any, PageState, PageProps>;
  /** 通用配置，配置子元素副作用，如子元素自己配置了，合并，子元素的副作用优先 */
  childrenActions?: Array<EffectActionType<any, PageState, PageProps>>;

  /** 收敛一个通用逻辑，当需要监听变化，刷新自己时使用 */
  effectedKeys?: EffectKeys<PageState, PageProps>
};

export type NodeInfo<
  FieldType,
  PageState = Record<string, any>,
  PageProps = Record<string, any>,
  EffectResultType = any
> = {
  schema: Schema<FieldType, PageState, PageProps, EffectResultType>;
  fieldUIConfig: FieldUIConfig;
  childrenUIConfig?: UIConfig;
  defaultValues: Partial<PageState>;
};
export type NodeInfoWithChildren<
  FieldType,
  PageState = Record<string, any>,
  PageProps = Record<string, any>,
  EffectResultType = any
> = {
  appendChildren: (
    fields: Array<NodeInfo<any, any, any> | NodeInfoWithChildren<any, any, any>>
  ) => NodeInfo<FieldType, PageState, PageProps>;
  curNode: NodeInfo<any, any, any, EffectResultType>;
};

export type WrapperNodeOption<
  FieldType,
  PageState = Record<string, any>,
  PageProps = Record<string, any>,
  EffectResultType = any
> = {
  desc?: string;
  value?: FieldType;
  mode?: 'single' | 'multiple';
  name?: string;
  required?: boolean;
  when?: (
    oldWhen?: WhenType<FieldType, PageState, PageProps>
  ) => WhenType<FieldType, PageState, PageProps>;
  validate?: (
    oldValidate?: Validate<FieldType, PageState, PageProps>
  ) => Validate<FieldType, PageState, PageProps>;
  actions?: (
    oldActions?: Array<
      EffectActionType<FieldType, PageState, PageProps, EffectResultType>
    >
  ) => Array<
    EffectActionType<FieldType, PageState, PageProps, EffectResultType>
  >;
  postprocess?: (
    oldPostprocess?: (
      context: PostprocessContext<FieldType, PageState, PageProps>
    ) => Record<string, unknown>
  ) => (
    context: PostprocessContext<FieldType, PageState, PageProps>
  ) => Record<string, unknown>;
  preprocess?: (
    oldPreprocess?: (
      context: Pick<
        DataContext<FieldType, PageState, PageProps>,
        'defaultValues' | 'pageProps'
      >
    ) => FieldType
  ) => (
    context: Pick<
      DataContext<FieldType, PageState, PageProps>,
      'defaultValues' | 'pageProps'
    >
  ) => FieldType;
};
