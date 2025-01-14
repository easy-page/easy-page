import { LimitInfo } from '@/common/apis/getSourceInfoList'

export enum RequirementTypeEnum {
  NotNeed = '0',
  Need = '1',
}

export const getTextMaterialRuleMsg = (limitInfo: LimitInfo) => {
  const returnMsg = []
  if (limitInfo.regular) {
    // if (limitInfo.regular === '.*') {
    //   returnMsg.push('接受中英文字符')
    // }
  }
  if (limitInfo.maxLength !== undefined) {
    if (limitInfo.maxLength === -1) {
      returnMsg.push(`字符数量不限`)
    } else {
      returnMsg.push(`最多不超过${limitInfo.maxLength}个字符`)
    }
  }
  return returnMsg.join('，')
}

export const getImageMaterialRuleMsg = (limitInfo: LimitInfo) => {
  const returnMsg = []
  if (limitInfo.wideLimit !== undefined) {
    if (limitInfo.wideLimit === -1) {
      returnMsg.push(`图片宽度不限`)
    } else {
      returnMsg.push(`图片宽度${limitInfo.wideLimit}`)
    }
  }
  if (limitInfo.highLimit !== undefined) {
    if (limitInfo.highLimit === -1) {
      returnMsg.push(`图片高度不限`)
    } else {
      returnMsg.push(`图片高度${limitInfo.highLimit}`)
    }
  }
  if (limitInfo.picSizeLimit !== undefined) {
    if (limitInfo.picSizeLimit === -1) {
      returnMsg.push(`图片大小不限`)
    } else {
      returnMsg.push(`大小不超过${limitInfo.picSizeLimit}kb`)
    }
  }
  if (
    Array.isArray(limitInfo.supportMediaTypeList) &&
    limitInfo.supportMediaTypeList.length > 0
  ) {
    returnMsg.push(`支持图片类型：${limitInfo.supportMediaTypeList.join('、')}`)
  }
  return returnMsg.join('，')
}
