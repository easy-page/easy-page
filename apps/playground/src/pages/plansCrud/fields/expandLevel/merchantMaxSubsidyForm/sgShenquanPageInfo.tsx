import { PageUtil, nodeUtil } from '@easy-page/antd-ui'
import { deleteRow, merchantRequestPrice, quanqianPrice } from './fields'
import { stepNumber } from './fields/stepNumber'
import { sgShenquanValidateExpandLevelPrice } from '../validates/sgShenquanValidateExpandLevelPrice'

const pu = new PageUtil({ pageId: 'expandLevelForm' })

pu.addFields([
  stepNumber,
  quanqianPrice({ suffix: '券门槛' }),
  merchantRequestPrice({
    errorMsg: '必填，0~5000，支持一位小数。（不可为0）',
    range: { Max: 5000, Min: 0 },
    validate: sgShenquanValidateExpandLevelPrice,
    effectedKeys:['quanqianPrice']
  }),
  // meituanSubsidyPrice,
  deleteRow,
])

export const sgShenquanMerchantMaxSubsidyFormInfo = pu.getPageInfo()

console.log('sgShenquanMerchantMaxSubsidyFormInfo:', sgShenquanMerchantMaxSubsidyFormInfo)
