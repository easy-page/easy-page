import { ActFullInfo, ISubActivity } from '@/common'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'

export const openGuide = nodeUtil.createField<boolean>(
  'openGuide',
  '是否开启',
  {
    value: false,
    preprocess({ defaultValues }) {
      const remotePoiBuildProduct = (defaultValues as ISubActivity)
        ?.poiBuildProduct
      if (!remotePoiBuildProduct) {
        return false
      }
      return remotePoiBuildProduct?.type !== 0
    },
    postprocess({ value }) {
      return {
        openGuide: value,
      }
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
  }
)
