/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CommonNodeUtil,
  ComponentProps,
  DefaultPageProps,
  EffectKeys,
  Empty,
  NodeInfo,
  NodeInfoWithChildren,
  NodeOption,
  NodeWithChildrenOption,
} from '@easy-page/react-ui';
import { FieldUIConfig } from '@easy-page/react-ui/interface';
import { FC } from 'react';
import { UI_COMPONENTS } from '../common/constant';
import {
  ChildFormBaseProps,
  ChildFormContainerProps,
  ChildFormState,
} from '../components';
import { CustomProps } from '../components/Custom';

class NodeUtil extends CommonNodeUtil {
  private getCustomNodeUIConfig(
    component: React.FC<Omit<CustomProps<any, any, any, any>, 'component'>>,
    fieldUIConfig?: FieldUIConfig
  ) {
    const curFieldUIConfig = fieldUIConfig || {};
    curFieldUIConfig.ui = UI_COMPONENTS.CUSTOM;
    curFieldUIConfig.custom = curFieldUIConfig.custom || {};
    curFieldUIConfig.custom.component = component;
    return curFieldUIConfig;
  }
  createCustomNode<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    component: FC<Omit<CustomProps<any, EffectResultType, PageState, PageProps>, 'component'>>,
    options: NodeWithChildrenOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    >,
    fieldUIConfig?: FieldUIConfig | undefined
  ): NodeInfoWithChildren<FieldType, PageState, PageProps, EffectResultType> {
    const { childrenUIConfig, childrenActions, childrenWhen, ...rest } =
      options;
    const curNode = this.doCreateNode(
      id,
      rest,
      this.getCustomNodeUIConfig(component, fieldUIConfig)
    );
    return this.returnNodeInfoWithChildren(curNode, {
      childrenUIConfig,
      childrenActions,
      childrenWhen,
    });
  }

  createContainer<
    PageState = Record<string, any>,
    PageProps = Empty,
    FieldType = string,
    EffectResultType = any
  >(
    id: string,
    component: React.FC<Omit<CustomProps<any>, 'component'>>,
    options?: Omit<
      NodeWithChildrenOption<FieldType, PageState, PageProps, EffectResultType>,
      'value'
    > & {
      fieldUIConfig?: FieldUIConfig;
    }
  ) {
    const {
      childrenUIConfig,
      fieldUIConfig,
      childrenActions,
      childrenWhen,
      ...rest
    } = options || {};
    const curNode = this.doCreateNode(
      id,
      { ...rest, },
      this.getCustomNodeUIConfig(component, {
        ...fieldUIConfig,
        layout: {
          disableLayout: true,
        },
      })
    );
    return this.returnNodeInfoWithChildren(curNode, {
      childrenUIConfig,
      childrenActions,
      childrenWhen,
    });
  }

  createCustomField<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    name: string,
    component: FC<Omit<CustomProps<FieldType>, 'component'>>,
    options: NodeWithChildrenOption<
      FieldType,
      PageState,
      PageProps,
      EffectResultType
    >,
    fieldUIConfig?: FieldUIConfig | undefined
  ): NodeInfoWithChildren<FieldType, PageState, PageProps, EffectResultType> {
    const { childrenUIConfig, childrenActions, childrenWhen, ...rest } =
      options;
    const curNode = this.doCreateField(
      id,
      name,
      rest,
      this.getCustomNodeUIConfig(component, fieldUIConfig)
    );
    return this.returnNodeInfoWithChildren(curNode, {
      childrenUIConfig,
      childrenActions,
      childrenWhen,
    });
  }
  protected handleRequiredConfig(
    fieldUIConfig: FieldUIConfig,
    required: boolean
  ): FieldUIConfig {
    fieldUIConfig.formItem = fieldUIConfig.formItem || {};
    /** 默认为 true */
    const userRequired = required ?? fieldUIConfig.formItem.required;
    fieldUIConfig.formItem.required = userRequired ? true : required;
    return fieldUIConfig;
  }

  createChildForm<
    FieldType = string,
    PageState = Record<string, any>,
    PageProps = Empty,
    EffectResultType = any
  >(
    id: string,
    options: NodeOption<FieldType, PageState, PageProps, EffectResultType> & {
      name?: string;
      childFormContext?: EffectKeys<PageState, PageProps>;
      childFormContainer: FC<
        ComponentProps<
          ChildFormContainerProps,
          ChildFormState,
          any,
          PageState,
          PageProps & DefaultPageProps<PageState>
        >
      >;
    },
    fieldUIConfig?: FieldUIConfig
  ): NodeInfo<FieldType, PageState, PageProps, EffectResultType> {
    const { childFormContext, childFormContainer, name, ...restOptions } = options;
    const curFieldUIConfig = fieldUIConfig || {};

    curFieldUIConfig.ui = curFieldUIConfig.ui || UI_COMPONENTS.CHILD_FORM;
    curFieldUIConfig.childForm = (curFieldUIConfig.childForm ||
      {}) as ChildFormBaseProps;
    curFieldUIConfig.formItem = curFieldUIConfig.formItem || {};
    curFieldUIConfig.formItem.validateTrigger =
      curFieldUIConfig.formItem?.validateTrigger || 'onBlur';
    curFieldUIConfig.childForm = {
      ...curFieldUIConfig.childForm,
      childFormContext: childFormContext as string[],
      childFormContainer,
    } as ChildFormBaseProps;

    return this.doCreateField(id, name || '', restOptions, curFieldUIConfig);
  }
}

export const nodeUtil = new NodeUtil();
