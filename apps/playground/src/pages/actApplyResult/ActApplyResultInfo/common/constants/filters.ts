/** 展示搜索条件 */
export enum SearchRuleId {
  SubActName = 'subActIds', // 子活动名称
  PoiName = 'poiName', // 门店名称
  PoiIds = 'poiIds', // 门店ID
  PoiBrandIds = 'poiBrandIds',
  SkuSetPoiId = 'skuSetPoiId', // 集合类门店 ID
  SkuSetBrandId = 'skuSetBrandId', // 集合类品牌 ID
  BrandIds = 'brandIds', // 业务品牌ID
  BrandName = 'poiBrandName', // 业务品牌ID
  CityIds = 'cityIds', // 所属城市
  ApplyType = 'applyType', // 报名状态
  Status = 'status', // 折扣菜里的报名状态 - 单门店类型活动使用
  SkuName = 'skuName', // 商品名称
  SkuIds = 'skuIds', // skuId
  Upc = 'upc', // Upc
  ApplyTime = 'applyTime', // 报名时间
  SubsidyLevel = 'scene', // 补贴类型
}
