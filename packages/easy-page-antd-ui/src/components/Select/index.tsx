/* eslint-disable @typescript-eslint/no-explicit-any */
import { connector, useChildrenOptions } from '@easy-page/react-ui';
import { Select as AntdSelect } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { SelectBaseProps, SelectProps } from './interface';

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

    // 获得 appendChildren 中的选项
    const childrenOptions = useChildrenOptions({
      children: children || [],
      fieldValue: value.choosed,
      frameworkProps,
    });

    useEffect(() => {
      // childrenOptions 中的选项和 selectProps 中的选项合并
      const _options = childrenOptions.length > 0 ? childrenOptions : options;
      const curOptions = combineOptions
        ? [...childrenOptions, ...options]
        : _options;
      onChange({
        choosed: value.choosed,
        keyword: '',
        options: (curOptions as DefaultOptionType[]).concat(
          value.options || []
        ),
      });
    }, [childrenOptions.map((e) => e.value).join(',')]);

    const debounceSeach = debounce((keyword?: string) => {
      onChange({
        ...value,
        keyword: keyword,
      });
    }, 400);

    return (
      <AntdSelect
        value={value.choosed}
        // onChange={(val) => {
        // onChange?.({
        //   ...value,
        //   choosed: val,
        // });
        // }}
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
        {...(frameworkProps?.effectedResult || {})}
      ></AntdSelect>
    );
  })
);
