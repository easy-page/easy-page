import {
  BudgetDegreeDesc,
  DangerouslySetInnerHTML,
  FormatStyle,
  IBudget,
  PoiTypeText,
  PromotionKey,
  TargetUserTypeDesc,
  formateDate,
} from '@/common'
import { getActConfig } from '@/common/configs'
import { configListModel } from '@/common/models/configList'
import { getQualifyPreviewInfo } from './utils'
import { ChargePreviewInfo, MeiTuanPreviewCharge, WmDisChargePreviewInfo } from './components'
import { PreviewColumnInfo } from './interface'

const RedText = ({ children }: { children: any }) => {
  return <span className="text-[#FF4A47]">{children}</span>
}

// 促销类型
export const promotionType: PreviewColumnInfo = {
  properties: '促销类型',
  content: ({ templateId }) => {
    const { data: configs } = configListModel.getList() || {}
    const actConfig = getActConfig({ templateId, configs })
    return <div>{actConfig.actType ? actConfig.templateInfo.name : <></>}</div>
  },
}

export const actName: PreviewColumnInfo = {
  properties: '活动名称',
  content: ({ activity }) => {
    return activity?.name || '-'
  },
}

export const actTime: PreviewColumnInfo = {
  properties: '活动时间',
  content: ({ activity }) => {
    // TODO: 其余活动补充时间预览

    return activity?.promotionTime?.isRestrict
      ? `${formateDate(
          activity.promotionTime?.startTime,
          FormatStyle.YYYYMMDD
        )}-${formateDate(
          activity.promotionTime?.endTime,
          FormatStyle.YYYYMMDD
        )}`
      : '长期有效'
  },
}

export const wmActTime: PreviewColumnInfo = {
  properties: '活动时间',
  content: ({ activity }) => {
    // TODO: 其余活动补充时间预览

    return activity?.promotionTime?.isRestrict
      ? `${formateDate(
          activity.promotionTime?.startTime,
          FormatStyle.YYYYMMDDHHmmss
        )} - ${formateDate(
          activity.promotionTime?.endTime,
          FormatStyle.YYYYMMDDHHmmss
        )}`
      : '长期有效'
  },
}

export const subActTitle: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: (
    <>
      <span className="text-[#FF0000] font-medium">子活动</span>
      <span>名称{childIdx + 1}</span>
    </>
  ),
  content: ({ subActivity }) => {
    // TODO: 其余活动补充时间预览
    const act = subActivity[childIdx]
    return <span className="font-semibold">{act?.name || '-'}</span>
  },
})

// 价格范围、菜品折扣价格
export const dishDiscountPrice: (
  childIdx: number,
  name: string
) => PreviewColumnInfo = (childIdx, name) => ({
  properties: name,
  content: ({ subActivity }) => {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList || []
    if (!keyList || keyList.length === 0) {
      return '-'
    }
    const subsidyInfo = keyList.find((item) => item.key === PromotionKey.Price)
    if (!subsidyInfo) {
      return '-'
    }
    return (
      <>
        <RedText>{subsidyInfo?.minValue}</RedText>-
        <RedText>{subsidyInfo?.maxValue}</RedText>元
      </>
    )
  },
})

export const poiQualify: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '商家报名资质',
  content({ subActivity }, { factors }) {
    const subAct = subActivity[childIdx]
    const qualify = subAct.qualify?.dataCollector
    const { poi } = getQualifyPreviewInfo(qualify, factors)
    if (poi.length === 0) {
      return '-'
    }
    return (
      <DangerouslySetInnerHTML>
        {`<p style="word-break:break-all;">${poi.join('<br>')}</p>`}
      </DangerouslySetInnerHTML>
    )
  },
})
export const skuQualify: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '商品报名资质',
  content({ subActivity }, { factors }) {
    const subAct = subActivity[childIdx]
    const qualify = subAct.qualify?.dataCollector
    const { sku } = getQualifyPreviewInfo(qualify, factors)
    if (sku.length === 0) {
      return '-'
    }
    return (
      <DangerouslySetInnerHTML>
        {`<p style="word-break:break-all;">${sku.join('<br>')}</p>`}
      </DangerouslySetInnerHTML>
    )
  },
})

export const discountRate: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '折扣范围',
  content: ({ subActivity }) => {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList || []
    if (!keyList || keyList.length === 0) {
      return '-'
    }
    const subsidyInfo = keyList.find(
      (item) => item.key === PromotionKey.DiscountRate
    )
    if (!subsidyInfo) {
      return '-'
    }

    return (
      <>
        <RedText>{subsidyInfo?.minValue}</RedText>-
        <RedText>{subsidyInfo?.maxValue}</RedText>折
      </>
    )
  },
})

export const targetUser: (
  childIdx: number,
  title?: string
) => PreviewColumnInfo = (childIdx, title = '目标人群') => ({
  properties: title,
  content: ({ subActivity }) => {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList || []
    if (!keyList || keyList.length === 0) {
      return '-'
    }
    const subsidyInfo = keyList.find(
      (item) => item.key === PromotionKey.TargetUserType
    )
    if (!subsidyInfo) {
      return '-'
    }
    return `${TargetUserTypeDesc[subsidyInfo.minValue]}`
  },
})

