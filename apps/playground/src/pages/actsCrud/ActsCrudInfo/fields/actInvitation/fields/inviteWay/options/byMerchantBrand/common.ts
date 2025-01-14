import { nodeUtil, Empty, RadioEffectedType } from '@easy-page/antd-ui'
import { CommonActCrudFormState, InviteWay } from '../../../../../interface'

export type ByMerchantBrandOptions = {
  name?: string
  disabled?: boolean
}
export const byMerchantBrand = ({
  name,
  disabled,
}: ByMerchantBrandOptions = {}) =>
  nodeUtil.createNode<any, CommonActCrudFormState, Empty, RadioEffectedType>(
    InviteWay.ByMerchantBrand,
    {
      name: name || '通过商家品牌邀请',
    },
    {
      radio: { disabled: disabled },
    }
  )
