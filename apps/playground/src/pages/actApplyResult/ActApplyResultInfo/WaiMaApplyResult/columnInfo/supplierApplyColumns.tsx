import {
  FormatStyle,
  OperaitonContext,
  TableUtil,
  getOperationColumnInfo,
  toJson,
} from '@/common'
import { ResourceActApplyListColumnId } from './columnIds'
import { ResourceActApplyListScene } from './skuApplyColumns'
import {
  hideOperationBtn,
  pass,
  reject,
} from '../../common/components/CommonActApplyList/operations'
import { PreviewDialog } from './PreviewDialog/PreviewDialog'
import { ResourceApplyListItem } from '@/common/apis/waiMaResource'

export type supplierActApplyListContext<T = Record<string, any>> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
> & {
  setTab: (tab: string) => void
}

export const POI_APPLY_ACT_LIST_DEFAULT_OP_COUNT = 3

export const supplierActApplyListColumns = new TableUtil<
  ResourceApplyListItem,
  ResourceActApplyListScene,
  supplierActApplyListContext
>()

supplierActApplyListColumns.createColumns({
  sence: ResourceActApplyListScene.SupplierApplyResult,
  columns: {
    [ResourceActApplyListColumnId.InviteTargetId]: () => ({
      width: 100,
      fixed: 'left',
      title: '供应商ID',
    }),
    [ResourceActApplyListColumnId.SupplierName]: () => ({
      width: 140,
      fixed: 'left',
      title: '供应商名称',
    }),
    [ResourceActApplyListColumnId.ResourceName]: () => ({
      width: 120,
      title: '资源位',
    }),
    [ResourceActApplyListColumnId.MaterialInfo]: () => ({
      width: 180,
      title: '报名素材',
      render: (text, record) => {
        return record?.status === -1 ? '不需要' : <PreviewDialog resourceName={record?.resourceName}  materialInfo={toJson(text)} />
      },
    }),
    [ResourceActApplyListColumnId.SkuCodes]: () => ({
      width: 180,
      title: '商品信息（SKUID）',
    }),
    [ResourceActApplyListColumnId.StatusDesc]: () => ({
      width: 100,
      title: '报名状态',
    }),
    [ResourceActApplyListColumnId.ApplyTime]: () => ({
      width: 180,
      title: '报名提交时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
  },
})

supplierActApplyListColumns.addOperations({
  sence: ResourceActApplyListScene.SupplierApplyResult,
  column: ({ userInfo, ...rest }) => {
    return getOperationColumnInfo({
      operations: [reject, pass, hideOperationBtn],
      userInfo,
      ...rest,
      maxCount: POI_APPLY_ACT_LIST_DEFAULT_OP_COUNT,
      columnProps: {
        title: '操作',
        width: 250,
        fixed: 'right',
      },
    })
  },
})
