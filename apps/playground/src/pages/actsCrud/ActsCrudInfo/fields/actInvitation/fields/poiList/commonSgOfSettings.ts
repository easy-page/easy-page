import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common'
import { CommonActCrudFormState } from '../../../interface'
import { poiList } from './common'

export const commonSgPoiListOfSettings = nodeUtil.extends<
  any,
  CommonActCrudFormState
>(poiList(), {
  when() {
    return {
      effectedKeys: ['chooseOperation'],
      show({ effectedData }) {
        return effectedData['chooseOperation'] !== `${ActionTypeEnum.Unlimited}`
      },
    }
  },
})
