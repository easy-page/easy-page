import { ChildFormState, EasyPageOnChangeContext, FormUtil, generateId } from "@easy-page/antd-ui";
import { ShenhuiyuanFormState } from "../interface";
import { RuleTableSuffix, SubsidyRuleEnum } from "../common/constant";
import type { RuleTableFormState } from "../fields/promotionSettings/subsidy/subsidyRuleTable";

export const runSbsidyRuleInfoEffects = ({ formUtil, value }: EasyPageOnChangeContext<ShenhuiyuanFormState>) => {
  if (formUtil) {
    const hasPeriod = value.subsidyRuleInfo?.includes(
      SubsidyRuleEnum.Period,
    );
    const ruleTable = (formUtil.getFieldValue('ruleTable') || {}) as ChildFormState<RuleTableFormState>
    // 选择时段时，增加时段行
    if (hasPeriod && ruleTable?.childForms?.length === 2) {

      formUtil.setField('ruleTable', {
        ...ruleTable,
        childForms: [
          ...ruleTable.childForms,
          {
            id: generateId(RuleTableSuffix),
            label: '',
          },
        ],
      }, { validate: false })
      return;
    }
    // 不选择时段时，去掉时段行
    if (!hasPeriod && ruleTable.childForms?.length > 2) {
      const newFormUtils: Record<
        string,
        FormUtil<RuleTableFormState>
      > = {};
      const newChildForms = ruleTable.childForms.slice(0, 2);
      newChildForms.forEach((e) => {
        newFormUtils[e.id] = ruleTable.formUtils?.[e.id];
      });
      formUtil.setField('ruleTable', {
        ...ruleTable,
        formUtils: newFormUtils,
        childForms: newChildForms,
      }, { validate: false })
      return
    }
  }
}