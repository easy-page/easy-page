import { ChildFormState, nodeUtil } from '@easy-page/antd-ui'
import { stockReq } from './common'
import { CommonActCrudFormState } from '../../interface'
import { StockReqFormState } from './interface'
import { shenquanStockFormInfo } from './shenquanFormInfo'

export const shenquanStockReq = nodeUtil.extends<
  ChildFormState<StockReqFormState>,
  CommonActCrudFormState
>(
  stockReq({
    formInfo: shenquanStockFormInfo,
  }),
  {
    when() {
      return {
        effectedKeys: ['subsidyRule'],
        show({ effectedData }) {
          const subsidyRule = effectedData['subsidyRule']
          return Boolean(subsidyRule)
        },
      }
    },
  }
)
