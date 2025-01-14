import { nodeUtil, RadioEffectedType } from '@easy-page/antd-ui'
import { getActConfig } from '@/common/configs'
import { configListModel } from '@/common/models/configList'
import { CommonActCrudFormState } from '../../../../../interface'
import { byMerchantBrand } from './common'

export const commonByMerchantBrandOfSettings = nodeUtil.extends<
  any,
  CommonActCrudFormState,
  any,
  RadioEffectedType
>(byMerchantBrand({ name: '通过商家品牌邀请' }), {
  actions() {
    return [
      {
        effectedKeys: ['templateId'],
        initRun: true,
        action: ({ effectedData }) => {
          const { data: configs } = configListModel.getList()
          const templateId = effectedData['templateId']
          const actConfig = getActConfig({
            templateId: templateId,
            configs,
          })
          if (actConfig?.disableMerchantBrandOption) {
            return {
              effectResult: {
                radioProps: { disabled: true },
              },
            }
          }
          return {}
        },
      },
    ]
  },
})
