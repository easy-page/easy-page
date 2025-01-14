import { ActTypeEnum } from '../constants'
import { mccModel, userModel } from '../models'

export type WhiteListType = Record<ActTypeEnum, string[]>

/**
 * 用来临时做灰度百名单控制
 */
export const inWhiteList = (actType: ActTypeEnum) => {
  if (!actType) {
    return true
  }
  const { data: userInfo } = userModel.getData()
  const userMis = userInfo.mis || ''
  const {
    data: { migrate_act_white_list },
  } = mccModel.getData()
  const whiteList = migrate_act_white_list?.[actType] as string[]
  if (!whiteList || whiteList.length === 0) {
    return true
  }
  console.log('userMis:', userMis, 'whiteList:', whiteList)
  return whiteList.includes(userMis)
}
