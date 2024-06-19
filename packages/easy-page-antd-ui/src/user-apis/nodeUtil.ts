/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CommonNodeUtil,
  Empty,
  NodeInfo,
  NodeInfoWithChildren,
  NodeWithChildrenOption,
} from '@easy-page/react-ui';
import { FieldUIConfig } from '@easy-page/react-ui/interface';
import { UI_COMPONENTS } from '../common/constant';
import {
  ChildFormBaseProps,
} from '../components';
import { CreateChildFormOptions, CreateContainerOption, CustomComponent } from './interface';

class NodeUtil extends CommonNodeUtil {
  private getCustomNodeUIConfig(
    component: CustomComponent<any, any, any, any>,
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
    component: CustomComponent<FieldType, PageState, PageProps, EffectResultType>,
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
    component: CustomComponent<FieldType, PageState, PageProps, EffectResultType>,
    options?: CreateContainerOption<FieldType, PageState, PageProps, EffectResultType>
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
    component: CustomComponent<FieldType, PageState, PageProps, EffectResultType>,
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
    options: CreateChildFormOptions<FieldType, PageState, PageProps, EffectResultType>,
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
