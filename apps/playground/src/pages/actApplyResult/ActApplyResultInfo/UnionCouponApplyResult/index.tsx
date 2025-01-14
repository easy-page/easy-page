import { observer } from 'mobx-react'
import { ActInfo } from '../common/components'
import {
  actDetailModel,
  loadActStatisticToModel,
  mccModel,
} from '@/common/models'
import {
  ActApplyResultParams,
  DataTypeEnum,
  MccKeysEnum,
  ZsptTab,
  getMcc,
  toNumber,
} from '@/common'
import { PoiApplyResult } from './PoiApplyResult'
import { useParamsInfo } from '@/common/hooks'
import {
  BasePoiActResultContainer,
  TabTypeToStatisticMap,
} from '../common/containers'
import { CommonApplyResultTabTypeEnum } from '../common/constants'
import './index.less'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CommonApplyResultContext } from '../common/hooks/commonApplyResultContext'

export const UnionCouponApplyResult = observer(() => {
  const { params } = useParamsInfo<ActApplyResultParams>()
  const actId = toNumber(params.activityId)
  const { data: actDetail } = actDetailModel.getData()
  const tabRef: { current: any } = useRef()

  const { data: mccData } = mccModel.getData()

  const [computedTabs, defaultTab] = useMemo(() => {
    if (!actDetail || !actDetail.invitation) {
      return [[], '']
    }

    // const { shy_poi_brand_apply_switch } = mccData || {}
    const { invitation } = actDetail
    const { dataType } = invitation

    // 邀请方式为，按照品牌维度邀请，并且未降级，可见两个tab
    // if (
    //   dataType === DataTypeEnum.MerchantBrand &&
    //   String(shy_poi_brand_apply_switch) === 'true'
    // ) {
    //   return [
    //     [
    //       {
    //         id: CommonApplyResultTabTypeEnum.POI_APPLY_RESULT,
    //         label: '商家维度报名结果',
    //         closable: false,
    //         content: <PoiApplyResult activityId={actId} />,
    //       },
    //       {
    //         id: CommonApplyResultTabTypeEnum.BRAND_APPLY_RESULT,
    //         label: '业务品牌维度报名结果',
    //         closable: false,
    //         content: <BrandApplyResult activityId={actId} />,
    //       },
    //     ],
    //     CommonApplyResultTabTypeEnum.BRAND_APPLY_RESULT,
    //   ]
    // }

    return [
      [
        {
          id: CommonApplyResultTabTypeEnum.POI_APPLY_RESULT,
          label: '商家维度报名结果',
          closable: false,
          content: <PoiApplyResult activityId={actId} />,
        },
      ],
      CommonApplyResultTabTypeEnum.POI_APPLY_RESULT,
    ]
  }, [actDetail, actId, mccData])

  useEffect(() => {
    if (!actDetail || !actDetail.invitation) {
      return
    }

    loadActStatisticToModel(
      actId,
      TabTypeToStatisticMap[defaultTab] ||
        TabTypeToStatisticMap[CommonApplyResultTabTypeEnum.POI_APPLY_RESULT]
    )
  }, [defaultTab, actId, actDetail])

  return (
    <BasePoiActResultContainer>
      <CommonApplyResultContext.Provider
        value={{
          tabRef,
        }}
      >
        <ActInfo actDetail={actDetail} />
        <div className="mt-4">
          <ZsptTab
            ref={tabRef}
            tabProps={{
              size: 'large',
              type: 'editable-card',
              className: 'act-res-tab',
              destroyInactiveTabPane: true,
              hideAdd: true,
              onChange: (tab) => {
                loadActStatisticToModel(actId, TabTypeToStatisticMap[tab])
              },
            }}
            tabs={computedTabs}
            defaultTab={defaultTab}
          ></ZsptTab>
        </div>
      </CommonApplyResultContext.Provider>
    </BasePoiActResultContainer>
  )
})
