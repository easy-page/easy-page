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

export const createWmChargeInfoContainer = (options: {
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

      const showTips = !poiType

      // const showChargeSide = Boolean(poiType)
      return (
        <div className={'flex flex-col mb-4'}>
          <BlockColorHeader title={options.getSubsidyTitle({ poiType })} />
          <div className="w-full px-4">
            {showTips ? (
              <div className="text-[#FF0000]">
                {options.tips || '请先选择基础信息-邀请门店类型'}
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      )
    },
    {
      effectedKeys: ['poiType'],
      childrenUIConfig: {
        formItem: {
          labelCol: { span: 4 },
          wrapperCol: { span: 12 },
        },
      },
    }
  )
