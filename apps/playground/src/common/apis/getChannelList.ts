import { RequestHandler, postReq } from "@/common/libs"
import { Empty } from "@easy-page/antd-ui"

// 渠道列表
export interface IChannelListItem {
  // 渠道ID
  channelId: string
  // 渠道名称
  channelName: string
  // 商家数量
  poiCount: number | null
}
// 渠道
export interface IChannelListResponse {
  // 渠道类型ID
  channelTypeId: number
  // 渠道类型名称
  channelTypeName: string
  // 渠道列表
  channelVOList: IChannelListItem[]
}

export const getChannelList: RequestHandler<Empty, IChannelListResponse[]> = () => {
  return postReq('/api/zspt/operation/invitation/queryChannelList', {})
}