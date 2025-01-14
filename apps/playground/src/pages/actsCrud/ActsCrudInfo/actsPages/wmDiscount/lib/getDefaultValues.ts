import {  isCopy, isCreate, isEdit, isView } from "@/common";
import {  ActFullInfo, PromotionKey,  } from "@/common/apis";
import { cloneDeep, set } from "lodash";

export type GetActDefaultValueOption = { actDetail?: ActFullInfo; };
const getCopyDefaultValues = ({ actDetail }: GetActDefaultValueOption): Record<string, any> => {
 
  const defaultValues = cloneDeep(actDetail || {}) as ActFullInfo

  set(defaultValues, 'activity.name', '副本-' + actDetail?.activity?.name);
  set(defaultValues, 'invitation.inputData', '');
  (defaultValues?.subActivity || []).forEach(subAct => {
    (subAct.contentList || []).forEach(each => {
      const {keyList} = each
      const newKeyList =  keyList.map((item)=>{
        if([PromotionKey.AgentSubsidyRatio, PromotionKey.AgentSubsidyMax].includes(item.key)){
          return {
            ...item,
            maxValue: '',
            minValue:''
          }
        }
        return item
      })
      each.keyList = newKeyList
      each.subsidy = { chargeDetailVos: [] }
    })
  })
  return defaultValues;
}


export const getWdActDefaultValues = ({ actDetail }: GetActDefaultValueOption): Record<string, any> => {
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