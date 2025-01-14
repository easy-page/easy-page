import { toNumber } from '@/common/libs'
import { TableUtil } from '../../ZsptTableUtil'
import { MerchantMaxSubsidyField } from './preprocessMechantMaxSubsidy'

export enum MerchantMaxSubsidyScene {
  PlanView = 'planView',
  ShenQuanPlanView = 'shenQuanPlanView',
  UnionCouponPlanView = 'unionCouponPlanView',
}

export const merchantMaxSubsidyColumns = new TableUtil<
  MerchantMaxSubsidyField,
  MerchantMaxSubsidyScene,
  {
    highlightPrice?: boolean
  }
>()

export enum MerchantMaxSubsidyColumnId {
  QuanqianPrice = 'quanqianPrice',
  MerchantRequestPrice = 'merchantRequestPrice',
}

merchantMaxSubsidyColumns.createColumns({
  sence: MerchantMaxSubsidyScene.PlanView,
  columns: {
    [MerchantMaxSubsidyColumnId.QuanqianPrice]: ({ highlightPrice }) => ({
      width: 160,
      title: '订单券前价',
      tooltip:
        '指用券前的实付订单金额=商品现价+打包费-所有优惠金额（不含配送费）',
      render: (val, _, idx) => {
        const min = toNumber(val.min)
        const max = toNumber(val.max)
        if (!max) {
          return idx === 0 ? '不限制' : `满${min || '-'}元`
        }
        if (idx === 0) {
          return `${max}元以下`
        }
        return `满${min}元`
      },
    }),
    [MerchantMaxSubsidyColumnId.MerchantRequestPrice]: ({
      highlightPrice,
    }) => ({
      width: 160,
      title: '商家最高补贴',
      render: (val) =>
        !highlightPrice ? (
          `${val}元`
        ) : (
          <div>
            <span className="text-red-400">{val}</span>元
          </div>
        ),
    }),
  },
})

merchantMaxSubsidyColumns.extendsColumn({
  sence: MerchantMaxSubsidyScene.ShenQuanPlanView,
  targetScene: MerchantMaxSubsidyScene.PlanView,
  extendId: MerchantMaxSubsidyColumnId.QuanqianPrice,
  handler(column) {
    return (context) => ({
      ...column(context),
      title: '券门槛',
      tooltip: '',
    })
  },
})

merchantMaxSubsidyColumns.extendsColumn({
  sence: MerchantMaxSubsidyScene.UnionCouponPlanView,
  targetScene: MerchantMaxSubsidyScene.PlanView,
  extendId: MerchantMaxSubsidyColumnId.QuanqianPrice,
  handler(column) {
    return (context) => ({
      ...column(context),
      title: '券门槛',
      tooltip: '',
    })
  },
})

merchantMaxSubsidyColumns.copyColumns({
  sence: MerchantMaxSubsidyScene.UnionCouponPlanView,
  targetScene: MerchantMaxSubsidyScene.PlanView,
  copyIds: [MerchantMaxSubsidyColumnId.MerchantRequestPrice],
})

merchantMaxSubsidyColumns.copyColumns({
  sence: MerchantMaxSubsidyScene.ShenQuanPlanView,
  targetScene: MerchantMaxSubsidyScene.PlanView,
  copyIds: [MerchantMaxSubsidyColumnId.MerchantRequestPrice],
})
