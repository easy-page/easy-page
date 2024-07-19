/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from '@easy-page/core';
import { computed, makeAutoObservable, toJS } from 'mobx';
import { FieldUIConfig } from '../interface';
import { DefaultPageProps } from '../types/page';
import { ShowChildrenMap } from '../view';
import { DefaultValueInfo, DevStateDeugger } from '../devStateDebugger';

export type EasyPageStoreOptions<PageState, PageProps> = {
  pageState: PageState;
  defaultValues: Partial<PageState>;
  pageProps: PageProps;
  schema: Schema<unknown, PageState, PageProps>;
  pageId?: string;
  /** 当有些字段的是否展示子元素方式比较特殊，则可以使用这个方法进行特殊定义，如：下拉框组件，选择某个选项后是否展示子元素的判断 */
  showChildren?: ShowChildrenMap<PageState>;
  logsInfo?: Record<string, DefaultValueInfo[]>;
};

export const DEBUGGER_SWITCH = 'easy_page_debugger';

/**
 * - 每个表单或者页面单独一个 store，维护上下文状态
 */
export class EasyPageStore<
  PageState,
  PageProps extends DefaultPageProps<PageState>
> {
  public schema: Schema<unknown, PageState, PageProps>;

  public pageId: string;

  /** 当有些字段的是否展示子元素方式比较特殊，则可以使用这个方法进行特殊定义，如：下拉框组件，选择某个选项后是否展示子元素的判断 */
  public showChildren?: ShowChildrenMap<PageState>;

  /**
   * key: 不是 keyChain，存储的都是对象：{a: {b: {c: 1}}}
   */
  public pageState: Partial<PageState>;

  private pageProps: Partial<PageProps>;

  /** 默认值 */
  private defaultValues: Partial<PageState>;

  /** UI 配置 */
  private uiConfig: Record<string, FieldUIConfig> = {};

  public debugger: DevStateDeugger | null = null;

  private isDev() {
    if (!window || !window.location || !window.location.href) {
      return false;
    }
    if (window.location.href.includes('127.0.0.1')) {
      return true;
    }
    if (window.location.href.includes('localhost')) {
      return true;
    }

    /** 方便线上排查问题 */
    const debuggerSwitch = window.localStorage.getItem(DEBUGGER_SWITCH);
    if (debuggerSwitch === 'true') {
      return true;
    }

    return false;
  }

  constructor(options: EasyPageStoreOptions<PageState, PageProps>) {
    const {
      pageProps,
      pageState,
      defaultValues,
      schema,
      pageId,
      showChildren,
    } = options;
    this.pageState = pageState;
    this.defaultValues = defaultValues || {};
    this.pageProps = pageProps || {};
    this.schema = schema;
    this.pageId = pageId || '';
    this.showChildren = showChildren;
    if (this.isDev()) {
      this.debugger = new DevStateDeugger({ formId: this.pageId });
      (window as any)[this.pageId] = this.debugger;
      this.debugger.setValuesInfo(options.logsInfo || {});
    }

    makeAutoObservable(this);
  }

  /**
   *
   * @returns 获取表单初始值
   */
  getDefaultValues() {
    return this.defaultValues;
  }

  /** 重置表单 */
  resetState() {
    this.pageState = { ...this.defaultValues };
  }

  /**
   * - key：为：parentId + curNodeId
   * @param key
   * @param value
   */
  setUIConfig(key: string, value: FieldUIConfig) {
    this.uiConfig[key] = value;
  }

  @computed getUIConfig(key: string) {
    return toJS(this.uiConfig[key]);
  }

  @computed getEffectedData(keys: string[]) {
    const result: Record<string, unknown> = {};
    keys.forEach((each) => {
      result[each] = toJS(
        this.pageState[each as keyof PageState] ??
          this.pageProps[each as keyof PageProps]
      );
    });

    return result;
  }

  getPageProps() {
    return toJS(this.pageProps);
  }

  setPageProps(pageProps: Partial<PageProps>) {
    this.pageProps = {
      ...this.pageProps,
      ...pageProps,
    };
  }

  setStates(pageState: Partial<PageState>) {
    this.pageState = {
      ...this.pageState,
      ...pageState,
    };
  }

  getAllState() {
    return toJS(this.pageState);
  }

  /**
   * - 所有值类型的节点的 ID 唯一
   * @param key
   * @param value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState(key: string, value: any) {
    // TODO: 考虑数组的合并、对象的覆盖等
    this.pageState[key as keyof PageState] = value;
  }

  getState(key: string) {
    // TODO: 考虑 a.b.c
    return toJS(this.pageState[key as keyof PageState]);
  }

  getProp(key: string) {
    // TODO: 考虑 a.b.c
    return toJS(this.pageProps[key as keyof PageProps]);
  }
}
