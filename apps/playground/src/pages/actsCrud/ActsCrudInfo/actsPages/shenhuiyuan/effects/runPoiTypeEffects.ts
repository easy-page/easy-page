import { EasyPageOnChangeContext } from "@easy-page/antd-ui";
import { ShenhuiyuanFormState } from "../interface";
import { getDefaultRuleTableState } from "../common/constant";

export const runPoiTypeEffects = ({ formUtil }: EasyPageOnChangeContext<ShenhuiyuanFormState>) => {
  if (formUtil) {
    // 清空
    formUtil.setField('ruleTable', getDefaultRuleTableState(), { validate: false });
  }
}