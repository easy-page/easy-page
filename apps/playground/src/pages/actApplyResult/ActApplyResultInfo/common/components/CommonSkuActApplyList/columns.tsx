import { Image } from 'antd'
import {
  DangerouslySetInnerHTML,
  DotText,
  FormatStyle,
  OperaitonContext,
  SkuApplyListItem,
  TableUtil,
  getOperationColumnInfo,
} from '@/common'
import { SkuActApplyListColumnId } from './columnIds'
import {
  asyncDismiss,
  dismiss,
  hideOperationBtn,
  pass,
  reject,
  viewToPoiTab,
} from './operations'
import {
  BuyLimitType,
  ChargeSideTextEnum,
  StatusText,
  getText,
} from '@/common/constants/applyResult'

export type SkuActApplyListContext<T = Record<string, any>> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
> & {
  setTab: (tab: string) => void
}

export const POI_APPLY_ACT_LIST_DEFAULT_OP_COUNT = 3

export const enum SkuActApplyListScene {
  /** 报名结果页的报名列表 */
  SkuApplyResult = 'skuApplyResult',
  BrandApplyResult = 'brandApplyResult',
}

export const skuActApplyListColumns = new TableUtil<
  SkuApplyListItem,
  SkuActApplyListScene,
  SkuActApplyListContext
>()

skuActApplyListColumns.createColumns({
  sence: SkuActApplyListScene.SkuApplyResult,
  columns: {
    [SkuActApplyListColumnId.SubActId]: () => ({
      width: 100,
      fixed: 'left',
      title: '子活动 ID',
    }),
    [SkuActApplyListColumnId.SubActName]: () => ({
      width: 140,
      fixed: 'left',
      title: '子活动名称',
    }),
    [SkuActApplyListColumnId.SkuName]: () => ({
      width: 250,
      title: '商品名称',
      render: (text, record) => {
        // const img = record.picture || DEFAULT_GOOD_IMG
        const img = record.picture || ''
        return (
          <div className="flex flex-row items-center">
            <div className="mr-2">
              <Image width={60} src={img} />
            </div>
            <DotText line={1}>{text}</DotText>
          </div>
        )
      },
    }),
    [SkuActApplyListColumnId.SkuId]: () => ({
      width: 180,
      title: 'SKUID',
    }),
    // [SkuActApplyListColumnId.SkuCode]: () => ({
    //   width: 180,
    //   title: 'SKU 码',
    // }),
    // [SkuActApplyListColumnId.Upc]: () => ({
    //   width: 100,
    //   title: 'UPC 码',
    // }),
    [SkuActApplyListColumnId.Price]: () => ({
      width: 100,
      title: '商品原价',
      render: (text, record) => (
        <span>{record.price ? `${record.price.toFixed(2)}` : '-'}</span>
      ),
      // dotLineNumber: 4,
      // useHtmlRender: true,
    }),
    [SkuActApplyListColumnId.Charge]: () => ({
      width: 260,
      title: '补贴分摊',
      render: (text, record) => {
        const sum =
          record?.charge?.reduce((pre, cur) => pre + cur?.value, 0) || 0
        const charge = [
          ...(record.charge || []),
          { side: 'AGENT', value: 0 },
        ].map(
          (e) =>
            `${ChargeSideTextEnum[e.side]}承担金额${e.value.toFixed(
              2
            )}元，占比${((e?.value / sum) * 100).toFixed(0)}%`
        )

        return (
          <span>
            {record.charge && record.charge.length > 0 ? (
              <DangerouslySetInnerHTML>
                {`<p style="word-break:break-all;">${charge.join('<br>')}</p>`}
              </DangerouslySetInnerHTML>
            ) : (
              '无补贴'
            )}
          </span>
        )
      },
    }),
    [SkuActApplyListColumnId.ActPrice]: () => ({
      width: 100,
      title: '活动价（元）',
      render: (text, record) => (
        <span>{record.price ? `${record.actPrice.toFixed(2)}` : '-'}</span>
      ),
    }),
    [SkuActApplyListColumnId.Discount]: () => ({
      width: 100,
      title: '折扣率（折）',
      useHtmlRender: true,
    }),
    [SkuActApplyListColumnId.PoiName]: () => ({
      width: 200,
      title: '所属门店',
      render: (text, record) => (
        <span>
          {record.poiName ? `${record.poiName}（${record.poiId}）` : '-'}
        </span>
      ),
    }),
    [SkuActApplyListColumnId.ActStock]: () => ({
      width: 150,
      title: '库存/限购',
      render: (text, record) => {
        const buyLimit = (record?.buyLimit || []).find(
          (e) => e.type === BuyLimitType.ORDER
        )
        return (
          <>
            <p>每日库存{getText(record.dayStock)}份</p>
            <span>每单限购{getText(buyLimit?.value)}份</span>
          </>
        )
      },
    }),
    [SkuActApplyListColumnId.TargetUser]: () => ({
      width: 100,
      title: '目标用户',
    }),
    [SkuActApplyListColumnId.PoiBrandName]: () => ({
      width: 200,
      title: '所属业务品牌',
      render: (text, record) => {
        return (
          <>
            {text ? text : '-'}
            {record?.poiBrandId ? `（${record?.poiBrandId}）` : ''}
          </>
        )
      },
    }),
    [SkuActApplyListColumnId.PoiBrandOpMis]: () => ({
      width: 150,
      title: '品牌负责人',
      render: (text, record) => {
        return <>{text ? text : '-'}</>
      },
    }),
    [SkuActApplyListColumnId.City]: () => ({
      width: 100,
      title: '所属城市',
    }),
    [SkuActApplyListColumnId.ApplyTime]: () => ({
      width: 200,
      title: '报名提交时间',
    }),
    [SkuActApplyListColumnId.Status]: () => ({
      width: 100,
      title: '报名状态',
      render: (text, record) => <span>{StatusText[text]}</span>,
    }),
  },
})

// skuActApplyListColumns.extendsColumns({
//   sence: SkuActApplyListScene.BrandApplyResult,
//   targetScene: SkuActApplyListScene.SkuApplyResult,
//   copyIds: [
//     SkuActApplyListColumnId.PoiName,
//     SkuActApplyListColumnId.PoiBrandId,
//     SkuActApplyListColumnId.PoiBrandName,
//     // SkuActApplyListColumnId.PoiOwnerOrBrandOwner,
//   ],
//   columns: {
//     [BrandActApplyListColumnId.ApprovedPoiCount]: () => ({
//       width: 180,
//       title: '通过审核/已邀请门店数',
//       render: (text, record) => {
//         // const { approvedPoiCount, invitePoiCount } = record
//         // return `${approvedPoiCount}/${invitePoiCount}`
//         return ''
//       },
//     }),
//   },
// })

skuActApplyListColumns.addOperations({
  sence: SkuActApplyListScene.BrandApplyResult,
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

skuActApplyListColumns.addOperations({
  sence: SkuActApplyListScene.SkuApplyResult,
  column: ({ userInfo, configs }) => {
    return getOperationColumnInfo({
      operations: [pass, reject, dismiss, hideOperationBtn],
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
