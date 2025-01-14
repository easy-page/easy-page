import { OperationType } from "@/common/constants"
import { getOperationType } from "./getPlanAndActListParams"

export interface IOperationTypeValue {
  operationType: string | null
  isView: boolean
  isEdit: boolean
  isCopy: boolean
  isCreate: boolean
}


// 获取操作类型值
export const getOperationTypeValue = (): IOperationTypeValue => ({
  operationType: getOperationType(),
  isView: isView(),
  isEdit: isEdit(),
  isCopy: isCopy(),
  isCreate: isCreate(),
})
// 是否为查看
export const isView = (): boolean => {
  return getOperationType() === OperationType.VIEW
}
// 是否为新建
export const isCreate = () => {
  return getOperationType() === OperationType.CREATE
}
// 是否为编辑
export const isEdit = () => {
  return getOperationType() === OperationType.EDIT
}
// 是否为复制
export const isCopy = () => {
  return getOperationType() === OperationType.COPY
}



