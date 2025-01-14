export enum PoiActApplyListColumnId {
  PoiId = 'poiId',
  PoiName = 'poiName',
  PoiBrandId = 'poiBrandId',
  PoiBrandName = 'poiBrandName',
  PoiOwnerOrBrandOwner = 'poiOwnerOrBrandOwner',
  City = 'cityName',
  ChargeSidePoi = 'chargeSidePoi',
  ChargeSidePoiy = 'chargeSidePoiy',
  ChargeSideMtb = 'chargeSideMtb',
  ChargeSideAgent = 'chargeSideAgent',
  // Budget4PoiDaily = 'budget4PoiDaily',
  // Budget4MtbDaily = 'budget4MtbDaily',
  // Budget4AgentDaily = 'budget4AgentDaily',
  ApplyTime = 'applyTime',
  // Status = 'status',
  StatusDesc = 'statusDesc',
}

export enum BrandActApplyListColumnId {
  PoiBrandId = 'poiBrandId',
  PoiBrandName = 'poiBrandName',
  PoiOwnerOrBrandOwner = 'poiOwnerOrBrandOwner',
  ApprovedPoiCount = 'approvedPoiCount',
}

// 歪马报名结果页  供应商报名结果
export enum ResourceActApplyListColumnId {
  InviteTargetId = 'inviteTargetId', // 供应商id
  SupplierName = 'supplierName', // 供应商名称
  ResourceName = 'resourceName', // 资源位名称
  MaterialInfo = 'materialInfo', //素材
  SkuCodes = 'skuCodes',
  StatusDesc = 'statusDesc', // 供应商报名状态描述
  ApplyTime = 'applyTime' // 供应商报名时间
}

// 品类运营确认结果
export enum ResourceSkuActApplyListColumnId {
  ResourceName = 'resourceName', // 资源位名称
  SkuCodes = 'skuCodes', // sku码
  SkuUpdateTime = 'skuUpdateTime' // sku上传时间
}
