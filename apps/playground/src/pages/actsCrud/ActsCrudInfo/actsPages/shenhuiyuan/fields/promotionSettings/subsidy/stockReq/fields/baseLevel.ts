import { StockRequestEnum } from '@/common/apis/saveAct/interfaces/stockReq'
import { commonStockField } from './commonStock'

export const baseLevel = commonStockField(
  StockRequestEnum.Stock4Base,
  '基础档位每日库存'
)
