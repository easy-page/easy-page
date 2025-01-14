export enum PoiActApplyListColumnId {
  PoiId = 'poiId',
  PoiName = 'poiName',
  PoiBrandId = 'poiBrandId',
  PoiBrandName = 'poiBrandName',
  PoiOwnerOrBrandOwner = 'poiOwnerOrBrandOwner',
  City = 'cityName',
  ChargeSidePoi = 'chargeSidePoi',
  /** 差异化商补 */
  ChargeSidePoiy = 'chargeSidePoiy',
  /** 差异化B补 */
  ChargeSideMtb = 'chargeSideMtb',
  /** 差异化代补 */
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
