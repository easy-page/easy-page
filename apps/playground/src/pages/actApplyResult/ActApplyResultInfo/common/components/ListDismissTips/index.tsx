import React from 'react'
import './index.less'
import { PoiListDismissCountRes } from '@/common/apis/getPoiListDismissCount'
export const ListDismissTips = (props: {
  countInfo: PoiListDismissCountRes
}) => {
  const { totalCount, exitCount } = props.countInfo

  return (
    <div className="common-tips">
      <div className="common-tips-desc">
        清退后活动将失效，不可恢复，请谨慎操作!
      </div>
      <div className="common-tips-desc">
        当前选中门店数<span className="text-[#fb3b2b]">{totalCount}</span>
        个，预计可清退门店数
        <span className="text-[#fb3b2b]">{exitCount}</span>个
      </div>
      <div className="common-tips-warning">最终清退结果以大象消息为准</div>
    </div>
  )
}
