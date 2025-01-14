import { InputTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState, InviteWay } from '../../../../../interface'

export const byFilter = () =>
  nodeUtil.createNode<string, CommonActCrudFormState>(
    `${InputTypeEnum.FilterAssemble}`,
    {
      name: '通过条件筛选',
      when: {
        effectedKeys: ['dataType'],
        show({ effectedData }) {
          const dataType = effectedData['dataType']
          return dataType !== InviteWay.ByMerchantBrand
        },
      },
    }
  )
