/** 上传excel 文件信息 */
export type ActRuleExcelInfo = {
  url: string
  dataId: number
  fileName: string
}

export type PnInfo = {
  pn: string // pn id
  pnName: string // pn 名称
  balance: number // pn 预算余额
}

/** 活动创建中，上传文件后返回结果类型 */
export type IActRuleList<T> = {
  allPass: boolean
  actRule?: ActRuleExcelInfo // 上传文件信息，仅在：allpass = true 时候存在
  actStashList: T[] // 表格数据
  pn: PnInfo[] // 上传excel中的PN信息
  uploadError?: string[]
}