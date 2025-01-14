export enum TargetUserTypeEnum {
  /** 全部用户 */
  ALL = 0,
  /** 门店新客 */
  SHOP_NEW_CUSTOMER = 1,
  /** 门店新老客 */
  SHOP_NEWOROLD_CUSTOMER = 2,
  /** 门店老客 */
  SHOP_OLD_CUSTOMER = 3,
  /** 选人服务 */
  CHOOSE_SOMEONE = 5,
  /** 闪购品牌新客 */
  SG_BRAND_NEW_CUSTOMER = 6,
  /** 平台新客 */
  PLATFORM_NEW_CUSTOMER = 7,
  /** 沉流用户 */
  ChenliuUsers = 8,
  /** 闪购老客 */
  SG_OLD_CUSTOMER = 101,
  /** 闪购新客 */
  SG_NEW_CUSTOMER = 102,
  /** 闪购新客-运营位下单新客 */
  SG_NEW_CUSTOMER_OPERATION_ORDER = 10201,
}

export const TargetUserTypeDesc = {
  [TargetUserTypeEnum.ALL]: '全部用户',
  [TargetUserTypeEnum.SHOP_NEW_CUSTOMER]: '门店新客',
  [TargetUserTypeEnum.SHOP_NEWOROLD_CUSTOMER]: '门店新老客',
  [TargetUserTypeEnum.SHOP_OLD_CUSTOMER]: '门店老客',
  [TargetUserTypeEnum.CHOOSE_SOMEONE]: '选人服务',
  [TargetUserTypeEnum.SG_BRAND_NEW_CUSTOMER]: '闪购品牌新客',
  [TargetUserTypeEnum.PLATFORM_NEW_CUSTOMER]: '平台新客',
  [TargetUserTypeEnum.SG_OLD_CUSTOMER]: '闪购老客',
  [TargetUserTypeEnum.SG_NEW_CUSTOMER]: '闪购新客',
  [TargetUserTypeEnum.SG_NEW_CUSTOMER_OPERATION_ORDER]: '运营位下单新客',
  [TargetUserTypeEnum.ChenliuUsers]: '沉流用户',
}
