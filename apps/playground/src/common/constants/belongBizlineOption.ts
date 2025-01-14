export enum BelongBizline {
  WaimaiKA = 'waimaiKA',
  WaimaiCKA = 'waimaiCKA',
  WaimaiXiaoYan = 'waimaiXiaoYan',
  WaimaiBaiLing = 'waimaiBailing',
  WaimaiDaiLiShang = 'waimaiDaiLiShang',
}

export const BelongBizlineText: Record<BelongBizline, string> = {
  [BelongBizline.WaimaiKA]: "外卖 KA",
  [BelongBizline.WaimaiCKA]: "外卖 CKA",
  [BelongBizline.WaimaiXiaoYan]: "外卖校园",
  [BelongBizline.WaimaiBaiLing]: "外卖白领",
  [BelongBizline.WaimaiDaiLiShang]: "外卖代理商"
}