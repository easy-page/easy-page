import { nodeUtil } from '@easy-page/antd-ui'
import { StockRequestEnum } from '@/common/apis/saveAct/interfaces/stockReq'
import {
  Content4Shy,
  ISubActivity,
  OpTypeEnum,
  SubsidyLevelEnum,
} from '@/common'
import { RangeState } from '@/common/fields'
import { commonStockField } from './commonStock'
import { StockReqFormState, StockReqFormProps } from '../interface'
import { appendToContent4Shy, getFromContent4Shy } from '../../utils'

export const expandLevel = commonStockField(
  StockRequestEnum.Stock4Expand,
  '膨胀档位每日库存'
)

export const unionCouponExpandLevel = nodeUtil.extends<
  RangeState,
  StockReqFormState,
  StockReqFormProps
>(commonStockField(StockRequestEnum.Stock4Expand, '每日库存要求'), {
  when() {
    return {
      effectedKeys: ['subsidyRule'],
      show({ effectedData }) {
        const subsidyRule = effectedData['subsidyRule']
        const hasBaseLevel = Boolean(
          (subsidyRule?.subsidyRule || []).find(
            (x) => x.scene === SubsidyLevelEnum.OutSite
          )
        )
        return Boolean(hasBaseLevel)
      },
    }
  },
  preprocess() {
    return ({ defaultValues }) => {
      const stockRule =
        getFromContent4Shy<Content4Shy['stockRule']>(
          'stockRule',
          defaultValues
        ) || []
      const OutSiteStock = (stockRule || []).find(
        (e) => e.key === StockRequestEnum.stock4OutSite
      )
      return {
        min: OutSiteStock?.minValue || '',
        max: OutSiteStock?.maxValue || '',
      }
    }
  },
  postprocess() {
    return ({ value, processedFormData }) => {
      const processedSubActs = processedFormData.subActivity || []
      const stockRule = processedSubActs?.[0]?.content4Shy?.stockRule || []
      stockRule.push({
        key: StockRequestEnum.stock4OutSite,
        opt: OpTypeEnum.CLOSE_INTERVAL,
        minValue: value?.min,
        maxValue: value?.max,
      })
      const subAct: ISubActivity[] = appendToContent4Shy(processedFormData, {
        stockRule,
      })
      return {
        subActivity: subAct,
      }
    }
  },
  required: true,
})

export const shenquanExpandLevel = nodeUtil.extends<
  RangeState,
  StockReqFormState,
  StockReqFormProps
>(expandLevel, {
  when() {
    return {
      effectedKeys: ['subsidyRule'],
      show({ effectedData }) {
        const subsidyRule = effectedData['subsidyRule']
        const hasBaseLevel = Boolean(
          (subsidyRule?.subsidyRule || []).find(
            (x) => x.scene === SubsidyLevelEnum.Expand
          )
        )
        return Boolean(hasBaseLevel)
      },
    }
  },
})
