export enum ActTypeEnum {
  /** 神会员活动 */
  SHEN_HUI_YUAN = 'shen_hui_yuan', // 神会员活动
  /** 联盟红包 */
  UNION_COUPON = 'union_coupon',
  /** 单品牌券(共补) */
  SINGLE_BRAND_COUPON_UNITE = 'single_brand_coupon_unite',
  /** 品牌联合券(共补) */
  UNITE_BRAND_COUPON_UNITE = 'unite_brand_coupon_unite',
  /** 单品牌券(全品补) */
  SINGLE_BRAND_COUPON_ENTIRE = 'single_brand_coupon_entire',
  /** 品牌联合券(全品补) */
  UNITE_BRAND_COUPON_ENTIRE = 'unite_brand_coupon_entire',
  /** 闪购-折扣 */
  DISCOUNT_NON_BRAND = 'discount_non_brand',
  /** 商品券 */
  PRODUCT_COUPON = 'product_coupon',
  /** 神价 */
  GOD_PRICE = 'god_price',
  /** 新客爆品 */
  NEW_CUSTOMER_EXPLOSIVE_PRODUCT = 'new_customer_explosive_product',
  /** 爆品活动 */
  EXPLOSIVE_PRODUCT_PROMOTION = 'explosive_product_promotion',
  /** x 元自提 */
  X_YUAN_PICKUP = 'x_yuan_pickup',
  /** 拼团招商 */
  TEAM_BUYING = 'team_buying',
  /** 集合店招商 */
  COLLECT_STORE = 'collect_store',

  /** 外卖-折扣活动 */
  WM_DISCOUNT = 'wm_discount',

  /** 歪马送酒-资源位招商 */
  WAIMA_SOURCE = 'waima_source',
  //${{appendActType}}

  /** 闪购-神券招商 */
  SG_SHEN_QUAN = 'sg_shen_quan',
}

export type TemplateIdInfo = {
  /** 线上模板 ID */
  prod: number
  /** 测试环境模板 ID */
  test: number
  bizLine: number
  /** 模板名称 */
  name: string
}

/**
 * 老的活动类型枚举，目前只泳道了： SKU_BLOCKBUSTER、SKU_DISCOUNT
 */
export enum PolicyTypeEnum {
  /** 「外卖」满减 | 「闪购」店铺满减 */
  POI_DISCOUNT = 2,
  /** 「外卖」折扣菜 | 「闪购」折扣活动 */
  SKU_DISCOUNT = 17,
  /** 「外卖」提报爆品 | 「闪购」提报爆品 */
  SKU_BLOCKBUSTER = 56,
  /** 非优惠 */
  NO_DISCOUNT = 0,
  /** 「外卖」商家券 | 「闪购」店内商家券 */
  POI_COUPON = -2,
  /** 商家红包 */
  POI_RED_PACKAGE = -3,
  /** 满减券包 */
  POI_COUPON_PACKAGE = -4,
  /** 「外卖」减配送费 | 「闪购」立减运费 */
  POI_DELIVERY_FEE_REDUCE = 25,
  /** 「外卖」满减配送费 | 「闪购」满减运费 */
  POI_DELIVERY_FEE_REDUCE_4_THRESHOLD = 30,
  /** 满赠 */
  POI_FULL_GET = 5,
  /** 新客爆品(外卖) */
  SKU_NC_DISCOUNT = 41,
  /** 老客爆品(外卖) */
  SKU_OC_DISCOUNT = 64,
  /** 天天神券 */
  VALUE_UNION = 93,
  /** 赏金神券 */
  CHARGE_COUPON = 102,
  /** 智能满减[已废弃] */
  POI_AUTO_FULLCUT = -10,
  /** 爆品砍价 */
  SKU_DISCOUNT_BARGAIN = 10000,
  /** 会员折扣菜 */
  MEMBER_DISCOUNT_FOOD = 65,
  /** 第二份半价 */
  SKU_SECOND_HALF = 20,
  /** 「外卖」店外商家券 */
  OUTER_POI_COUPON = 84,
  /** 「闪购」店外商家券 */
  ACTIVITY_GROUP = 118,
  /** 店外商品券 */
  OUT_PRODUCT_COUPON = 119,
  /** 限时秒杀 */
  CHANNEL_SECOND_KILL_SALE_FOOD_TYPE = 76,
  /** 起送价 */
  STARTING_PRICE = 7000,
  /** 店外配送券 */
  ACTIVITY_DELIVERY_COUPON = 107,
  /** 社群拉新 */
  WM_COMMUNITY = 500,
  /** 商品券售卖 */
  SKU_COUPON_PACKAGE = 125,
}
