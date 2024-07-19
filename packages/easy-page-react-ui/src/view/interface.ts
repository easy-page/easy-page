/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, UIEngineNodeHandlerOption } from '@easy-page/core';
import { FieldUIConfig } from '../interface';
import { EasyPageStore } from '../model';
import { DefaultPageProps } from '../types';
import { FormUtil } from './formUtil';

/**
 * key: 父节点 ID + 子节点的 ID （同一个父亲下同级元素 ID 不一样）
 * value: 对应节点的 UI 配置
 */
export type UIConfig = Record<string, FieldUIConfig>;

export type CommonUIConfig = Omit<FieldUIConfig, 'ui'>;

/** 组件: key 为：UI_COMPONENTS 中值，value 为组件 */
export type Components = Record<string, React.JSXElementConstructor<unknown>>;

export type EasyPageLayout<PageState> = React.FC<
  EasyPageLayoutProps<PageState>
>;

export type EasyPageLayoutProps<PageState> = {
  childen: unknown;
  getFormUtil: () => FormUtil<PageState> | null;
};

/** 当 changedKeys 中的字段发生变化，执行对应 action */
export type EasyPageEffect<PageState> = {
  changedKeys: Array<keyof PageState>;
  action: (context: EasyPageOnChangeContext<PageState>) => void;
};

export type EasyPageOnChangeContext<PageState> = {
  value: Partial<PageState>;
  values: Record<string, any>;
  oriFormData: Partial<PageState>;
  formUtil?: FormUtil<PageState> | null;
};

export type ShowChildrenMap<PageState> = Partial<
  Record<
    keyof PageState,
    (context: {
      fieldValue: any;
      parentNode: Schema<any>;
      curNode: Schema<any>;
    }) => boolean
  >
>;

export type EasyPageProps<
  PageState,
  PageProps extends DefaultPageProps<PageState>,
  DefaultValues = Record<string, any>
> = {
  schema: Schema<unknown, PageState, PageProps>;
  uiConfig: UIConfig;
  commonUIConfig?: CommonUIConfig;
  loading?: boolean;
  LoadingComponent?: React.ReactNode;
  /** 用户配置的 values */
  defaultValues?: DefaultValues;
  // pageKey?: string;
  components?: Record<string, React.JSXElementConstructor<any>>;
  context?: PageProps;
  pageType?: 'form' | 'page';

  /** 用于子表单回填时，setRef, 唯一的字符串即可 */
  pageId?: string;
  setFormUtil?: (formUtil: FormUtil<PageState>) => void;
  /** 用于挂载下拉框所在位置 */
  getPopContainer?: (...args: unknown[]) => Element;
  /**
   * - value 为表单当前变化的字段值
   * - values 为表单当前最终提交时的数据结构
   * - oriFormData 为表单当前内部所有状态
   *  */
  onChange?: (
    context: EasyPageOnChangeContext<PageState> & {
      hasChanged: (key: Partial<keyof PageState>) => boolean;
    }
  ) => void;
  /**
   * - 当某些 key 变化的时候，才执行相关的 action
   * - 如果所有 key 变化的时候，都希望执行的，就用 onChange
   */
  effects?: EasyPageEffect<PageState>[];
  layout?: EasyPageLayout<PageState>;

  /** 当有些字段的是否展示子元素方式比较特殊，则可以使用这个方法进行特殊定义，如：下拉框组件，选择某个选项后是否展示子元素的判断 */
  showChildren?: ShowChildrenMap<PageState>;
};

/**
 * - 单个组件的公共透传属性
 * - value、onChange、onBlur、children: 默认组件一般都有此属性，但我们会重写此方法
 * - nodeInfo、context
 * - formState -> store 获取
 * - formProps -> context 获取
 * - validateForm -> EasyPage 组件透传
 * - submitForm -> EasyPage 组件透传 + 用户透传组合
 */
export type BaseFrameworkProps<
  EffectedResultType = unknown,
  PageState = Record<string, unknown>,
  PageProps extends DefaultPageProps<PageState> = DefaultPageProps<PageState>
> = Omit<UIEngineNodeHandlerOption<PageState, PageProps>, 'children'> & {
  componentName: string;
  uiType: string;
  /** 是否是表单页面 */
  isForm: boolean;
  effectedResult?: EffectedResultType;
  effectedLoading?: boolean;
  getFormUtil?: () => FormUtil<PageState>;
  store: EasyPageStore<Partial<PageState>, Partial<PageProps>>;
  /** 组件更新时间，用于刷新组件 */
  upt?: number;
};

export type FrameworkProps<
  FieldValueType,
  EffectedResultType = unknown,
  PageState = Record<string, unknown>,
  PageProps extends DefaultPageProps<PageState> = DefaultPageProps<PageState>
> = {
  frameworkProps: BaseFrameworkProps<EffectedResultType, PageState, PageProps>;
  value: FieldValueType;
  onChange: (value: FieldValueType) => void;
  onBlur?: (e?: any) => void;
};

export type ComponentProps<
  BaseProps,
  FieldValueType,
  EffectedResultType = any,
  PageState = Record<string, any>,
  PageProps extends DefaultPageProps<PageState> = DefaultPageProps<PageState>
> = BaseProps &
  FrameworkProps<FieldValueType, EffectedResultType, PageState, PageProps>;
