import { roleManager } from '@/common/roles/manager'
import { CreatePlanItem, GetCreatePlanItemContext } from './interface'
import { flatten, uniqWith } from 'lodash'
import { CreatePlanItemsMap } from './createItems'
import { BizLineEnum, getBizLine } from '@/common'

export const getCreatePlanItems = (
  context: GetCreatePlanItemContext
): CreatePlanItem[] => {
  const { userInfo } = context
  const bizLine = getBizLine() || BizLineEnum.WaiMai
  const roles = roleManager.getRoles({ userInfo, bizLine }) || []
  const hasAuthRes = uniqWith(
    flatten(
      roles.map((each) => {
        const itemInfos = CreatePlanItemsMap[each]
        const hasAuthItems = itemInfos.hasAuthItems.map((e) => e(context))
        return [...hasAuthItems]
      })
    ),
    (a, b) => a.title === b.title
  )

  const needToApplyRes = uniqWith(
    flatten(
      roles.map((each) => {
        const itemInfos = CreatePlanItemsMap[each]
        const needToApplyItems = (itemInfos.needApplyItems || []).map((e) => {
          const item = e(context)
          const applyInfo = itemInfos.applyInfo?.({ roleId: item.roleId }) || {}
          return {
            ...item,
            ...applyInfo,
          }
        })

        return [...needToApplyItems]
      })
    ),
    (a, b) => a.title === b.title
  )

  return [
    ...hasAuthRes,
    ...needToApplyRes.filter(
      (item) => !hasAuthRes.map((each) => each.roleId).includes(item.roleId)
    ),
  ].filter((e) => e.bizLine === bizLine)
}
