import {
  BrandApplyListItem,
  DangerouslySetInnerHTML,
  FormatStyle,
  OPERATION_COL_KEY,
  OperaitonContext,
  PoiApplyListItem,
  TableUtil,
  getOperationColumnInfo,
} from '@/common'
import { BrandActApplyListColumnId, PoiActApplyListColumnId } from './columnIds'
import { dismiss } from './operations/dismiss'
import { viewToPoiTab } from './operations/viewToPoiTab'
import { asyncDismiss } from './operations/asyncDismiss'

export type PoiActApplyListContext<T = Record<string, any>> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
> & {
  setTab: (tab: string) => void
}

export const POI_APPLY_ACT_LIST_DEFAULT_OP_COUNT = 3

export const enum PoiActApplyListScene {
  /** 报名结果页的报名列表 */
  ApplyResult = 'applyResult',
  BrandApplyResult = 'brandApplyResult',
}

export const getPoiActApplyListColumns = ({
  excludes,
  columnIds,
}: {
  excludes: PoiActApplyListColumnId[]
  columnIds: string[]
}): PoiActApplyListColumnId[] => {
  return ([...columnIds, OPERATION_COL_KEY] || []).filter(
    (e) => !excludes.includes(e as PoiActApplyListColumnId)
  ) as PoiActApplyListColumnId[]
}

export const poiActApplyListColumns = new TableUtil<
  PoiApplyListItem,
  PoiActApplyListScene,
  PoiActApplyListContext
>()

poiActApplyListColumns.createColumns({
  sence: PoiActApplyListScene.ApplyResult,
  columns: {
    [PoiActApplyListColumnId.PoiId]: () => ({
      width: 100,
      fixed: 'left',
      title: '门店 ID',
    }),
    [PoiActApplyListColumnId.PoiName]: () => ({
      width: 200,
      fixed: 'left',
      title: '门店名称',
      dotLineNumber: 2
    }),
    [PoiActApplyListColumnId.PoiBrandId]: () => ({
      width: 120,
      title: '业务品牌 ID',
    }),
    [PoiActApplyListColumnId.PoiBrandName]: () => ({
      width: 180,
      title: '业务品牌名称',
    }),
    [PoiActApplyListColumnId.PoiOwnerOrBrandOwner]: () => ({
      width: 180,
      title: '品牌负责人/门店负责人',
    }),
    [PoiActApplyListColumnId.City]: () => ({
      width: 100,
      title: '所属城市',
    }),
    [PoiActApplyListColumnId.ChargeSidePoi]: () => ({
      width: 300,
      title: '商补出资',
      dotLineNumber: 4,
      useHtmlRender: true,
    }),
    [PoiActApplyListColumnId.ChargeSidePoiy]: () => ({
      width: 250,
      title: '差异化商补',
      useHtmlRender: true,
    }),
    [PoiActApplyListColumnId.ChargeSideMtb]: () => ({
      width: 200,
      title: '差异化 B 补',
      useHtmlRender: true,
    }),
    [PoiActApplyListColumnId.ChargeSideAgent]: () => ({
      width: 200,
      title: '差异化代补',
      useHtmlRender: true,
    }),
    // [PoiActApplyListColumnId.Budget4PoiDaily]: () => ({
    //   width: 130,
    //   title: '商家预算（元）',
    // }),
    // [PoiActApplyListColumnId.Budget4MtbDaily]: () => ({
    //   width: 130,
    //   title: 'B补预算（元）',
    // }),
    // [PoiActApplyListColumnId.Budget4AgentDaily]: () => ({
    //   width: 140,
    //   title: '代补预算（元）',
    // }),
    [PoiActApplyListColumnId.ApplyTime]: () => ({
      width: 180,
      title: '提交报名时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
    [PoiActApplyListColumnId.StatusDesc]: () => ({
      width: 100,
      title: '报名状态',
    }),
  },
})

poiActApplyListColumns.extendsColumns({
  sence: PoiActApplyListScene.BrandApplyResult,
  targetScene: PoiActApplyListScene.ApplyResult,
  copyIds: [
    PoiActApplyListColumnId.PoiName,
    PoiActApplyListColumnId.PoiBrandId,
    PoiActApplyListColumnId.PoiBrandName,
    PoiActApplyListColumnId.PoiOwnerOrBrandOwner,
  ],
  columns: {
    [BrandActApplyListColumnId.ApprovedPoiCount]: () => ({
      width: 180,
      title: '通过审核/已邀请门店数',
      render: (text, record) => {
        const { approvedPoiCount, invitePoiCount } = record
        return `${approvedPoiCount}/${invitePoiCount}`
      },
    }),
  },
})

poiActApplyListColumns.addOperations({
  sence: PoiActApplyListScene.BrandApplyResult,
  column: ({ userInfo, ...rest }) => {
    return getOperationColumnInfo({
      operations: [asyncDismiss, viewToPoiTab],
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

poiActApplyListColumns.addOperations({
  sence: PoiActApplyListScene.ApplyResult,
  column: ({ userInfo, configs }) => {
    return getOperationColumnInfo({
      operations: [dismiss],
      userInfo,
      maxCount: POI_APPLY_ACT_LIST_DEFAULT_OP_COUNT,
      configs,
      columnProps: {
        title: '操作',
        width: 250,
        fixed: 'right',
      },
    })
  },
})
