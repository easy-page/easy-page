/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, Empty } from "@easy-page/react-ui";
import type {
  SelectProps as AntdSelectProps,
  DefaultOptionType,
} from 'antd/es/select';

/**
 * - 因为下拉框的选项即可能需要做一些联动显示，有可能需要搜索，也可能有副作用
 * - 因此总体放在状态上比较好。
 * - T 为选择的选项 ID
 * - V 为选项额外的信息内容
 */
export type SelectState<T, V = Empty> = {
  options?: (DefaultOptionType & V)[];

  choosed: T;
  /** 搜索条件 */
  keyword?: string;
};



export type SelectEffectType<V = Empty> = Omit<
  AntdSelectProps<SelectState<any, V>>,
  'options'
>;

export type SelectBaseProps = Omit<
  AntdSelectProps<SelectState<any, any>>,
  'children'
> & {
  children?: React.ReactNode[];
  /** 如果设置，将合并：appendChildren 中的和配置中的 options，默认不合并，优先显示：appendChildren 中的选项 */
  combineOptions?: boolean;
  /** 自定义 onChange 处理 onChange */
  handleChange?: (options: {
    onChange: (value: SelectState<any, any>) => void;
    /** 当前最新值 */
    value: AntdSelectProps['value'];
    /** 上一次的值 */
    preValue: AntdSelectProps['value'];
    frameworkProps: SelectProps['frameworkProps'];
  }) => void;
};

export type SelectProps = ComponentProps<
  SelectBaseProps,
  SelectState<any, any>,
  SelectEffectType
>;