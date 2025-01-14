import { isEdit } from '@/common/routes'
import {
  ActFullInfo,
  CreateProductTypeEnum,
  PoiBuildProduct,
  SaveActParams,
} from '../interfaces'

export const handlePoiBuildProduct = (
  data: SaveActParams,
  actDetail?: ActFullInfo
): SaveActParams => {
  const subActs = data.subActivity || []
  const remotePoiBuildProduct = actDetail?.subActivity?.[0]?.poiBuildProduct

  subActs.forEach((x) => {
    if (isEdit()) {
      console.log('remotePoiBuildProduct:', remotePoiBuildProduct, x.openGuide)
      if (remotePoiBuildProduct && !x.openGuide) {
        // 如果现在是关闭，之前 type = 0 维持原样
        x.poiBuildProduct = {
          value: remotePoiBuildProduct?.value,
          type: CreateProductTypeEnum.UnOpen,
        }
      } else if (!x.openGuide) {
        // 如果当前关闭，之前是 null 则传递 null
        x.poiBuildProduct = null
      }
    } else {
      // 非编辑状态
      if (!x.openGuide) {
        // 如果当前关闭，之前是 null 则传递 null
        x.poiBuildProduct = null
      }
    }

    delete x.openGuide
  })
  return data
}
