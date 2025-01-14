import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export enum CanEditGoodInfoOption {
  ProductName = 'productName',
  ProductWeight = 'productWeight',
  ProductPrice = 'productPrice',
  ProductMinOrderCount = 'productMinOrderCount',
  ProductUpc = 'productUpc',
  ProductSpec = 'productSpec',
}

export const CanEditGoodInfoText: Record<CanEditGoodInfoOption, string> = {
  [CanEditGoodInfoOption.ProductName]: '商品名称',
  [CanEditGoodInfoOption.ProductWeight]: '商品重量',
  [CanEditGoodInfoOption.ProductPrice]: '商品价格',
  [CanEditGoodInfoOption.ProductMinOrderCount]: '商品最小购买数量',
  [CanEditGoodInfoOption.ProductUpc]: '商品 UPC',
  [CanEditGoodInfoOption.ProductSpec]: '商品规格',
}

export const canEditGoodInfo = ({
  options,
}: {
  options: CanEditGoodInfoOption[]
}) =>
  nodeUtil.createField(
    'canEditGoodInfo',
    '是否可编辑商品信息',
    {
      mode: 'multiple',
      value: [],
      preprocess: ({ defaultValues }) => {
        return get(defaultValues || {}, 'applyControl.canModifyProduct')
      },
      postprocess: ({ value }) => {
        return {
          'applyControl.canModifyProduct': value,
        }
      },
    },

    {
      checkBoxGroup: {
        options: options.map((e) => ({
          label: CanEditGoodInfoText[e],
          value: e,
        })),
      },
      formItem: {
        tooltip: `1、不勾选，代表不允许商家在报名后修改对应商品信息，若修改将导致活动自动下线；勾选后，则不限制商家修改，修改后活动不会下线。
    2、系统默认不可修改如下商品信息：
    售卖方式（变更为“预售”，则活动下线）
    UPC（修改后，则活动下线）`,
      },
    }
  )
