import { BizLineEnum, ConfigBizline } from '@/common'

export const getZsptBizLine = (bizLine: ConfigBizline) => {
  if (bizLine === ConfigBizline.ShanGou) {
    return BizLineEnum.ShanGou
  }
  if (bizLine === ConfigBizline.Waimai) {
    return BizLineEnum.WaiMai
  }
  if (bizLine === ConfigBizline.WaiMaSongJiu) {
    return BizLineEnum.WaimaSongJiu
  }
  return BizLineEnum.WaiMai
}
