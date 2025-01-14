import { DataCollector, Qualify } from '../../saveAct/interfaces'

export const getChoosedFactorCodes = (choosedFactors: Qualify) => {
  if (!choosedFactors?.dataCollector) {
    return []
  }
  const factors = choosedFactors?.dataCollector || ({} as DataCollector)

  return Object.keys(factors)
}
