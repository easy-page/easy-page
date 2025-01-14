import { IActRuleList, ProductSelection } from '@/common/apis'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'

export const actRule = nodeUtil.createCustomField<
  IActRuleList<ProductSelection>,
  CommonActCrudFormState,
  CommonActCrudFormProps
>(
  'actRule',
  '活动规则',
  () => {
    return <div></div>
  },
  {}
)
