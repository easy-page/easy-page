export enum SkuActApplyListColumnId {
  SubActId = 'subActId', // 子活动 ID
  SubActName = 'subActName', // 子活动名称
  SkuName = 'skuName', // 商品名称
  SkuId = 'skuId', // SKUID
  // SkuCode = 'skuCode', // SKU 码
  // Upc = 'upc',
  Price = 'price', // 商品原价（元）
  // SupplyPrice = 'supplyPrice', // 供货价（元）
  Charge = 'charge', // 补贴分担
  ActPrice = 'actPrice', // 活动价（元）
  Discount = 'discount', // 折扣率（折）
  PoiName = 'poiName',
  ActStock = 'actStock',
  TargetUser = 'targetUser',
  PoiBrandName = 'poiBrandName',
  // PoiBrandId = 'poiBrandId',
  PoiBrandOpMis = 'poiBrandOpMis', // 品牌负责人
  City = 'cityName', // 所属城市
  ApplyTime = 'applyTime', // 报名提交时间
  Status = 'status', // 报名状态
  // Remark = 'remark',
  // Updater = 'updater', // 最后更新时间/更新人
}

export enum BrandActApplyListColumnId {
  PoiBrandId = 'poiBrandId',
  PoiBrandName = 'poiBrandName',
  PoiOwnerOrBrandOwner = 'poiOwnerOrBrandOwner',
  ApprovedPoiCount = 'approvedPoiCount',
}
