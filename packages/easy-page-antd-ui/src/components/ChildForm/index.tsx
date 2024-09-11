/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * - Child Form
 * - 需要解决：
 *  - 父、子表单状态共享问题
 *  - 可创建多个子表单能力问题
 *  - 父、子表单联动监听问题
 *  - 父、子表单验证问题
 */

import {
  ComponentProps,
  FormUtil,
  ValidateOnChange,
  connector,
  getChangedKeys,
} from '@easy-page/react-ui';
import { reaction } from 'mobx';
import { EditableConfig } from '@easy-page/react-ui/interface';
import React, { FC, useEffect, useState } from 'react';
import { generateId } from './utils';
import { ChildFormItem } from './interface';
import { TriggerChangeSence } from '../../common/constant';

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
  disabled?: boolean;
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

  disabled?: boolean;
};

export type DisableOperations = ('add' | 'delete' | 'copy')[];

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

  /** 子表单的错误 */
  childFormErrors?: ChildFormValidateResult[];

  /** 子表单默认值，key: 为子表单 ID，value：为子表单默认值 */
  childFormDefaultValues?: Record<string, Record<string, any>>;

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

export type ChildFormValidateResult = {
  id: string;
  label: string;
  errors?: any;
};
export const validateAllChildForm = (
  value: ChildFormState,
  options: {
    onChange?: ValidateOnChange;
  }
): Promise<ChildFormValidateResult[]> => {
  const { childForms, formUtils } = value;
  const { onChange } = options;

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
  ).then((res) => {
    const hasError = res.find((e) => Boolean(e.errors));
    setTimeout(() => {
      /** 当 childform 为 0 个的时候，会触发 antd 验证超时，切换下生命周期 */
      if (hasError) {
        // 切换到对应错误 Tab
        onChange?.(
          {
            ...value,
            choosedItemId: hasError.id,
            childFormErrors: res.filter((e) => Boolean(e.errors)),
          },
          { validate: false }
        );
      } else if ((value.childFormErrors || []).length > 0) {
        // 如果之前有错误，现在清空
        onChange?.(
          {
            ...value,
            childFormErrors: [],
          },
          { validate: false }
        );
      }
    }, 0);
    return res;
  });
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
      if (nodeInfo.id === 'subActivity') {
        console.log('【设置】子活动 context');
      }

      const disposer = reaction(
        () => store?.getEffectedData(childFormContext || []),
        (args, preArgs) => {
          if (nodeInfo.id === 'subActivity') {
            console.log('【设置】更新子活动 context:', args, preArgs);
          }
          const changedKeys = getChangedKeys(args, preArgs);
          if (changedKeys.length === 0) {
            console.log('【设置】更新子活动 context:，无变化');
            return;
          }
          setChildFormContextData(args);
        }
      );

      return () => {
        if (nodeInfo.id === 'subActivity') {
          console.log('【设置】卸载子活动 context');
        }
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
          const val = {
            ...newVal,
            timestamp: new Date().getTime(),
          };
          store.debugger?.addOnChange(nodeInfo.id, val, {
            triggerSence: TriggerChangeSence.FromChildFormChange,
          });
          onChange(val);
        }}
        setChildFormRef={(formRef: FormUtil<any>, id: string) => {
          const curValue = store.getState(nodeInfo.id);
          console.log('set child form ref:', nodeInfo.id, curValue);
          const formUtils = curValue.formUtils || {};
          formUtils[id] = formRef;
          const val = {
            ...curValue,
            formUtils,
          };

          store.debugger?.addOnChange(nodeInfo.id, val, {
            triggerSence: TriggerChangeSence.FromChildFormRefChange,
          });
          onChange(val);
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
          const val = {
            ...value,
            childForms: newForms,
            formUtils,
            choosedItemId: newChoosedId,
          };
          store.debugger?.addOnChange(nodeInfo.id, val, {
            triggerSence: TriggerChangeSence.FromChildFormRemove,
          });
          onChange(val);
        }}
        onAdd={() => {
          const curValue = store.getState(nodeInfo.id) as ChildFormState;
          const { childForms } = curValue;
          const newId = generateId(childFormIdPrefix);
          const val = {
            ...curValue,
            childForms: [
              ...childForms,
              {
                id: newId,
                label: '',
              },
            ],
            choosedItemId: newId,
          };
          store.debugger?.addOnChange(nodeInfo.id, val, {
            triggerSence: TriggerChangeSence.FromChildFormRemove,
          });
          onChange(val);
          return newId;
        }}
        value={value}
        onChange={onChange}
        {...restProps}
      />
    );
  })
);

export * from './utils';
export * from './interface';
