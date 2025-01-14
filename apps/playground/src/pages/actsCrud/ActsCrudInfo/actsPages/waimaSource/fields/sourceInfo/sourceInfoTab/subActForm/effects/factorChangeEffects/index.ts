import {
  EasyPageOnChangeContext,
  FormUtil,
  getChildrenOriginFormData,
} from '@easy-page/antd-ui'

import { CategoryCode, FeExtend, Qualify, toJson } from '@/common'
import {
  CommonSubActPageState,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

const toFactorValue = (factor: string) => {
  const factorJson = toJson(factor)
  const feExtend: FeExtend = toJson(factorJson.feExtend, { defaultValue: {} })
  if (!factorJson) {
    return undefined
  }
  return {
    ...factorJson,
    feExtend,
  } as { feExtend: { factorCategoryCode: CategoryCode } }
}

/**
 * - 将 SyncFactorCodes 里的因子同步给新活动
 * @param values
 * @param curId
 * @returns
 */
export const syncFactorsForNewAct = ({
  defaultVals,
  curId,
  formUtils,
}: {
  defaultVals: Record<string, Record<string, any>>
  curId: string
  formUtils: Record<string, FormUtil<Record<string, any>>>
}) => {
  const childFormDefaultVals = Object.values(defaultVals)
  const values = getChildrenOriginFormData(formUtils)
  if (childFormDefaultVals.length === 0 && values.length === 0) {
    return {}
  }
  const first = values[0] || childFormDefaultVals[0]
  const firstDataCollector = first?.['qualify']?.dataCollector || {}
  const firstSubActChoosedFactors = Object.keys(firstDataCollector)

  const curDefaultVal = defaultVals[curId] || {}

  curDefaultVal['qualify'] = curDefaultVal['qualify'] || {}
  curDefaultVal['qualify'].dataCollector =
    curDefaultVal['qualify'].dataCollector || {}
  const dataCollector = curDefaultVal['qualify'].dataCollector
  firstSubActChoosedFactors.forEach((each) => {
    const factor = toFactorValue(firstDataCollector[each])
    if (!factor || factor.feExtend?.factorCategoryCode !== CategoryCode.Poi) {
      return
    }
    if (!dataCollector[each] && firstDataCollector[each]) {
      dataCollector[each] = firstDataCollector[each]
    }
  })
  console.log(
    'firstSubActChoosedFactorsfirstSubActChoosedFactors:',
    curDefaultVal['qualify']
  )
  return curDefaultVal
}

export const factorChangeEffects: (
  context: EasyPageOnChangeContext<CommonSubActPageState> & {
    parentFormUtil?: FormUtil<CommonActCrudFormState>
  }
) => void = ({ parentFormUtil, value }) => {
  const { subActivity } =
    parentFormUtil?.getOriginFormData() as CommonActCrudFormState

  if (!subActivity) {
    return {}
  }
  const { formUtils } = subActivity
  Object.values(formUtils || {}).map((e, idx) => {
    setTimeout(() => {
      const curSub = e.getOriginFormData()
      const curQualify = curSub.qualify
      const newQualify = {
        ...(curQualify?.dataCollector || {}),
      }
      const latestDataCollector = value?.qualify?.dataCollector
      const latestSubActChoosedFactors = Object.keys(latestDataCollector)

      latestSubActChoosedFactors.forEach((x) => {
        const latestQualify = toFactorValue(latestDataCollector?.[x])
        if (
          !latestQualify ||
          latestQualify.feExtend?.factorCategoryCode !== CategoryCode.Poi
        ) {
          return
        }

        if (latestDataCollector?.[x] !== undefined) {
          newQualify[x] =
            latestDataCollector?.[x] || curQualify?.dataCollector?.[x]
        } else {
          delete newQualify[x]
        }
      })

      e.setField('qualify', {
        collectorId: curQualify?.collectorId,
        dataCollector: newQualify,
      } as Qualify)
    }, 0)
  })
}
