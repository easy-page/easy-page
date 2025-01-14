import { TablePaginationConfig } from 'antd'
import type { ListModel } from '../models/base/list'

export type GetTablePageinationConfigOption = {
  pageNo: number
  pagination: Omit<
    TablePaginationConfig,
    'current' | 'onShowSizeChange' | 'onChange' | 'total'
  >
  model: ListModel<any, any, Record<string, string>>
  total: number
}
export const getTablePageinationConfig = ({
  pageNo,
  total,
  pagination,
  model,
}: GetTablePageinationConfigOption): TablePaginationConfig => {
  return {
    current: pageNo,
    position: ['bottomCenter'],
    showQuickJumper: true,
    showSizeChanger: true,
    total,
    pageSizeOptions: [20, 30, 50],
    showTotal(total) {
      return `共${total}条`
    },
    // 切换页码不对
    onShowSizeChange(current, size) {
      model.changePage({ pageNo: current, pageSize: size })
    },
    onChange(page, pageSize) {
      model.changePage({ pageNo: page, pageSize })
    },
    ...pagination,
  }
}
