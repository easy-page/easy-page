/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import {
  EffectActionType,
  EffectKeys,
  Schema,
  SchemaNodeOption,
  WhenType,
  createSchemaField,
  createSchemaNode,
} from '@easy-page/core';
import { FieldUIConfig } from '../../interface';
import { CORE_COMPONENTS, UI_OPTION_MAP } from '../../utils';
import { NodeInfo, NodeInfoWithChildren, NodeOption } from './interface';

/**
 * - 创建值类型 - 表单元素
 * - 创建值类型 - 非表单元素
 * - 创建非值类型 - 表单元素
 * - 创建非值类型 - 非表单元素
 */
export abstract class BaseNodeUtil {
  private getUIConfigKey(id: string, parentId: string) {
    return `${parentId}_${id}`;
  }

  private getParentComponentName<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Record<string, any>
  >(node: NodeInfo<FieldType, PageState, PageProps>) {
    if (node.fieldUIConfig.ui) {
      return node.fieldUIConfig.ui;
    }
    if (
      !node.schema.childrenRelation ||
      node.schema.childrenRelation === 'none'
    ) {
      return '';
    }
    const ui =
      node.schema.childrenRelation === 'coexist'
        ? CORE_COMPONENTS.CHECKBOXGROUP
        : CORE_COMPONENTS.RADIOGROUP;
    return ui;
  }

  getFields(
    nodes: Array<NodeInfo<any, any, any> | NodeInfoWithChildren<any, any, any>>
  ): NodeInfo<any, any, any>[] {
    return nodes.map((each) => {
      if (
        typeof (each as NodeInfoWithChildren<any, any, any>).appendChildren ===
        'function'
      ) {
        /** 表示没执行过 */
        return (each as NodeInfoWithChildren<any, any, any>)
          .curNode as NodeInfo<any, any, any>;
      }
      return each as NodeInfo<any, any, any>;
    });
  }

  private combineChildrenUIConfig = (selfConfig: FieldUIConfig, childUIConfig?: FieldUIConfig): FieldUIConfig => {
    const newConfig = { ...(selfConfig || {}) }
    const keys = Object.keys(newConfig);
    const newChildConfig = childUIConfig || {};
    keys.forEach((each: string) => {
      const config = newChildConfig[each as keyof typeof newChildConfig];
      const _newConfig = newConfig[each as keyof typeof newConfig]
      if (config && typeof config === 'object' && typeof _newConfig === 'object' && !Array.isArray(config) && !Array.isArray(_newConfig)) {
        newConfig[each as keyof typeof newConfig] = {
          ...(config as any),
          ...(_newConfig as any),
        } as any;
      }
    })
    return newConfig;
  }

  /**
   * - 将选择框的选项的类型，自动关联
   * - 用户可以自定义选项类型
   * @param curNode
   * @returns
   */
  protected returnNodeInfoWithChildren<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Record<string, any>
  >(
    curNode: NodeInfo<FieldType, PageState, PageProps>,
    options?: {
      /** 孩子的通用 UI 配置 */
      childrenUIConfig?: FieldUIConfig;
      /** 通用配置，配置子元素显示与隐藏，如子元素自己配置，则使用子元素本身的 */
      childrenWhen?: WhenType<any, PageState, PageProps>;
      /** 通用配置，配置子元素副作用，如子元素自己配置了，合并，子元素的副作用优先 */
      childrenActions?: Array<EffectActionType<any, PageState, PageProps>>;
    }
  ): NodeInfoWithChildren<FieldType, PageState, PageProps> {
    const {
      childrenUIConfig,
      childrenWhen,
      childrenActions = [],
    } = options || {};

    return {
      curNode,
      appendChildren: (
        fields: Array<
          NodeInfo<any, any, any> | NodeInfoWithChildren<any, any, any>
        >
      ): NodeInfo<FieldType, PageState, PageProps> => {
        const _fields = this.getFields(fields);
        if (_fields.length === 0) {
          /** 无子元素时，不进行拷贝 */
          return curNode;
        }
        const newNode = curNode;
        newNode.schema.children = _fields.map((each) => {
          newNode.childrenUIConfig = newNode.childrenUIConfig || {};
          const newestChildrenUIConfig = this.combineChildrenUIConfig(each.fieldUIConfig, childrenUIConfig)

          const parentComponentName = this.getParentComponentName(newNode);
          if (
            !newestChildrenUIConfig.ui &&
            UI_OPTION_MAP[parentComponentName]
          ) {
            newestChildrenUIConfig.ui = UI_OPTION_MAP[parentComponentName];
          }
          newNode.childrenUIConfig[
            this.getUIConfigKey(each.schema.id, newNode.schema.id)
          ] = newestChildrenUIConfig;

          /** 拼接所有孩子的 UI */

          newNode.childrenUIConfig = {
            ...newNode.childrenUIConfig,
            ...(each.childrenUIConfig || {}),
          };

          // 处理 defaultValues
          newNode.defaultValues = {
            ...newNode.defaultValues,
            ...each.defaultValues,
          };

          /** 处理子元素 when 函数 */
          each.schema.when = each.schema.when || childrenWhen;

          /** 处理子元素 actions */
          if (each.schema.actions) {
            each.schema.actions = [...each.schema.actions, ...childrenActions];
          } else {
            each.schema.actions = [...childrenActions];
          }

          return each.schema;
        });
        return newNode;
      },
    };
  }

