/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UIEngine,
  UIEngineNodeHandler,
  UIEngineNodeHandlerOption,
  UiType,
  forEachNode,
} from '@easy-page/core';
import { get, isEqual } from 'lodash';
import React from 'react';
import { FieldUIConfig } from '../interface';
import { EasyPageStore } from '../model';
import { DefaultPageProps } from '../types';
import { CORE_COMPONENTS } from '../utils';
import { FormUtil } from './formUtil';
import {
  ComponentProps,
  Components,
  EasyPageEffect,
  EasyPageOnChangeContext,
  EasyPageProps,
} from './interface';
import { DefaultValueInfo, DefaultValueSource } from '../devStateDebugger';

export class EasyPage<
  PageState = Record<string, unknown>,
  PageProps extends Record<string, any> = DefaultPageProps<PageState>,
  DefaultValues = Record<string, unknown>
> extends React.Component<
  EasyPageProps<
    PageState,
    PageProps & DefaultPageProps<PageState>,
    DefaultValues
  >,
  PageState
> {
  private uiEngine: UIEngine<
    PageState,
    PageProps & DefaultPageProps<PageState>
  >;

  private components: Components;

  private formUtil: FormUtil<PageState> | null = null;

  private dom: React.ReactNode;

  private store: EasyPageStore<
    PageState,
    PageProps & DefaultPageProps<PageState>
  >;

  private getDefaultValues(originData: Record<string, unknown> = {}) {
    const defaultValues: Record<string, unknown> = {};
    const logsInfo: Record<string, DefaultValueInfo[]> = {};

    const setNodesInfo = (id: string, info: DefaultValueInfo) => {
      logsInfo[id] = logsInfo[id] || [];
      logsInfo[id].push(info);
    };

    forEachNode(this.props.schema, (node) => {
      const processValue = node.preprocess
        ? node.preprocess({
            defaultValues: this.props.defaultValues || {},
            pageProps: this.props.context || {},
          })
        : undefined;
      const oriValue = get(originData, node.id);
      if (processValue !== undefined) {
        setNodesInfo(node.id, {
          id: node.id,
          value: processValue,
          source: DefaultValueSource.FromPreprocess,
        });
        defaultValues[node.id] = processValue;
      } else if (oriValue !== undefined) {
        setNodesInfo(node.id, {
          id: node.id,
          value: oriValue,
          source: DefaultValueSource.FromProps,
        });

        defaultValues[node.id] = oriValue;
      } else {
        setNodesInfo(node.id, {
          id: node.id,
          value: node.value,
          source: DefaultValueSource.FromNode,
        });

        defaultValues[node.id] = node.value;
      }
    });
    return { defaultValues, logsInfo };
  }

  constructor(
    props: EasyPageProps<
      PageState,
      PageProps & DefaultPageProps<PageState>,
      DefaultValues
    >
  ) {
    super(props);
    console.log(
      '进入组件时间：',
      new Date().getTime(),
      new Date().toLocaleString()
    );
    const { schema } = props;
    this.state = {} as PageState;
    /** 默认一些组件 + props 透传组件 */
    this.components = this.props.components || {};
    const { defaultValues: calcDefaultValues, logsInfo } =
      this.getDefaultValues(this.props.defaultValues || {});
    const defaultValues = {
      ...(this.props.defaultValues || {}),
      ...calcDefaultValues,
    };

    this.store = new EasyPageStore<
      PageState,
      PageProps & DefaultPageProps<PageState>
    >({
      pageProps: {
        ...(this.props.context ||
          ({} as PageProps & DefaultPageProps<PageState>)),
      },
      pageState: defaultValues as PageState,
      defaultValues: defaultValues,
      schema,
      logsInfo,
      showChildren: props.showChildren,
      pageId: this.props.pageId,
    });

    this.uiEngine = new UIEngine<
      PageState,
      PageProps & DefaultPageProps<PageState>
    >({
      schema,
      handlers: {
        rootContainerHandler: this.renderRootDom.bind(this),
        layoutContainerHandler: this.renderLayoutDom.bind(this),
        optionHandler: this.renderOptionDom.bind(this),
        optionalHandler: this.renderOptionalDom.bind(this),
        normalHandler: this.renderNormalDom.bind(this),
      },
    });
    this.dom = this.uiEngine.parse() as React.ReactNode;
  }

  componentDidMount(): void {
    // setTimeout(() => {
    //   console.warn(
    //     '解析组件时间-开始：',
    //     new Date().getTime(),
    //     new Date().toLocaleString()
    //   );
    //   this.setState({ ...this.state, timeStamp: new Date().getTime() });
    //   console.warn(
    //     '解析组件时间-结束：',
    //     new Date().getTime(),
    //     new Date().toLocaleString()
    //   );
    // }, 0);
  }

  componentWillUnmount(): void {
    console.log('解析组件时间- easy page unmount');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shouldComponentUpdate(nextProps: EasyPageProps<any, any, any>) {
    if (!isEqual(this.props.context || {}, nextProps.context || {})) {
      /**
       * - 当页面上下文变化时，刷新页面
       * - 感觉是不是用 mobx reaction 监控变化，进行调整比较好？
       * */
      this.store.setPageProps(nextProps.context || {});
      return true;
    }
    if (nextProps.loading !== this.props.loading) {
      return true;
    }
    return false;
  }

  private isForm() {
    return this.props.pageType === 'form';
  }

  /**
   * - 将 commonUIConfig 和 fieldUIConfig 合并
   * - 将函数上下文执行
   */
  private getUIConfig(options: {
    id: string;
    parentId: string;
    defaultUIConfig: FieldUIConfig;
    uiType: UiType;
  }): FieldUIConfig {
    const { id, parentId, defaultUIConfig, uiType } = options;
    /** 未获取到字段 UI 配置，则默认 */
    const fieldUIConfig =
      this.props.uiConfig[this.getUIConfigKey(id, parentId)];
    let uiConfig: FieldUIConfig = defaultUIConfig;

    if (fieldUIConfig) {
      uiConfig = {
        ...defaultUIConfig,
        ...fieldUIConfig,
      };
    }
    /** 合并通用配置 */
    if (this.props.commonUIConfig) {
      const commonUIConfig = this.props.commonUIConfig;
      const componentName: string = uiConfig[uiType] || '';
      if (
        componentName &&
        commonUIConfig[componentName as keyof typeof commonUIConfig]
      ) {
        /**
         * - 合并配置属性
         * - 规则是：
         *  - 字段配置高于 commonUIConfig
         */
        uiConfig[componentName as keyof typeof commonUIConfig] = {
          ...(commonUIConfig[
            componentName as keyof typeof commonUIConfig
          ] as any),
          ...(uiConfig[componentName as keyof typeof uiConfig] as any),
        };
      }
    }
    return uiConfig;
  }

  private getUIConfigKey(id: string, parentId?: string): string {
    return `${parentId || ''}_${id}`;
  }

  private generateComponentKey(options: {
    id: string;
    parentId: string;
    componentName: string;
  }) {
    const { id, parentId, componentName } = options;
    return `${componentName}_${id}_${parentId}`;
  }

  private handleUserEachEffect = ({
    effect,
    ...context
  }: EasyPageOnChangeContext<PageState> & {
    effect: EasyPageEffect<PageState>;
  }) => {
    const changedKeys = Object.keys(context.value);
    const hasChangedKeys = changedKeys.some((element) =>
      (effect.changedKeys as string[]).includes(element)
    );
    if (!hasChangedKeys) {
      return;
    }
    return effect.action(context);
  };

  private handleUserEffects = (context: EasyPageOnChangeContext<PageState>) => {
    const effects = this.props.effects || [];
    return effects.map((e) =>
      this.handleUserEachEffect({ ...context, effect: e })
    );
  };

  private returnComponent(
    options: UIEngineNodeHandlerOption<
      PageState,
      PageProps & DefaultPageProps<PageState>
    > & {
      /** 默认组件 */
      defaultUI: string;
      uiType: UiType;
      // - formItem 情况下会传递 field 下来，其余情况无 field
      field?: React.ReactNode;
    }
  ): React.ReactNode {
    const {
      nodeInfo,
      defaultUI,
      uiType,
      field,
      grandChildren,
      curNode,
      children,
      childrenRelation,
    } = options;
    const uiConfig = this.getUIConfig({
      id: nodeInfo.id,
      parentId: nodeInfo.parentId,
      uiType,
      defaultUIConfig: {
        [uiType]: defaultUI,
      },
    });

    // const { ui } = uiConfig
    const componentName = uiConfig[uiType] || '';
    const Component = this.components[componentName];

    // TODO: bad logic：给 form 增加 setFormUtil 函数
    const extraProps: any = {};
    if (componentName === CORE_COMPONENTS.FORM) {
      extraProps.setFormUtil = (formUtil: FormUtil<PageState>) => {
        this.props.setFormUtil?.(formUtil);
        this.formUtil = formUtil;
      };
    }

    const componentProps: ComponentProps<
      unknown,
      any,
      any,
      PageState,
      PageProps & DefaultPageProps<PageState>
    > = {
      frameworkProps: {
        nodeInfo,
        curNode,
        childrenRelation,
        componentName,
        uiType,
        store: this.store,
        isForm: this.isForm(),
        grandChildren,
        getFormUtil: () => {
          return this.formUtil;
        },
      },
      /** 用于表单的 onChange 到外部 */
      __internal_props_handleChange: (val: Partial<PageState>) => {
        const formData =
          this.formUtil?.getFormData({
            showChildren: this.props.showChildren,
          }) || {};
        const oriFormData = this.formUtil?.getOriginFormData() || {};
        const context: EasyPageOnChangeContext<PageState> = {
          value: val,
          values: formData,
          oriFormData,
          formUtil: this.formUtil,
        };
        this.handleUserEffects(context);
        return this.props.onChange?.({
          ...context,
          hasChanged(key) {
            return Object.keys(val).includes(key as any);
          },
        });
      },
      ...((uiConfig[componentName as keyof typeof uiConfig] || {}) as any),
      ...extraProps,
      children,
    };

    if (!Component) {
      throw new Error(`请注册组件：${componentName}`);
    }
    /**
     * - TODO: formItem 情况下会传递 children 下来，其余情况无 children
     */
    if (field) {
      (componentProps as any).children = field;
    }

    return (
      <Component
        key={this.generateComponentKey({
          id: nodeInfo.id,
          parentId: nodeInfo.parentId,
          componentName,
        })}
        {...componentProps}
      />
    );
  }
  private returnComponentByPageType(
    options: UIEngineNodeHandlerOption<
      PageState,
      PageProps & DefaultPageProps<PageState>
    > & {
      /** 默认组件 */
      defaultUI: string;
    }
  ): React.ReactNode {
    /**
     * - 非值类型，不包裹 formItem
     * - 在 api 创建的时候
     */
    if (!options.nodeInfo.isFormField) {
      return this.returnComponent({
        ...options,
        uiType: 'ui',
      });
    }
    return this.returnComponent({
      ...options,
      defaultUI: CORE_COMPONENTS.FORMITEM,
      uiType: 'formItemUI',
      field: this.returnComponent({
        ...options,
        uiType: 'ui',
      }),
    });
  }

  renderRootDom: UIEngineNodeHandler<
    PageState,
    PageProps & DefaultPageProps<PageState>
  > = (options) => {
    const defaultUI = this.isForm()
      ? CORE_COMPONENTS.FORM
      : CORE_COMPONENTS.ROOTCONTAINER;
    return this.returnComponent({ ...options, defaultUI, uiType: 'layoutUI' });
  };

  renderLayoutDom: UIEngineNodeHandler<
    PageState,
    PageProps & DefaultPageProps<PageState>
  > = (options) => {
    return this.returnComponent({
      ...options,
      defaultUI: CORE_COMPONENTS.LAYOUT,
      uiType: 'layoutUI',
    });
  };

  renderOptionDom: UIEngineNodeHandler<
    PageState,
    PageProps & DefaultPageProps<PageState>
  > = (options) => {
    const defaultUI =
      options.brothersRelation === 'coexist'
        ? CORE_COMPONENTS.CHECKBOX
        : CORE_COMPONENTS.RADIO;

    return this.returnComponent({ ...options, defaultUI, uiType: 'ui' });
  };

  renderOptionalDom: UIEngineNodeHandler<
    PageState,
    PageProps & DefaultPageProps<PageState>
  > = (options) => {
    const defaultUI =
      options.childrenRelation === 'coexist'
        ? CORE_COMPONENTS.CHECKBOXGROUP
        : CORE_COMPONENTS.RADIOGROUP;
    return this.returnComponentByPageType({ ...options, defaultUI });
  };
  renderNormalDom: UIEngineNodeHandler<
    PageState,
    PageProps & DefaultPageProps<PageState>
  > = (options) => {
    return this.returnComponentByPageType({
      ...options,
      defaultUI: CORE_COMPONENTS.INPUT,
    });
  };

  render() {
    if (!this.dom || this.props.loading) {
      return this.props.LoadingComponent || <div>加载中...</div>;
    }
    if (this.props.layout) {
      return this.props.layout({
        childen: this.dom,
        getFormUtil: () => this.formUtil,
      });
    }
    return this.dom;
  }
}
