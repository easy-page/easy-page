import { GetSubsidyRule4GroupRes } from '../../getSubsidyRule4Group'
import { Content4Shy } from './content4Shy'
import { PoiBuildProduct } from './PoiBuildProduct'
import { PromotionRuleInfo } from './promotionRuleInfo'
import { Qualify } from './qualify'

export interface ISubActivity {
  // 子活动ID
  id?: number
  // 子活动名称(子活动名称)
  name: string
  // 子活动顺序
  order: number
  // 报名资质 一期可不传
  qualify?: Qualify
  // 报名档位数量限制
  validationRule: {
    enterMin: number // 最小档位数量
    enterMax: number // 最大档位数量, -1 不限
    /** 可报名商品数量 */
    skuLimit?: number
  }
  // 优惠规则(招商内容)
  contentList: PromotionRuleInfo[]
  content4Shy?: Content4Shy
  subsidyRule4Group?: GetSubsidyRule4GroupRes
  poiBuildProduct?: PoiBuildProduct
  /** 用于前端判断，在提交前去掉 */
  openGuide?: boolean
}
