import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Loading } from '@roo/roo'
import {
  actDetailModel,
  loadWmDiscountActStatisticToModel,
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
import { useParamsInfo } from '@/common/hooks'
import { SkuApplyResult } from './SkuApplyResult'
import { BrandApplyResult } from './BrandApplyResult'
import { CommonApplyResultContext } from '../common'
import { SkuApplyResultActInfo } from '../common/components'
import {
  BasePoiActResultContainer,
  TabTypeToStatisticMap,
} from '../common/containers'
import { CommonApplyResultTabTypeEnum } from '../common/constants'
import './index.less'

export const WmDiscountApplyResult = observer(() => {
  const { params } = useParamsInfo<ActApplyResultParams>()
  const actId = toNumber(params.activityId)
  const { data: actDetail } = actDetailModel.getData()
  const tabRef: { current: any } = useRef()

  const { data: mccData } = mccModel.getData()

  const [computedTabs, defaultTab] = useMemo(() => {
    if (!actDetail || !actDetail.invitation) {
      return [[], '']
    }

    const { shy_poi_brand_apply_switch } = mccData || {}
    const { invitation } = actDetail
    const { dataType } = invitation

    // 邀请方式为，按照品牌维度邀请，并且未降级，可见两个tab   本期只有一个Tab
    // if (
    //   dataType === DataTypeEnum.MerchantBrand &&
    //   String(shy_poi_brand_apply_switch) === 'true'
    // ) {
    //   return [
    //     [
    //       {
    //         id: CommonApplyResultTabTypeEnum.SKU_APPLY_RESULT,
    //         label: '商品维度报名结果',
    //         closable: false,
    //         content: <SkuApplyResult activityId={actId} />,
    //       },
    //       // {
    //       //   id: CommonApplyResultTabTypeEnum.BRAND_APPLY_RESULT,
    //       //   label: '业务品牌维度报名结果',
    //       //   closable: false,
    //       //   content: <BrandApplyResult activityId={actId} />,
    //       // },
    //     ],
    //     CommonApplyResultTabTypeEnum.BRAND_APPLY_RESULT,
    //   ]
    // }

    return [
      [
        {
          id: CommonApplyResultTabTypeEnum.SKU_APPLY_RESULT,
          label: '商品维度报名结果',
          closable: false,
          content: <SkuApplyResult activityId={actId} />,
        },
      ],
      CommonApplyResultTabTypeEnum.SKU_APPLY_RESULT,
    ]
  }, [actDetail, actId, mccData])

  useEffect(() => {
    if (!actDetail || !actDetail.invitation) {
      return
    }

    loadWmDiscountActStatisticToModel(
      actId,
      TabTypeToStatisticMap[defaultTab] ||
        TabTypeToStatisticMap[CommonApplyResultTabTypeEnum.SKU_APPLY_RESULT]
    )
  }, [defaultTab, actId, actDetail])

  return (
    <BasePoiActResultContainer>
      <CommonApplyResultContext.Provider
        value={{
          tabRef,
        }}
      >
        <SkuApplyResultActInfo actDetail={actDetail} />
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
                loadWmDiscountActStatisticToModel(
                  actId,
                  TabTypeToStatisticMap[tab]
                )
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
