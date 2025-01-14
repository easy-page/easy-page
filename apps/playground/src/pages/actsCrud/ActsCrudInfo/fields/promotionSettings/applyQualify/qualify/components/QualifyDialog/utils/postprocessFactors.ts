import { OperationFactorItem } from "@/common/apis";
import { Qualify } from "@/common/apis/saveAct/interfaces";

export const postprocessFactor = (choosed: OperationFactorItem[]): Qualify => {
  const result: Qualify = {
    dataCollector: {

    }
  }
  choosed.forEach(each => {
    result.dataCollector[each.categoryCode] = result.dataCollector[each.categoryCode] || []
    result.dataCollector[each.categoryCode].push(each);
  })

  return result;
}