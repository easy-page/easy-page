import { useRef } from 'react'
import { observer } from 'mobx-react'
import { actDetailModel } from '@/common/models'
import {
  BasePoiActResultContainer,
  CommonApplyResultContext,
} from '@/pages/actApplyResult/ActApplyResultInfo/common'
import { ActConfimGoodsInfo } from './ActConfimGoodsInfo'
import './index.less'

export const WaiMaConfimGoods = observer(() => {
  const { data: actDetail } = actDetailModel.getData()
  
  const tabRef: { current: any } = useRef()
  return (
    <BasePoiActResultContainer>
      <CommonApplyResultContext.Provider
        value={{
          tabRef,
        }}
      >
        <ActConfimGoodsInfo actDetail={actDetail} />
      </CommonApplyResultContext.Provider>
    </BasePoiActResultContainer>
  )
})
