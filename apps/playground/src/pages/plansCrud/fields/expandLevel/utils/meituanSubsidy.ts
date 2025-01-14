import { SubsidyChargeKeyEnum, SubsidyConditionKeyEnum, SubsidyLevelEnum, SubsidyOptEnum, SubsidyRule } from '@/common';
import { MeituanLowestSubsidyFormState } from '../../subPlan';
// import { MeituanLowestSubsidyFormState } from '../../../../interface';

// 参考 API 文档做数据结构处理：https://km.sankuai.com/collabpage/2259900246
export const postprocessMeituanSubsidy = (subsidyRules: SubsidyRule[], data: Partial<MeituanLowestSubsidyFormState>[]): SubsidyRule[] => {
  const expandLevel = subsidyRules.find(e => e.scene === SubsidyLevelEnum.Expand);

  if (!expandLevel) {
    throw Error('请将“商家最高补贴”字段放在“美团最低补贴”之前')
  }


  expandLevel.rule = expandLevel.rule || [];
  data.forEach((each, idx) => {
    const isLastLine = idx === data.length - 1;
    const nextLine = isLastLine ? undefined : data[idx + 1];
    expandLevel.rule.push({
      condition: {
        key: SubsidyConditionKeyEnum.ScChargeSidePoi,
        opt: isLastLine ? SubsidyOptEnum.Ge : SubsidyOptEnum.LcRoInterval,
        minValue: each.merchantRequestPrice,
        maxValue: nextLine?.merchantRequestPrice || ''
      },
      charge: [{
        key: SubsidyChargeKeyEnum.ChargeSideMt,
        opt: SubsidyOptEnum.Ge,
        minValue: each.meituanSubsidyPrice,
        maxValue: ""
      }]
    })
  })
  return subsidyRules
}

