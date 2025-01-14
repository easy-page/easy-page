import { StockRequestEnum } from '@/common/apis/saveAct/interfaces/stockReq'
import { commonStockField } from './commonStock'

export const expandLevel = commonStockField(
  StockRequestEnum.Stock4Expand,
  '膨胀档位每日库存'
)
