/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * - Child Form
 * - 需要解决：
 *  - 父、子表单状态共享问题
 *  - 可创建多个子表单能力问题
 *  - 父、子表单联动监听问题
 *  - 父、子表单验证问题
 */

import { ComponentProps, FormUtil, connector } from '@easy-page/react-ui';
import { reaction } from 'mobx';
import { EditableConfig } from '@easy-page/react-ui/interface';
import React, { FC, useEffect, useState } from 'react';

export type AddComponentProps = {
  /** 当前表单 ID */
  childFormItem: ChildFormItem;
};

export type AddComponent = FC<ComponentProps<AddComponentProps, any>>;

export type ChildFormContainerProps = {
  /** 如果传递了 options, 则更新当前 Tab 信息 */
  onChildFormChanged: (options?: {
    childForm: ChildFormItem;
    idx: number;
  }) => void;
  onAdd: () => string; // 返回添加的表单 Id
  onRemove: (id: string) => void;
  /** 添加 子表单 REF */
  setChildFormRef: (formRef: FormUtil<any>, id: string) => void;
  childFormContextData: Record<string, any>;
};
export type ChildFormBaseProps = {
  /** 子表单依赖的上下文 */
  childFormContext: string[];
  /** 子表单容器 */
  childFormContainer: FC<ComponentProps<ChildFormContainerProps, any>>;
  childFormIdPrefix: string;
};

export type DisableOperations = ('add' | 'delete' | 'copy')[];

export type ChildFormItem = {
  /** 每个 Form 唯一 ID */
  id: string;
  /** Label 标题 */
  label: string;
  icon?: React.ReactNode;
};

export interface ChildFormState<FormData = Record<string, any>>
  extends BaseChildFormState<FormData> {
  [key: string]: any;
}

interface BaseChildFormState<FormData = Record<string, any>> {
  childForms: ChildFormItem[];
  /** 当前选中的 MenuItem 的 ID */
  choosedItemId: string;
  editable?: EditableConfig<FormData>;
  /** 禁用哪些操作 */
  disableOperations?: DisableOperations;
  /** 存储子表单的 formUtils，用于数据处理，key 为 choosedItemId 或者是 ChildFormItem['id'] */
  formUtils?: Record<string, FormUtil<FormData>>;

  /** 用于通知外界，此表单内部发生变化 */
  timestamp?: number;

  [key: string]: any;
}

/** 用户配置的属性 */
export type UserChildFormConfigProps = Omit<
  ChildFormBaseProps,
  'childFormContext' | 'childFormContainer'
>;

declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    childForm?: UserChildFormConfigProps;
  }
}

export type ChildFormProps = ComponentProps<ChildFormBaseProps, ChildFormState>;

export const generateId = (prefix: string) => {
  return prefix + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

export type ChildFormValidateResult = {
  id: string;
  label: string;
  errors?: any;
};
export const validateAllChildForm = (
  value: ChildFormState
): Promise<ChildFormValidateResult[]> => {
  const { childForms, formUtils } = value;
  return Promise.all(
    childForms.map(async (e) => {
      const util = formUtils?.[e.id];
      try {
        await util?.validateVisibleFields?.();
        return { id: e.id, label: e.label };
      } catch (error) {
        return {
          id: e.id,
          label: e.label,
          errors: error,
        };
      }
    })
  );
};

export const ChildForm = connector(
  React.memo((props: ChildFormProps) => {
    const {
      childFormContainer: ChildFormContainer,
      childFormContext,
      value,
      childFormIdPrefix,
      onChange,
      ...restProps
    } = props;
    const { store, nodeInfo } = restProps.frameworkProps;
    const [childFormContextData, setChildFormContextData] = useState<
      Record<string, any>
    >({});
    useEffect(() => {
      setChildFormContextData(store?.getEffectedData(childFormContext || []));

      const disposer = reaction(
        () => store?.getEffectedData(childFormContext || []),
        (args, preArgs) => {
          setChildFormContextData(args);
        }
      );

      return () => {
        disposer?.();
        onChange({
          ...value,
          formUtils: {},
        });
      };
    }, []);

    return (
      <ChildFormContainer
        onChildFormChanged={(options) => {
          const newVal = { ...(store.getState(nodeInfo.id) || {}) };
          if (options && newVal.childForms[options.idx]) {
            newVal.childForms[options.idx] = options.childForm;
          }
          onChange({
            ...newVal,
            timestamp: new Date().getTime(),
          });
        }}
        setChildFormRef={(formRef: FormUtil<any>, id: string) => {
          const curValue = store.getState(nodeInfo.id);
          const formUtils = curValue.formUtils || {};
          formUtils[id] = formRef;
          console.log('setChildFormRef:', Object.keys(formUtils), id);
          onChange({
            ...value,
            formUtils,
          });
        }}
        childFormContextData={childFormContextData}
        onRemove={(id) => {
          const curValue = store.getState(nodeInfo.id);
          const {
            childForms,
            formUtils = {},
            choosedItemId,
          } = curValue as ChildFormState;
          let deleteIdx = -1;
          const newForms = childForms.filter((e, idx) => {
            const isDeleteRecord = e.id === id;
            if (isDeleteRecord) {
              deleteIdx = idx;
            }
            return !isDeleteRecord;
          });
          const newChoosedId =
            choosedItemId === id
              ? newForms[deleteIdx - 1 < 0 ? 0 : deleteIdx - 1]?.id
              : choosedItemId;
          delete formUtils[id];
          onChange({
            ...value,
            childForms: newForms,
            formUtils,
            choosedItemId: newChoosedId,
          });
        }}
        onAdd={() => {
          const curValue = store.getState(nodeInfo.id) as ChildFormState;
          const { childForms } = curValue;
          const newId = generateId(childFormIdPrefix);
          onChange({
            ...value,
            childForms: [
              ...childForms,
              {
                id: newId,
                label: '',
              },
            ],
            choosedItemId: newId,
          });
          return newId;
        }}
        value={value}
        onChange={onChange}
        {...restProps}
      />
    );
  })
);