export const dishDiscountPriceRate: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '菜品折扣率',
  content: ({ subActivity }) => {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList || []
    if (!keyList || keyList.length === 0) {
      return '-'
    }
    const subsidyInfo = keyList.find(
      (item) => item.key === PromotionKey.DiscountRate
    )
    if (!subsidyInfo) {
      return '-'
    }
    return (
      <>
        <RedText>{subsidyInfo?.minValue}</RedText>-
        <RedText>{subsidyInfo?.maxValue}</RedText>折
      </>
    )
  },
})

export const dayStock: (childIdx: number, name: string) => PreviewColumnInfo = (
  childIdx,
  name
) => ({
  properties: name,
  content: ({ subActivity }) => {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList || []
    if (!keyList || keyList.length === 0) {
      return '-'
    }
    const subsidyInfo = keyList.find(
      (item) => item.key === PromotionKey.DayStock
    )
    if (!subsidyInfo) {
      return '-'
    }
    return (
      <>
        <RedText>{subsidyInfo?.minValue}</RedText>-
        <RedText>{subsidyInfo?.maxValue}</RedText>个
      </>
    )
  },
})

export const chargeInfo: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '补贴分摊',
  content({ subActivity, activity }) {
    const subAct = subActivity[childIdx]
    const budgetControl = subAct.contentList?.[0]?.subsidy?.chargeDetailVos
    return (
      <ChargePreviewInfo
        poiType={activity.poiType}
        chargeDetailVos={budgetControl}
      />
    )
  },
})

export const wmDisChargeInfo: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '补贴分摊规则',
  content({ subActivity, activity }) {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList
    const meituan =
      subAct.contentList?.[0]?.subsidy?.chargeDetailVos?.[0]?.meituan
    return (
      <div>
        <div className="font-semibold">菜品商家成本</div>
        <div>
          每单商家成本占比：
          <WmDisChargePreviewInfo
            keyList={keyList}
            promotionKey={PromotionKey.PoiSubsidyRatio}
          />
        </div>
        <div className="font-semibold mt-2">菜品美团成本</div>
        <div>
          每单美团成本占比：
          <MeiTuanPreviewCharge mt={meituan} type="chargeAmt" />
        </div>
        <div>
          每单最高承担金额：
          <MeiTuanPreviewCharge mt={meituan} type="maxAmount" />
        </div>
        <div className="font-semibold mt-2">菜品代理成本</div>
        <div>
          每单代理成本占比：
          <WmDisChargePreviewInfo
            keyList={keyList}
            promotionKey={PromotionKey.AgentSubsidyRatio}
          />
        </div>
        <div>
          每单最高承担金额：
          <WmDisChargePreviewInfo
            keyList={keyList}
            promotionKey={PromotionKey.AgentSubsidyMax}
          />
        </div>
      </div>
    )
  },
})

export const orderLimit: (childIdx: number) => PreviewColumnInfo = (
  childIdx
) => ({
  properties: '每单限购份数',
  content: ({ subActivity }) => {
    const subAct = subActivity[childIdx]
    const keyList = subAct?.contentList?.[0]?.keyList || []
    if (!keyList || keyList.length === 0) {
      return '-'
    }
    const subsidyInfo = keyList.find(
      (item) => item.key === PromotionKey.OrderLimit
    )
    if (!subsidyInfo) {
      return '-'
    }
    return (
      <>
        <RedText>{subsidyInfo?.minValue}</RedText>-
        <RedText>{subsidyInfo?.maxValue}</RedText>个
      </>
    )
  },
})

/** 邀请门店类型 */
export const inviteType: PreviewColumnInfo = {
  properties: '邀请门店类型',
  content: ({ activity }) => {
    const inviteType = activity.poiType
    return <div>{inviteType ? PoiTypeText[inviteType] : '-'}</div>
  },
}

export const poiApplyTime: PreviewColumnInfo = {
  properties: '商家报名截止时间',
  content: ({ activity }) => {
    return (
      <div>
        {activity.endTime
          ? formateDate(activity.endTime, FormatStyle.YYYYMMDDHHmmss)
          : '-'}
      </div>
    )
  },
}

export const actEffectTime: PreviewColumnInfo = {
  properties: '活动生效时间',
  content: ({ activity }) => {
    const startTime = activity?.promotionTime?.startTime
    const endTime = activity?.promotionTime?.endTime
    if (!startTime || !endTime) {
      return '-'
    }
    return `${formateDate(
      startTime,
      FormatStyle.YYYYMMDDHHmmss
    )} - ${formateDate(endTime, FormatStyle.YYYYMMDDHHmmss)}`
  },
}

/** 预算管控 */
export const actBudgetControl: PreviewColumnInfo = {
  properties: '预算管控',
  content: ({ budgetControl }) => {
    return budgetControl.length > 0 ? (
      <>
        {budgetControl.map((item: IBudget, index: number) => {
          return (
            <div key={`budget-control${index}`} style={{ marginBottom: '6px' }}>
              <span>{`${item.pnName}(${item.pn})`}</span>
              <span style={{ margin: '0 4px' }}>
                预算金额：
                <span className="text-[#FF4A47]">
                  {item.budget ? `${item.budget}元` : '待品牌商提报'}
                </span>
              </span>
              <span>管控方式：{BudgetDegreeDesc[item.degree]}</span>
            </div>
          )
        })}
      </>
    ) : (
      '-'
    )
  },
}

export const totalAmount: PreviewColumnInfo = {
  properties: '结算总额',
  content: ({ activity }) => {
    const totalPrice = activity?.totalPrice
    if (!totalPrice) {
      return '-'
    }
    return (
      <>
        <RedText>{totalPrice}万元</RedText>
      </>
    )
  },
}
