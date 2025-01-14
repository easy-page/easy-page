import { StockRequestEnum } from '@/common/apis/saveAct/interfaces/stockReq'
import { commonStockField } from './commonStock'
import { nodeUtil } from '@easy-page/antd-ui'
import { RangeState } from '@/common/fields'
import { StockReqFormProps, StockReqFormState } from '../interface'
import { SubsidyLevelEnum } from '@/common'

export const baseLevel = commonStockField(
  StockRequestEnum.Stock4Base,
  '基础档位每日库存'
)

export const shenquanBaseLevel = nodeUtil.extends<
  RangeState,
  StockReqFormState,
  StockReqFormProps
>(baseLevel, {
  when() {
    return {
      effectedKeys: ['subsidyRule'],
      show({ effectedData }) {
        const subsidyRule = effectedData['subsidyRule']
        const hasBaseLevel = Boolean(
          (subsidyRule?.subsidyRule || []).find(
            (x) => x.scene === SubsidyLevelEnum.Base
          )
        )
        return Boolean(hasBaseLevel)
      },
    }
  },
})
