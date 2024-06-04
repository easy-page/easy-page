/* eslint-disable @typescript-eslint/no-explicit-any */

import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  ComponentProps,
  EasyPageStore,
  SchemaNodeInfo,
  Validate,
  ValidateOnChange,
  connector,
} from '@easy-page/react-ui';
import { FormItemProps as AntdFormItemProps, Form, Tooltip } from 'antd';
import type { Rule } from 'antd/es/form';
import React, { useMemo } from 'react';
/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type BaseFormItemProps = AntdFormItemProps & {
  tooltip?: string | React.ReactNode;
  validateTrigger?: 'onChange' | 'onBlur';
  value?: any;
  /** 可以使用字段的上下文，来决定如何展示， 优先级：customExtra > extra > nodeInfo.desc */
  customExtra?: React.FC<Omit<FormItemProps, 'customExtra'>>;
  /** 可读模式下显示 */
  // customView?: React.FC<Omit<FormItemProps, 'customExtra'>>
  disabled?: boolean;
};
export type FormItemProps = ComponentProps<BaseFormItemProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    formItem?: BaseFormItemProps;
  }
}

const convertValidator = ({
  validate,
  validateTrigger,
  rules: userRule,
  defaultValues,
  store,
  nodeInfo,
}: {
  rules?: Rule[];
  validate?: Validate<any, any, any>;
  store: EasyPageStore<any, any>;
  nodeInfo: SchemaNodeInfo<Record<string, any>, Record<string, any>>;
  required?: boolean;
  defaultValues?: Record<string, any>;
  validateTrigger?: 'onChange' | 'onBlur';
  handleChange: ValidateOnChange;
}): Rule[] | undefined => {
  if (!validate) {
    return userRule;
  }

  const newRule: Rule = {
    validateTrigger: validateTrigger || 'onChange',
    async validator(
      rule: Rule,
      value: any,
      callback: (errorMsg?: string) => void
    ) {
      // console.log('aaa:', nodeInfo.id);
      /** 只传递副作用值 */
      const res = await validate?.({
        value,
        defaultValues: defaultValues || {},
        pageProps: store?.getPageProps(),
        pageState: store?.getAllState(),
        onChange(value, options) {},
      });
      if (!res.success) {
        throw Error(res.errorMsg);
      }
    },
  };

  if (Array.isArray(userRule)) {
    userRule.push(newRule);
    return userRule;
  }
  if (!userRule) {
    return [newRule];
  }
  return [userRule as Rule, newRule];
};

const getLabel = (options: {
  label: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
}) => {
  const { label, tooltip } = options;
  if (!tooltip) {
    return label;
  }
  const curTooltip =
    typeof tooltip === 'string' ? (
      <Tooltip style={{ display: 'inline' }} title={tooltip}>
        <QuestionCircleOutlined />
      </Tooltip>
    ) : (
      tooltip
    );
  return (
    <span>
      {label}&nbsp;{curTooltip}
    </span>
  );
};

const getFormItemDisabled = (
  options: Pick<FormItemProps, 'frameworkProps'> & { disabled?: boolean }
) => {
  const {
    frameworkProps: { store, nodeInfo },
    disabled,
  } = options;
  const { editable } = store.getPageProps() || {};
  if (editable === undefined) {
    return disabled;
  }
  if (typeof editable === 'boolean') {
    return !editable;
  } else {
    const { canEditKeys, canNotEditKeys } = editable;
    const { id } = nodeInfo;
    /** 在白名单中，允许编辑 */
    if (canEditKeys && canEditKeys.includes(id)) {
      return false;
    }
    /** 在黑名单中，不允许编辑 */
    if (canNotEditKeys && canNotEditKeys.includes(id)) {
      return true;
    }
    /** 只有黑名单时，不在黑名单中，则允许编辑 */
    if (!canEditKeys && canNotEditKeys) {
      return false;
    }
    /** 不在白名单中，也不在黑名单中，禁止编辑 */
    return true;
  }
};

/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const FormItem = connector(
  React.memo((props: FormItemProps) => {
    const {
      frameworkProps,
      children,
      rules,
      extra,
      customExtra,
      tooltip,
      required,
      validateTrigger,
      disabled,
      ...baseProps
    } = props;
    const {
      nodeInfo,
      effectedResult,
      effectedLoading,
      upt,
      store,
      getFormUtil,
    } = frameworkProps;

    const label = nodeInfo.name || baseProps.label;
    const extraText = extra || nodeInfo.desc;
    const customExtraText = customExtra
      ? customExtra({ frameworkProps, ...baseProps })
      : null;

    const childrenMemo = useMemo(() => {
      return React.Children.map(children as any, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const curFrameworkProps: any = {
          ...((child?.props as any)?.frameworkProps || {}),
          effectedLoading,
          effectedResult,
          upt,
        };
        const { frameworkProps: childFrameworkProps, ...restProps } =
          (child?.props || {}) as any;
        const childProps = {
          disabled: getFormItemDisabled({ frameworkProps, disabled }),
          ...(restProps || {}),
          frameworkProps: {
            ...childFrameworkProps,
            ...curFrameworkProps,
          },
        };
        return React.cloneElement(child, childProps);
      });
    }, [effectedLoading, effectedResult]);

    return (
      <Form.Item
        {...baseProps}
        label={getLabel({ label, tooltip })}
        extra={customExtraText || extraText}
        required={required}
        validateTrigger={validateTrigger}
        rules={convertValidator({
          required,
          rules,
          defaultValues: store.getDefaultValues(),
          nodeInfo,
          validate: nodeInfo.validate,
          validateTrigger,
          store,
          handleChange: (value, options) => {
            const formUtil = getFormUtil?.();
            if (options?.asValueObj) {
              /** 未遇场景，暂未测试过，有再说 */
              formUtil?.setFieldsValue(value);
            } else {
              formUtil?.setField(nodeInfo.id, value, {
                validate: options?.validate,
              });
            }
          },
        })}
        name={nodeInfo.id}
      >
        {childrenMemo}
      </Form.Item>
    );
  })
);
