import {  isCopy, isCreate, isEdit, isView } from "@/common";
import {  ActFullInfo,  } from "@/common/apis";
import { cloneDeep, set } from "lodash";

 

export type GetActDefaultValueOption = { actDetail?: ActFullInfo; };
const getCopyDefaultValues = ({ actDetail }: GetActDefaultValueOption): Record<string, any> => {
 
  const defaultValues = cloneDeep(actDetail || {}) as ActFullInfo

  set(defaultValues, 'activity.name', '副本-' + actDetail?.activity?.name);
  set(defaultValues, 'invitation.inputData', '');
  set(defaultValues, 'actRule', null);
  set(defaultValues, 'budgetControl', []);
  return defaultValues;
}


export const getCsActDefaultValues = ({ actDetail }: GetActDefaultValueOption): Record<string, any> => {
  if (isCreate()) {
    return {}
  }
  if (isEdit()|| isView()) {
    return actDetail || {}
  }

  if (isCopy()) {
    return getCopyDefaultValues({ actDetail });
  }
}