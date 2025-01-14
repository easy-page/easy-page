import { MccKeysEnum } from '@/common/constants'
import { RequestHandler, postReq, toJson } from '@/common/libs'

export type GetMccParams = {
  keys: MccKeysEnum[]
}

export type MccData = Record<MccKeysEnum, any>

const toNumberMccs = (keys: MccKeysEnum[], result: Partial<MccData>) => {
  keys.forEach((each) => {
    // const key = camelCase(each);
    result[each] = Number(result[each])
  })
  return result
}

const toJsonMccs = (keys: MccKeysEnum[], result: Partial<MccData>) => {
  keys.forEach((each) => {
    // const key = camelCase(each);
    result[each] = toJson(result[each])
  })
  return result
}

const toStringMccs = (keys: MccKeysEnum[], result: Partial<MccData>) => {
  keys.forEach((each) => {
    // const key = camelCase(each);
    result[each] = String(result[each])
  })
  return result
}

const prepareMccData = (data?: Record<string, any>) => {
  if (!data) {
    return {}
  }
  // mapKeys(data, (val, key) => camelCase(key))
  // camal 后不好取
  const result: Partial<MccData> = data

  /** 特殊转成number */
  toNumberMccs(
    [
      MccKeysEnum.AmountLimit4SubActivity,
      MccKeysEnum.MaxExpandLevel,
      MccKeysEnum.ShenhuiyuanMaxSubPlan,
    ],
    result
  )

  toJsonMccs(
    [
      MccKeysEnum.ShenhuiyuanBizlineOptions,
      MccKeysEnum.DownloadActListTemplate,
      MccKeysEnum.OrganizationConfig,
      MccKeysEnum.FactorAssociationRulesMap,
      MccKeysEnum.MigrateActWhiteList,
    ],
    result
  )

  toStringMccs(
    [MccKeysEnum.ShyConditionExitPoiSwitch, MccKeysEnum.ShyPoiBrandApplySwitch],
    result
  )

  // 如果用户设置了0，默认为 1
  if (MccKeysEnum.AmountLimit4SubActivity) {
    result[MccKeysEnum.AmountLimit4SubActivity] =
      result[MccKeysEnum.AmountLimit4SubActivity] || 1
  }

  return result
}

export const getMcc: RequestHandler<GetMccParams, Partial<MccData>> = async (
  params: GetMccParams
) => {
  const result = await postReq('/api/zspt/operation/common/queryMcc', params)
  return {
    ...result,
    data: prepareMccData(result.data),
  }
}
