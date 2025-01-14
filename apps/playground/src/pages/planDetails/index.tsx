import {
  BaseContainer,
  GetPlanDetailResult,
  StatusTagSizeEnum,
  SubPlanStatusTag,
  ZsptTab,
  getPlanDetail,
  DotText,
  PlanTypeEnum,
  BizLineEnum,
  SubMarketingPlan,
  toNumber,
} from '@/common'
import { useParamsInfo } from '@/common/hooks'
import { planDetailModel } from '@/common/models'
import {
  PlanDetailParams,
  PlanDetailParamsEnum,
} from '@/common/routes/toUrls/toPlanDetail'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { PlanTitle } from './components/Title'
import { BaseInfo } from './components/BaseInfo'
import { SubPanelContent } from './components/SubPanelContent'
import { ShenhuiyuanDetail } from './ShenhuiyuanDetail'
import { ShenQuanDetail } from './ShenQuanDetail'
import { UnionCouponDetail } from './UnionCouponDetail'
import './index.less'

export const PlanDetailMap: Record<
  PlanTypeEnum,
  (bizLine: BizLineEnum, subPlan: SubMarketingPlan) => React.ReactNode
> = {
  [PlanTypeEnum.Brand]: () => <></>,
  [PlanTypeEnum.GodPrice]: () => <></>,
  [PlanTypeEnum.ShenHuiYuan]: (bizLine: number, subPlan) => {
    return bizLine === BizLineEnum.WaiMai ? (
      <ShenhuiyuanDetail subPlan={subPlan} />
    ) : (
      <ShenQuanDetail subPlan={subPlan} />
    )
  },
  [PlanTypeEnum.UnionCoupon]: (bizLine: number, subPlan) => {
    return <UnionCouponDetail subPlan={subPlan}/>
  },
}

export const PlanDetail = observer(() => {
  const {
    data = {} as GetPlanDetailResult,
    loading,
    error,
    msg: errorMsg,
  } = planDetailModel.getData()
  const { params } = useParamsInfo<PlanDetailParams>()
  useEffect(() => {
    const init = async () => {
      planDetailModel.loadData(
        async () => await getPlanDetail({ planId: params.planId })
      )
    }
    init()
  }, [])
  const hasError = error
  const isLoading = loading
  return (
    <BaseContainer loading={isLoading} error={hasError} errorMsg={errorMsg}>
      <div className="p-6">
        <PlanTitle title={data.name} status={data.status} />
        <BaseInfo detail={data} />
        <SubPanelContent title="子方案">
          <ZsptTab
            tabProps={{
              size: 'large',
              type: 'editable-card',
              className: 'sub-plan-tab',
              hideAdd: true,
            }}
            tabs={(data.group || []).map((each) => {
              return {
                id: `${each.id}`,
                content: PlanDetailMap[params.planType](
                  Number(params.bizLine),
                  each
                ),
                closable: false,
                label: (
                  <div className="flex flex-row items-center">
                    <SubPlanStatusTag
                      size={StatusTagSizeEnum.Small}
                      status={each.groupStatus}
                    ></SubPlanStatusTag>
                    <DotText className="max-w-[150px] ml-1" line={1}>
                      {each.name}
                    </DotText>
                  </div>
                ),
              }
            })}
            id={PlanDetailParamsEnum.GroupId}
            defaultTab={`${data.group?.[0]?.id || ''}`}
          ></ZsptTab>
        </SubPanelContent>
      </div>
    </BaseContainer>
  )
})
