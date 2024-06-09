/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash';
import { FieldUIConfig } from '../../interface';
import { BaseNodeUtil } from './baseNodeUtil';
import {
  NodeInfo,
  NodeInfoWithChildren,
  NodeWithChildrenOption,
  WrapperNodeOption,
} from './interface';
import { EffectKeys } from '@easy-page/core';

/**
 * - 用于创建单个字段节点
 * -
 */
interface Empty { }
export abstract class CommonNodeUtil extends BaseNodeUtil {
  /** 为节点添加配置 */
  extends<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    curNode:
      | NodeInfo<any, any, any, any>
      | NodeInfoWithChildren<any, any, any, any>,
    options: WrapperNodeOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    > & {
      name?: string;
      id?: string;
      fieldUIConfig?: (oldFieldUIConfig?: FieldUIConfig) => FieldUIConfig;
      /** 收敛一个通用逻辑，当需要监听变化，刷新自己时使用 */
      effectedKeys?: EffectKeys<PageState, PageProps>
    }
  ): NodeInfoWithChildren<FieldType, PageState, PageProps, EffectResultType> {
    const isNodeInfoWithChildren =
      typeof (
        curNode as NodeInfoWithChildren<
          FieldType,
          PageState,
          PageProps,
          EffectResultType
        >
      ).appendChildren === 'function';
    const _curNode = isNodeInfoWithChildren
      ? (
        curNode as NodeInfoWithChildren<
          FieldType,
          PageState,
          PageProps,
          EffectResultType
        >
      ).curNode
      : curNode;
    const node = cloneDeep(
      _curNode as NodeInfo<FieldType, PageState, PageProps, EffectResultType>
    );

    /** Schema 处理 - start */
    const {
      name,
      required,
      value,
      id,
      when,
      mode,
      effectedKeys,
      validate,
      actions,
      postprocess,
      preprocess,
      fieldUIConfig,
    } = options;
    node.schema.name = name || node.schema.name;

    node.schema.actions = node.schema.actions || [];
    if (effectedKeys) {
      node.schema.actions.push({
        effectedKeys,
        action: () => new Promise((resolve, reject) => {
          /** 当 action 时间非常短时，如果是同步的结果，则会导致组件不刷新 */
          setTimeout(() => {
            resolve({
              upt: new Date().getTime(),
            });
          });
        })
      })
    }

    if (id !== undefined) {
      node.schema.id = id;
    }
    if (required !== undefined) {
      node.fieldUIConfig = this.handleRequiredConfig(
        node.fieldUIConfig,
        Boolean(required)
      );
    }
    if (mode !== undefined) {
      node.schema.childrenRelation = this.convertMode(mode);
    }
    if (when !== undefined) {
      node.schema.when = when(node.schema.when ? cloneDeep(node.schema.when) : undefined);
    }
    if (validate !== undefined) {
      node.schema.validate = validate(node.schema.validate);
    }
    if (postprocess !== undefined) {
      node.schema.postprocess = postprocess(node.schema.postprocess);
    }

    if (preprocess !== undefined) {
      node.schema.preprocess = preprocess(node.schema.preprocess);
    }
    if (actions !== undefined) {
      node.schema.actions = actions(node.schema.actions ? cloneDeep(node.schema.actions) : undefined);
    }
    /** Schema 处理 - end */
    /** 默认值处理 - start */
    if (value) {
      node.defaultValues = this.getFieldDefaultValue(node.schema, value);
      node.schema.value = value;
    }
    /** 默认值处理 - end */
    /** UI 配置处理 - start */
    if (fieldUIConfig) {
      node.fieldUIConfig = fieldUIConfig(node.fieldUIConfig ? cloneDeep(node.fieldUIConfig) : {});
    }

    // if (isNodeInfoWithChildren) {
    //   return {
    //     curNode: node,
    //     appendChildren: (
    //       curNode as NodeInfoWithChildren<
    //         FieldType,
    //         PageState,
    //         PageProps,
    //         EffectResultType
    //       >
    //     ).appendChildren,
    //   };
    // }
    /** UI 配置处理 - end */
    return this.returnNodeInfoWithChildren(node);
  }

  /**
   * 节点-无 FormItem 包裹
   */
  createNode<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    options: NodeWithChildrenOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    > & {
      name?: string;
    },
    fieldUIConfig?: FieldUIConfig
  ): NodeInfoWithChildren<FieldType, PageState, PageProps, EffectResultType> {
    const { childrenUIConfig, childrenActions, childrenWhen, ...rest } =
      options;
    const curNode = this.doCreateNode(id, rest, fieldUIConfig || {});
    return this.returnNodeInfoWithChildren(curNode, {
      childrenUIConfig,
      childrenActions,
      childrenWhen,
    });
  }
  /**
   * 节点-被 FormItem 包裹
   */
  createField<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    name: string,
    options: NodeWithChildrenOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    >,
    fieldUIConfig?: FieldUIConfig
  ): NodeInfoWithChildren<FieldType, PageState, PageProps> {
    const { childrenUIConfig, childrenActions, childrenWhen, ...rest } =
      options;
    const curNode = this.doCreateField(id, name, rest, fieldUIConfig || {});
    return this.returnNodeInfoWithChildren(curNode, {
      childrenUIConfig,
      childrenActions,
      childrenWhen,
    });
  }

  /** 自定义组件，非 FormItem 包裹 */
  abstract createCustomNode<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    component: React.FC,
    options: NodeWithChildrenOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    >,
    fieldUIConfig?: FieldUIConfig
  ): NodeInfoWithChildren<FieldType, PageState, PageProps, EffectResultType>;

  /** 自定义组件，被 FormItem 包裹 */
  abstract createCustomField<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    name: string,
    component: React.FC,
    options: NodeWithChildrenOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    >,
    fieldUIConfig?: FieldUIConfig
  ): NodeInfoWithChildren<FieldType, PageState, PageProps, EffectResultType>;
}
