import { Validate } from '@easy-page/antd-ui'
import { checkNumberInvalid, toNumber } from '@/common'
import { MerchantMaxSubsidyFormState } from '@/pages/plansCrud/planPages/createShenQuanPlan/fields/subPlanForm/interface'

export const sgShenquanValidateExpandLevelPrice: Validate<
  string,
  MerchantMaxSubsidyFormState
> = ({ value, pageState }) => {
  const errMsg = '必填，0~5000，支持一位小数。（不可为0）'
  if (!value) {
    return { success: false, errorMsg: errMsg }
  }
  const quanqianPriceMaxStr = pageState?.quanqianPrice?.max
  const quanqianPriceMax = toNumber(quanqianPriceMaxStr)
  const merchantReq = toNumber(value)
  if (quanqianPriceMax !== undefined && quanqianPriceMaxStr  && merchantReq > quanqianPriceMax) {
    return { success: false, errorMsg: '商补需小于等于券门槛最大值' }
  }
  const res = checkNumberInvalid(value, {
    checkNumber: true,
    decimalNumber: 1,
    // endWith: [
    //   {
    //     sence(val) {
    //       return val.includes('.');
    //     },
    //     endWith: ['.0', '.5'],
    //   },
    // ],
  })
  if (!res.success) {
    return { success: false, errorMsg: errMsg }
  }

  return { success: true }
}
