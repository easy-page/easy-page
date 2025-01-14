import {
  FormatStyle,
  OperaitonContext,
  TableUtil,
} from '@/common'
import { ResourceSkuActApplyListColumnId } from './columnIds'
import { ResourceApplyListItem } from '@/common/apis/waiMaResource'

export type skuActApplyListContext<T = Record<string, any>> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
> & {
  setTab: (tab: string) => void
}

export const enum ResourceActApplyListScene {
  /** 报名结果页的报名列表 */
  SupplierApplyResult = 'supplierApplyResult',
  SkuApplyResult = 'skuApplyResult',
}

export const skuApplyListColumns = new TableUtil<
  ResourceApplyListItem,
  ResourceActApplyListScene,
  skuActApplyListContext
>()

skuApplyListColumns.createColumns({
  sence: ResourceActApplyListScene.SkuApplyResult,
  columns: {
    [ResourceSkuActApplyListColumnId.ResourceName]: () => ({
      width: 100,
      fixed: 'left',
      title: '资源位信息',
    }),
    [ResourceSkuActApplyListColumnId.SkuCodes]: () => ({
      width: 140,
      fixed: 'left',
      title: '商品信息（SKUID）',
    }),
    [ResourceSkuActApplyListColumnId.SkuUpdateTime]: () => ({
      width: 180,
      title: '报名提交时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
  },
})
