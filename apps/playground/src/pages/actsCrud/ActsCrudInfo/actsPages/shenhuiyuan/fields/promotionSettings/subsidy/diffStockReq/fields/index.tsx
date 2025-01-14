import { nodeUtil } from '@easy-page/antd-ui'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { PoiTypeEnum } from '@/common'
import { stockRequest } from './commonStockRequset'
import { RangeState } from '@/common/fields'
import { StockRequestEnum } from '@/common/apis/saveAct/interfaces/stockReq'

// 商家每日库存
const merchantStockDaily = stockRequest(StockRequestEnum.Stock4PoiDaily)

// BD每日库存
const bdStockReq = stockRequest(StockRequestEnum.Stock4MtbDaily)

// 代理商CM每日库存
const cmSubsidyReq = nodeUtil.extends<
  RangeState,
  CommonActCrudFormState,
  CommonActCrudFormProps
>(stockRequest(StockRequestEnum.Stock4AgentDaily), {
  when() {
    return {
      effectedKeys: ['poiType'],
      show({ effectedData }) {
        return effectedData['poiType'] !== PoiTypeEnum.Direct
      },
    }
  },
})

export { merchantStockDaily, bdStockReq, cmSubsidyReq }
