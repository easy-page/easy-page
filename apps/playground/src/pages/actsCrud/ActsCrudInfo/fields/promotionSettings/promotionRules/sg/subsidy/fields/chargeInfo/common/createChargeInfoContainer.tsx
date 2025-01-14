import { nodeUtil } from '@easy-page/antd-ui'
import { BlockColorHeader } from '@/common/components/zspt/BlockColorHeader'
import { PoiTypeEnum } from '@/common'

import { useEffect, useMemo } from 'react'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  CommonSubActPageProps,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export type GetSubsidyTitle = (options: { poiType: PoiTypeEnum }) => string

export const createChargeInfoContainer = (options: {
  getSubsidyTitle: GetSubsidyTitle
  tips?: string
}) =>
  nodeUtil.createContainer<
    CommonActCrudFormState,
    CommonActCrudFormProps & CommonSubActPageProps
  >(
    'charge-info-container',
    ({ children, frameworkProps: { store } }) => {
      const pageProps = store.getPageProps()
      const poiType = pageProps.poiType
      const actTimeRange = pageProps['promotionTime.timeRange']

      const showTips = useMemo(
        () => !poiType || !actTimeRange || actTimeRange.length !== 2,
        [poiType, actTimeRange]
      )

      // const showChargeSide = Boolean(poiType)
      return (
        <div className={'flex flex-col mb-4'}>
          {/* {showChargeSide ? (
            <>
              <BlockColorHeader title={options.getSubsidyTitle({ poiType })} />
              <div className="w-full px-4">{children}</div>
            </>
          ) : (
            <></>
          )} */}
          {showTips ? (
            <div className="text-[#FF0000]">
              {options.tips || '请先选择邀请门店类型、补贴类型、活动生效时间'}
            </div>
          ) : (
            <>
              <BlockColorHeader title={options.getSubsidyTitle({ poiType })} />
              <div className="w-full px-4">{children}</div>
            </>
          )}
        </div>
      )
    },
    {
      effectedKeys: ['poiType', 'promotionTime.timeRange'],
      childrenUIConfig: {
        formItem: {
          labelCol: { span: 6 },
          wrapperCol: { span: 12 },
        },
      },
    }
  )
