/**
 * 业务线
 */
export enum BizLineEnum {
  WaiMai = 0, // 外卖
  ShanGou = 1, // 闪购
  WaimaSongJiu = 190 // 歪马送酒
}

export const BIZ_TYPE_MAP = {
  [BizLineEnum.WaiMai]: '外卖',
  [BizLineEnum.ShanGou]: '闪购',
  [BizLineEnum.WaimaSongJiu]: '歪马送酒'
}
