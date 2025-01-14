// 爆品信息
export type NcContentList = {
  id?: number
  type: string
  mtPn?: string
  keyList: {
    key: string
    opt: string
    minValue: any
    mtPn?: string
  }[]
}