import { TableColumnProps } from 'antd';
import { OperationMenu, OperationsOptions } from './OperationMenu';

export const getOperationColumnInfo = <T = Record<string, any>, Sence = string>(
  options: OperationsOptions<T, Sence>,
): TableColumnProps<T> => {
  const { columnProps } = options;
  return {
    ...columnProps,
    render: (val, record) => {
      return <OperationMenu record={record} {...options} />;
    },
  };
};

export * from './base';
