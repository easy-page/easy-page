import { useEffect, useMemo, useRef } from 'react'
import { observer } from 'mobx-react'
import {
  actDetailModel,
  loadWaiMaSourceApplyListToModel,
  mccModel,
} from '@/common/models'
import { ActApplyResultParams, ZsptTab, toNumber } from '@/common'
import { useParamsInfo } from '@/common/hooks'
import { SupplierApplyResult } from './SupplierApplyResult'
import { SkuApplyResult } from './SkuApplyResult'
import './index.less'
import { WaiMaActInfo } from './WaiMaActInfo'
import { BasePoiActResultContainer } from '../common/containers'
import {
  CommonApplyResultTabTypeEnum,
  WaiMaResourceTabTypeMap,
} from '../common/constants'
import { CommonApplyResultContext } from '../common/hooks/commonApplyResultContext'

export const WaiMaResourceApplyResult = observer(() => {
  const { params } = useParamsInfo<ActApplyResultParams>()
  const actId = toNumber(params.activityId)
  const { data: actDetail } = actDetailModel.getData()
  const { data: mccData } = mccModel.getData()

  const tabRef: { current: any } = useRef()

  const [computedTabs, defaultTab] = useMemo(() => {
    return [
      [
        {
          id: CommonApplyResultTabTypeEnum.SUPPLIER_APPLY_RESULT,
          label: '供应商报名结果',
          closable: false,
          content: <SupplierApplyResult activityId={actId} />,
        },
        {
          id: CommonApplyResultTabTypeEnum.CATEGORY_OPERATE_CONFIRM_RESULT,
          label: '品类运营确认结果',
          closable: false,
          content: <SkuApplyResult activityId={actId} />,
        },
      ],
      CommonApplyResultTabTypeEnum.SUPPLIER_APPLY_RESULT,
    ]
  }, [actId])

  useEffect(() => {
    loadWaiMaSourceApplyListToModel({
      applyType:
        WaiMaResourceTabTypeMap[defaultTab] ||
        WaiMaResourceTabTypeMap[
          CommonApplyResultTabTypeEnum.SUPPLIER_APPLY_RESULT
        ],
      activityId: actId,
    })
  }, [defaultTab, actId, actDetail])

  return (
    <BasePoiActResultContainer>
      <CommonApplyResultContext.Provider
        value={{
          tabRef,
        }}
      >
        <WaiMaActInfo />
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
                loadWaiMaSourceApplyListToModel({
                  applyType: WaiMaResourceTabTypeMap[tab],
                  activityId: actId,
                })
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
