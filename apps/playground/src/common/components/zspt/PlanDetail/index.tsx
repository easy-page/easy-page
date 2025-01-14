import { Empty, Spin } from 'antd'
import classNames from 'classnames'
import { GetSubsidyRule4GroupRes, SubsidyLevelEnum } from '@/common/apis'
import { SubsidyConditionKeyEnum } from '@/common/constants'
import { InfoField } from './InfoField'
import {
  MerchantMaxSubsidyTable,
  MtLowestSubsidyTable,
  preprocessBaseLevelMerchantMaxSubsidy,
} from '../SubsidyTable'
import { MerchantMaxSubsidyScene } from '../SubsidyTable/MerchantMaxSubsidy/columns'

export type PlanDetailProps = {
  detail: GetSubsidyRule4GroupRes
  disablePlanInfo?: boolean
  highlightPrice?: boolean
  loading?: boolean
  layout?: 'flex-col' | 'flex-row'
  className?: string
  scene?: MerchantMaxSubsidyScene
  subsidyConditionKey?: SubsidyConditionKeyEnum
  subsidyScene?: SubsidyLevelEnum
}

export const PlanDetailInfo = ({
  detail,
  disablePlanInfo,
  highlightPrice,
  loading,
  layout = 'flex-col',
  className,
  subsidyConditionKey,
  scene = MerchantMaxSubsidyScene.PlanView,
  subsidyScene,
}: PlanDetailProps) => {
  console.log('活动detail::', JSON.stringify(detail))
  if (loading) {
    return (
      <Spin className="w-full h-full flex flex-col items-center justify-center"></Spin>
    )
  }
  if (!detail) {
    return (
      <Empty
        description={'还未选择方案'}
        className="w-full h-full flex flex-col items-center justify-center"
      />
    )
  }
  const maxSubsidyPrice = preprocessBaseLevelMerchantMaxSubsidy(
    detail.subsidyRule
  )
  const maxPrice = highlightPrice ? (
    <span className="text-red-400">{maxSubsidyPrice ?? '-'}</span>
  ) : (
    maxSubsidyPrice
  )

  const commissionRatio = highlightPrice ? (
    <span className="text-red-400">{detail?.commissionRatio ?? '-'}</span>
  ) : (
    detail?.commissionRatio
  )

  const expandLevel = (detail?.subsidyRule || []).find(
    (e) => e.scene === SubsidyLevelEnum.Expand
  )

  const outSite = (detail?.subsidyRule || []).find(
    (e) => e.scene === SubsidyLevelEnum.OutSite
  )
  const mtRules = (expandLevel?.rule || []).filter(
    (e) => e.condition.key === SubsidyConditionKeyEnum.ScChargeSidePoi
  )
  return (
    <div className={classNames('flex flex-col ', className)}>
      {disablePlanInfo ? (
        <></>
      ) : (
        <>
          <InfoField label="方案名称" content={detail.groupName} />
          <InfoField label="方案简介" content={detail.planIntro} />
        </>
      )}
      {/* <InfoField
        label="基础档位"
        content={
          <span>
            商家最高补贴
            {maxPrice}元，不限制订单券前价
          </span>
        }
      /> */}
      {maxSubsidyPrice ? (
        <InfoField
          label="基础档位"
          content={
            <span>
              商家最高补贴
              {maxPrice}元，不限制券门槛
            </span>
          }
        />
      ) : (
        <></>
      )}
      {expandLevel ? (
        <InfoField
          label={
            scene === MerchantMaxSubsidyScene.UnionCouponPlanView
              ? '补贴规则'
              : '膨胀档位'
          }
          content={
            <div
              className={classNames('flex', layout, {
                'items-start min-w-[600px]': layout === 'flex-row',
              })}
            >
              <div>
                <span className="text-sm mb-1">商家最高补贴:</span>
                <MerchantMaxSubsidyTable
                  highlightPrice={highlightPrice}
                  rules={detail.subsidyRule}
                  scene={scene}
                  subsidyConditionKey={subsidyConditionKey} // todo
                  subsidyScene={subsidyScene}
                />
              </div>
              {mtRules.length > 0 ? (
                <div
                  className={classNames({
                    'ml-7': layout === 'flex-row',
                    'mt-4': layout === 'flex-col',
                  })}
                >
                  <div className="text-sm mb-1">美团最低补贴</div>
                  <MtLowestSubsidyTable
                    highlightPrice={highlightPrice}
                    rules={detail.subsidyRule}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          }
        />
      ) : (
        <></>
      )}
      {outSite ? (
        <InfoField
          label="补贴规则"
          content={
            <div
              className={classNames('flex', 'flex-col', {
                'items-start min-w-[600px]': true,
              })}
            >
              <div className={classNames('flex', 'flex-row')}>
                <div className="text-sm mb-1">
                  商家佣金比例：{commissionRatio}%
                </div>
              </div>
              <div>
                <span className="text-sm mb-1">商家最高补贴:</span>
                <MerchantMaxSubsidyTable
                  highlightPrice={highlightPrice}
                  rules={detail.subsidyRule}
                  scene={scene}
                  subsidyConditionKey={subsidyConditionKey} // todo
                  subsidyScene={subsidyScene}
                />
              </div>
            </div>
          }
        />
      ) : (
        <></>
      )}
    </div>
  )
}
