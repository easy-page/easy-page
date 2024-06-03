/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Empty { }

/** 创建节点时，选项透传 */
export type SchemaNodeOption<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
  EffectResultType = unknown
> = Omit<
  Schema<FieldType, PageState, PageProps, EffectResultType>,
  'isFormField' | 'value' | 'id' | 'name' | 'children'
>;

export type EffectDataType<
  PageState = Record<string, unknown>,
  PageProps = Empty
> = Partial<
  PageProps extends undefined
  ? PageState extends undefined
  ? PageProps
  : PageState
  : PageState extends undefined
  ? PageProps
  : PageState & PageProps
>;

export type Context<FieldType, PageState, PageProps = Empty, DefaultValues = Record<string, any>> = DataContext<
  FieldType,
  PageState,
  PageProps,
  DefaultValues
> & {
  effectedData: Partial<EffectDataType<PageState, PageProps>>; // current page state
  /** whether is the first time to run action after component has mounted */
  initRun?: boolean;
};

export type DataContext<FieldType, PageState, PageProps, DefaultValues = Record<string, any>> = {
  pageState: Partial<PageState>; // current page state
  pageProps: Partial<PageProps>; // current page props
  value: FieldType; // current node value
  defaultValues: Partial<DefaultValues>; // current page default state
};

/** returns type of effect action */
export type EffectActionResult<FieldType, EffectResultType = unknown> = {
  /** effect current node value */
  fieldValue?: FieldType;

  /** 修改值时是否验证表单字段 */
  validate?: boolean;
  /** effect current node other props, such as options or component props */
  effectResult?: EffectResultType;
  /** 用于刷新组件 */
  upt?: number;
};

export type ValidateResult = {
  success: boolean;
  errorMsg?: string;
};

/** field validate type */
export type Validate<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>
> = (
  context: Omit<Context<FieldType, PageState, PageProps>, 'effectedData'> & {
    pageState: PageState;
    pageProps: PageProps;
  }
) => ValidateResult | Promise<ValidateResult>;

export type EffectActionHandlerType<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
  EffectedResultType = unknown,
  DefaultValues = Record<string, any>
> = (
  context: Context<FieldType, PageState, PageProps, DefaultValues>
) =>
    | EffectActionResult<FieldType, EffectedResultType>
    | Promise<EffectActionResult<FieldType, EffectedResultType>>;

export type EffectKeys<
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>
> = PageState extends undefined
  ? PageProps extends undefined
  ? Array<keyof PageState>
  : Array<keyof PageProps>
  : PageProps extends undefined
  ? Array<keyof PageState>
  : Array<keyof PageState | keyof PageProps>;

export type BaseSchema = {
  id: string; // node id
  name: string; // node name
};

/**
 * - 一次副作用，只执行一个 action
 * - 同一个 key，被写在多个 action 中，只执行优先级最高的那个，并给出 warning 提示。
 * - 优先级按照数据顺序，第 0 个优先级高
 */
export type EffectActionType<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
  EffectedResultType = unknown
> = {
  action: EffectActionHandlerType<
    FieldType,
    PageState,
    PageProps,
    EffectedResultType
  >;

  /** 
   * - 设置后，会在组件挂载时执行一次，若有多个 Action，取第一个找到的 Action 执行
   * - 次字段的价值，在于传递了 effectedKeys 的情况下，期望其首次加载的时候也执行，后续影响后也执行同样的副作用。
   *  */
  initRun?: boolean;
  /** 若不传 effectedKeys 或者为空，则在组件挂载时执行一次 */
  effectedKeys?: EffectKeys<PageState, PageProps>;
};

// export type ValidateType<
//   FieldType,
//   PageState = Record<string, unknown>,
//   PageProps = Record<string, unknown>
// > = {
//   effectedKeys: EffectKeys<PageState, PageProps>;
//   validate: ;
// };

export type WhenType<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>
> = {
  /** 若不传，则只会在首次加载时执行一次 */
  effectedKeys?: EffectKeys<PageState, PageProps>;
  /** 是否禁用初次进入时运行 when， 默认不禁用 */
  disableInitRun?: boolean;
  show: <DefaultValues = Record<string, unknown>>(context: Context<FieldType, PageState, PageProps, DefaultValues>) => boolean;
};


export type PostprocessContext<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
> = DataContext<FieldType, PageState, PageProps> & {
  // 已经处理过的 formData
  processedFormData: Record<string, any>
}

/** extends info */
export type Schema<
  FieldType,
  PageState = Record<string, unknown>,
  PageProps = Record<string, unknown>,
  EffectedResultType = unknown
> = BaseSchema & {
  /** field value */
  value?: FieldType;
  /** - internal 概念，被 FormItem 包裹的元素 */
  isFormField: boolean; // 是否是表单元素，api 指定，默认：false
  desc?: string;
  childrenRelation?: 'coexist' | 'single' | 'none';
  children?: Schema<unknown, PageState, PageProps, unknown>[];
  /** before submit handle data */
  postprocess?: (
    context: PostprocessContext<FieldType, PageState, PageProps>
  ) => Record<string, unknown>;
  /** inject data in form  */
  preprocess?: (
    context: Pick<
      DataContext<FieldType, PageState, PageProps>,
      'defaultValues' | 'pageProps'
    >
  ) => FieldType;
  /** when state or props changed, do something */
  actions?: Array<
    EffectActionType<FieldType, PageState, PageProps, EffectedResultType>
  >;
  validate?: Validate<FieldType, PageState, PageProps>;
  when?: WhenType<FieldType, PageState, PageProps>;
};

export type UiType = 'layoutUI' | 'formItemUI' | 'ui';
