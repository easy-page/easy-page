import { toJson } from "@/common/libs"
import { FactorListFromBackend, FactorListSecondCategory, OperationFactorItem, FactorListResp } from "../interface"

export const prepareFactorsResult = (data: FactorListFromBackend) => {
  const doToJsonViewConfig = (data: FactorListSecondCategory<Omit<OperationFactorItem, 'viewConfig'> & {
    viewConfig: string
  }>[]) => {
    data.forEach(e => {
      if (e.list) {
        e.list = e.list.map(factor => ({ ...factor, viewConfig: toJson(factor.viewConfig) || {} }))
      }
    })
    return data
  }

  // 将 viewConfig 转化为 JSON
  if (data.poi?.labelList) {
    data.poi.labelList = doToJsonViewConfig(data.poi.labelList)
  }
  if (data.sku?.labelList) {
    data.sku.labelList = doToJsonViewConfig(data.sku.labelList)
  }

  // 当因子下线时，若为：创建或者复制页面，过滤掉下线因子
  // 当因子下线时，若为：编辑或者查看页面，若因子已经被选择，则显示，否则，过滤掉下线因子

  return data as any as FactorListResp<OperationFactorItem>;
}
