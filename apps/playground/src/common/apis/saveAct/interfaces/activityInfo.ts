import {
  ActivityStatusEnum,
  BelongBizline,
  PoiTypeEnum,
} from '@/common/constants'
import { PromotionTime } from './promotionTime'

export interface ResourceInfo {
  resourceId: number
  resourceName: string
  materialType: string
  needMaterial: number // 通常这里可以用 boolean，但根据示例保持为 number
  materialRule: string
  cityInfo: string
  startTime: number // 假设这是一个时间戳
  endTime: number // 假设这是一个时间戳
  // targetBrand: {
  //   id: number | string // 根据实际情况，id 可以是 number 或 string
  //   name: string
  // }
  targetBrand: string
  needSku: number // 通常这里可以用 boolean，但根据示例保持为 number
  skuCodes: string
}

export interface ActivityInfo {
  // 提报活动ID, 编辑提报活动时必填
  id: number
  // 邀请门店类型，详见枚举
  poiType: PoiTypeEnum
  // 补贴类型，详见枚举
  chargeFlowType: string[]
  // 提报活动名称
  name: string
  // 活动时间
  promotionTime: PromotionTime
  // 报名截止时间
  endTime: number
  // 活动简介
  brief: string
  // 活动规则
  ruleDesc: string
  // 是否必报活动
  isNeedApply: boolean
  // 活动状态
  status: ActivityStatusEnum
  // 所属业务
  serviceType?: BelongBizline
  // 结算总额
  totalPrice?: string
  // 提报流程
  confirmTime?: {
    skuAdmin: {
      startTime: number
      endTime: number
    }
    purchaseManager: {
      startTime: number
      endTime: number
    }
    supplier: {
      startTime: number
      endTime: number
    }
  }
  // 资源位信息
  resourceInfo?: ResourceInfo[]
  // 合作运营信息
  skuAdmin: string // 品类运营mis号
  purchaseManager: string // 采购mis号
}
