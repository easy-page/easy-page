import { ActTypeEnum, CategoryCode } from '@/common'

// TODO @oujie: 迁移完因子配置把这里删掉
export const QualifyDefaultConfig = {
  [ActTypeEnum.DISCOUNT_NON_BRAND]: {
    sku_quality_score: JSON.stringify({
      feExtend: JSON.stringify({
        factorCategoryCode: CategoryCode.Sku,
        previewInfo:
          '商品质量-综合分:选择<font color="#FF4A47">优质</font>商品',
      }),
      type: 'exact_match',
      value: '1',
    }),
  },
}
