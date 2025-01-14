import { generateId } from "@easy-page/antd-ui";

export enum SubsidyRuleEnum {
  AllDay = 'allDay',
  UserGroup = 'userGroup',
  Period = 'period'
}

export const DefaultRuleInfoState = [SubsidyRuleEnum.UserGroup, SubsidyRuleEnum.AllDay]

export const RuleTableSuffix = 'rule-table';

export const getDefaultRuleTableState = () => {
  const id = generateId(RuleTableSuffix);
  return {
    childForms: [
      {
        id: id,
        label: '',
      },
      {
        id: generateId(RuleTableSuffix),
        label: '',
      },
    ],
    formUtils: {},
    childFormDefaultValues: {},
    choosedItemId: id,
  }
}
