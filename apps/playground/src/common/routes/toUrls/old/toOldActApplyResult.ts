import { ActListScene, BizLineEnum } from '@/common/constants'
import { openInUocEntry } from '@/common/libs'
import { ToPageHandler } from '../../interface'
import { UrlEnum } from '../../urls'
import { appendParamsToUrl } from '../../utils'
import { message } from 'antd'

export enum OldActApplyResultParamsEnum {
  ActId = 'activityId',
  Bizline = 'bizLine',
  TabValue = 'tabValue',
}

export type OldActApplyResultParams = {
  /** 加入方案列表页新建、编辑、查看活动需要传，本质就是 group.id */
  tabValue?: number

  /** 通用参数 */
  activityId: string

  /** 通用参数 */
  bizLine: BizLineEnum
  /** 不同的场景，参数传递不一样 */
  sence: ActListScene
}

export const toOldActApplyResult: ToPageHandler<OldActApplyResultParams> = (
  params,
  target
) => {
  const { sence, ...rest } = params
  const toUrlMap: Record<ActListScene, () => void> = {
    [ActListScene.Home]: function (): void {
      openInUocEntry(appendParamsToUrl(UrlEnum.OldActApplyResult, rest), target)
    },
    [ActListScene.CrudPlan]: function (): void {
      console.log('老活动无此场景')
    },
    [ActListScene.JoinPlan]: function (): void {
      openInUocEntry(appendParamsToUrl(UrlEnum.OldActApplyResult, rest), target)
    },
  }
  if (!toUrlMap[sence]) {
    message.error('未配置此场景跳转')
    return
  }
  return toUrlMap[sence]()
}
