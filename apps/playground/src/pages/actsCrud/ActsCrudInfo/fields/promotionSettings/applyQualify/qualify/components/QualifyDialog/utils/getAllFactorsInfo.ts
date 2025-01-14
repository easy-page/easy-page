import { FactorInfo, OperationFactorItem } from "@/common/apis";

export const getAllFactors = (factors: FactorInfo) => {
  const curFactors: OperationFactorItem[] = [];
  const categories = Object.keys(factors.fullInfo || {});
  categories.forEach((category) => {
    const categoryFactor =
      factors.fullInfo[category as keyof typeof factors.fullInfo];
    const labelList = categoryFactor?.labelList || [];
    labelList.forEach((each) => {
      if (each.list && categoryFactor) {
        const temp: OperationFactorItem[] = each.list.map((e) => ({
          ...e,
          categoryCode: categoryFactor.code,
          categoryTitle: categoryFactor.name,
        }));
        curFactors.push(...temp);
      }
    });
  });
  return curFactors;
};
