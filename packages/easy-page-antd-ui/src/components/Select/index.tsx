/* eslint-disable @typescript-eslint/no-explicit-any */
import { connector, useChildrenOptions } from '@easy-page/react-ui';
import { Select as AntdSelect } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { debounce } from 'lodash';
import React, { useContext, useEffect } from 'react';
import { SelectBaseProps, SelectProps } from './interface';
import { FormItemInputContext } from 'antd/es/form/context';
import classNames from 'classnames';

export type {
  SelectState,
  SelectBaseProps,
  SelectEffectType,
  SelectProps,
} from './interface';

export { searchAction } from './searchAction';

declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    select?: SelectBaseProps;
  }
}

/**
 * - 选项来源于和优先级：appendChildren 中的 > options 配置里的 、副作用返回的（value 上的）
 */
export const Select = connector(
  React.memo((props: SelectProps) => {
    const {
      frameworkProps,
      children,
      value,
      onChange,
      handleChange,
      mode,
      options = [],
      combineOptions,
      loading,
      ...restProps
    } = props;

    const { getFormUtil, nodeInfo } = frameworkProps;

    // 获得 appendChildren 中的选项
    const childrenOptions = useChildrenOptions({
      children: children || [],
      fieldValue: value.choosed,
      frameworkProps,
    });

    /**
     * - 如果有副作用更新 options 则副作用的执行在下方：useEffect 之后，因此不会合并下方的结果
     * - 如果没有副作用，只有 options 和 appendChildren，则会走下方的 useEffect
     */

    useEffect(() => {
      // childrenOptions 中的选项和 selectProps 中的选项合并
      const _options = childrenOptions.length > 0 ? childrenOptions : options;
      const curOptions = combineOptions
        ? [...childrenOptions, ...options]
        : _options;
      if (curOptions.length > 0) {
        const formUtil = getFormUtil?.();
        // 有选项时才更新，一般是静态的，所以不会动态变化了，如果有变化，走副作用更新即可
        formUtil?.setField(
          nodeInfo.id,
          {
            choosed: value.choosed,
            keyword: '',
            options: (curOptions as DefaultOptionType[]).concat(
              value.options || []
            ),
          },
          { validate: false }
        );
      }
    }, [childrenOptions.map((e) => e.value).join(',')]);

    const debounceSeach = debounce((keyword?: string) => {
      onChange({
        ...value,
        keyword: keyword,
      });
    }, 400);

    // const { status } = useContext(FormItemInputContext);
    // const hasError = status === 'error';
    return (
      <AntdSelect
        value={value.choosed}
        onChange={(val) => {
          if (!handleChange) {
            onChange?.({
              ...value,
              choosed: val,
            });
            return;
          }
          handleChange({
            onChange,
            preValue: value,
            value: val,
            frameworkProps: props.frameworkProps,
          });
        }}
        mode={
          mode || frameworkProps.nodeInfo.childrenRelation === 'single'
            ? undefined
            : 'multiple'
        }
        onSearch={(val) => debounceSeach(val)}
        loading={frameworkProps?.effectedLoading || loading}
        options={(value.options || []).map((e) => ({ ...e }))}
        {...restProps}
        // className={classNames(restProps.className || '', {
        //   'select-status-error': hasError,
        // })}
        {...(frameworkProps?.effectedResult || {})}
      ></AntdSelect>
    );
  })
);
