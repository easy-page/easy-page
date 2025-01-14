import React from 'react'
import './index.less'
export const CommonTips = (props: { count: number }) => {
  return (
    <div className="common-tips">
      <div className="common-tips-desc">
        如对列表数据进行过筛选，则只针对所筛选的活动生效。根据当前条件，将对
        &nbsp;{props.count ?? '-'} 条数据进行处理。
      </div>
      <div className="common-tips-warning">
        审核结果，请以最终的大象消息为准
      </div>
    </div>
  )
}
