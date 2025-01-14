import { FlowNodeGroupEnum } from '@/common'
import { FlowNode } from '@/common/apis/saveAct/interfaces/workflow'
import { SearchRuleId } from '../../constants'

export const hasFlowNode = (
  nodes: FlowNode[],
  curNodeGroupEnum: FlowNodeGroupEnum
) => {
  return (nodes || []).some((item) => item.flowNodeGroup === curNodeGroupEnum)
}

/** 展示子活动相关信息条件判断 */
export const showChildActs = (template: any) => {
  return template?.feProperties?.activityConfig?.isSupportSubAct
}

export type ShowSearchFilterRule = Record<SearchRuleId, boolean>
export const showSearchFilters = (template?: any): ShowSearchFilterRule => {
  const { filters = [] } =
    template?.feProperties?.applyResultConfig || ({} as any)
  const config: ShowSearchFilterRule = {} as ShowSearchFilterRule
  Object.values(SearchRuleId).map((e: SearchRuleId) => {
    config[e] = filters.includes(e)
  })
  return config
}

export const ShowContent = (props: {
  children: any
  /** 数组中都为 True 则展示 */
  whenShow: Array<boolean>
}) => {
  const { children, whenShow } = props
  const show = whenShow.every((e) => e)
  if (show) {
    return children
  }
  return <></>
}
