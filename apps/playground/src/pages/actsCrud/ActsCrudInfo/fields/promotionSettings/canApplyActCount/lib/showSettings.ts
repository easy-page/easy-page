import { WhenType } from "@easy-page/antd-ui";
import { CanApplyActLimit } from "../fields/restrict";
import { CommonActCrudFormState, CommonActCrudFormProps } from "../../../interface";

export const showSettings: WhenType<string, CommonActCrudFormState,
  CommonActCrudFormProps> = {
  effectedKeys: ['subactivityRule.isRestrict'],
  show({ effectedData }) {
    console.log('effectedData:', effectedData);
    return (
      effectedData['subactivityRule.isRestrict']?.choosed ===
      CanApplyActLimit.Limit
    );
  },
};