  protected convertMode(mode?: 'single' | 'multiple') {
    if (!mode) {
      return 'none';
    }
    return mode === 'single' ? 'single' : 'coexist';
  }

  protected getOptions(
    options: NodeOption<any, any, any> & {
      name?: string;
      /** 收敛一个通用逻辑，当需要监听变化，刷新自己时使用 */
      effectedKeys?: EffectKeys<any, any>
    }
  ): SchemaNodeOption<any, any, any> {
    const { name: _, mode, actions, effectedKeys, ...restOptions } = options;
    const childrenRelation: 'coexist' | 'single' | 'none' =
      this.convertMode(mode);

    const finalActions: typeof actions = effectedKeys ? [...(actions || []), {
      effectedKeys: effectedKeys,
      initRun: true,
      action: () => new Promise((resolve, reject) => {
        /** 当 action 时间非常短时，如果是同步的结果，则会导致组件不刷新 */
        setTimeout(() => {
          resolve({
            upt: new Date().getTime(),
          });
        });
      })
    }] : actions

    return {
      actions: finalActions,
      ...restOptions,
      childrenRelation,
    };
  }

  /** 非表单元素节点，不被 formItem 包裹 */
  protected doCreateNode<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Record<string, any>
  >(
    id: string,
    options: NodeOption<FieldType, PageState, PageProps> & {
      name?: string;
      /** 收敛一个通用逻辑，当需要监听变化，刷新自己时使用 */
      effectedKeys?: EffectKeys<PageState, PageProps>
    },
    fieldUIConfig: FieldUIConfig
  ): NodeInfo<FieldType, PageState, PageProps> {
    const schema: Schema<FieldType, PageState, PageProps> = createSchemaNode(
      id,
      options.name || '',
      this.getOptions(options)
    );
    return {
      schema,
      fieldUIConfig,
      defaultValues: this.getFieldDefaultValue(schema, options.value),
    };
  }

  protected abstract handleRequiredConfig(
    fieldUIConfig: FieldUIConfig,
    required: boolean
  ): FieldUIConfig;

  /** 表单元素节点，被 formItem 包裹 */
  protected doCreateField<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Record<string, any>
  >(
    id: string,
    name: string,
    options: NodeOption<FieldType, PageState, PageProps> & {
      /** 收敛一个通用逻辑，当需要监听变化，刷新自己时使用 */
      effectedKeys?: EffectKeys<PageState, PageProps>
    },
    fieldUIConfig: FieldUIConfig
  ): NodeInfo<FieldType, PageState, PageProps> {
    const { required, ...rest } = options;
    const schema: Schema<FieldType, PageState, PageProps> = createSchemaField(
      id,
      name,
      this.getOptions(rest)
    );

    /** 简化 required 使用 */
    // (fieldUIConfig as any).formItem = (fieldUIConfig as any).formItem || {};
    // /** 默认为 true */
    // const userRequired = required ?? (fieldUIConfig as any).formItem.required;
    // (fieldUIConfig as any).formItem.required = userRequired ? true : required;
    return {
      schema,
      fieldUIConfig: this.handleRequiredConfig(
        fieldUIConfig,
        Boolean(required)
      ),
      defaultValues: this.getFieldDefaultValue(schema, options.value),
    };
  }

  protected getFieldDefaultValue<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Record<string, any>
  >(schema: Schema<FieldType, PageState, PageProps>, value: any) {
    return {
      [schema.id]: value,
    } as Partial<PageState>;
  }
}
