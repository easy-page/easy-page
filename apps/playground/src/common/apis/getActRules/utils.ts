import { camelCase } from 'lodash'
import { sortError } from './sortError'
import {
  ColumnInfo,
  ProductSelectionFromBackend,
  ProductSelection,
} from '../saveAct'

export const PAGE_SIZE = 100
export const DEFAULT_PAGE_NO = 1

export const getPageNoByIdx = (rowIdx: number) => {
  return Math.floor(rowIdx / PAGE_SIZE) + 1
}

export const getUploadText = (options: {
  uploaded: boolean
  loading: boolean
}) => {
  const { loading, uploaded } = options
  if (loading) {
    return '上传中'
  }
  if (!uploaded) {
    return '上传完整规则'
  }
  return '重新上传'
}

enum SubsidyType {
  DIRECT = 'direct',
  AGENT = 'agent',
}

const getSubsidyColumnInfos = (
  data: ColumnInfo[],
  subsidy: SubsidyType
): ColumnInfo[] => {
  return (data || [])
    .filter((e) => e.ruleKey.startsWith(subsidy))
    .map((e) => ({
      ruleKey: e.ruleKey.slice(subsidy.length + 1),
      ruleValue: e.ruleValue,
    }))
}

/** 将对应字段 ruleKey 驼峰一下，转成 Map */
const convertColumnInfoToLocal = (data: ColumnInfo[]) => {
  const result: Record<string, string> = {}
  data.forEach((each) => {
    result[camelCase(each.ruleKey)] = each.ruleValue
  })
  return result
}

/** 错误的 key 也需要转换 */
const convertErrorKey = (key: string) => {
  // 去掉 prefix_ 前缀，如：agent_
  const removePrefix = (prefix: string) =>
    camelCase(key.slice(prefix.length + 1))
  if (key.startsWith(SubsidyType.DIRECT)) {
    return `directSubsidy.${removePrefix(SubsidyType.DIRECT)}`
  }
  if (key.startsWith(SubsidyType.AGENT)) {
    return `agentSubsidy.${removePrefix(SubsidyType.AGENT)}`
  }
  return camelCase(key)
}

export const convertProductionSelectionToLocal = (
  isAct: boolean,
  data?: ProductSelectionFromBackend[]
) => {
  const result: ProductSelection[] = []
  ;(data || []).forEach((each) => {
    const directSubsidy = getSubsidyColumnInfos(each.charge, SubsidyType.DIRECT)
    const agentSubsidy = getSubsidyColumnInfos(each.charge, SubsidyType.AGENT)
    result.push({
      childActName: each.name,
      id: each.id,
      lineNumber: each.lineNumber,
      ...convertColumnInfoToLocal(each.policy || []),
      ...convertColumnInfoToLocal(each.sku || []),
      ...convertColumnInfoToLocal(each.discount || []),
      directSubsidy: { ...convertColumnInfoToLocal(directSubsidy) },
      agentSubsidy: { ...convertColumnInfoToLocal(agentSubsidy) },
      errors: sortError(
        (each.error || []).map((e) => ({
          id: convertErrorKey(e.ruleKey),
          msgs: e.msgs,
        })),
        isAct
      ),
    } as ProductSelection)
  })
  console.log('rrrrrrr:', result, data)
  return result
}
