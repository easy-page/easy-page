import { OperationFactorItem } from "@/common/apis";
import { Qualify } from "@/common/apis/saveAct/interfaces/qualify";

/** 从默认值获得选中的因子 */
export const getDimensionDefaultChoosedFactors = ({ value, searchOptions }: { value: Qualify, searchOptions: OperationFactorItem[] }) => {
  const factorsMap = value?.dataCollector || {};
  const factorCodes = Object.keys(factorsMap);
  const factors: OperationFactorItem[] = []
  factorCodes.forEach(factorCode => {
    const factor = searchOptions.find(
      item => item.factorCode === factorCode
    )

    if (factor) {
      factors.push({ ...factor })
    } else {
      console.log(`删除已下线因子 ${factorCode} 的值`)
      delete factorsMap[factorCode]
    }
  })
  return factors
}