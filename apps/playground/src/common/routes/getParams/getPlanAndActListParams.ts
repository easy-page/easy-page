import { ActSubTabResources, OperationType, PlanSubTabResources, PlanTypeEnum } from "@/common/constants"
import { getQueryString, getQueryNumber } from "@/common/libs"

export const getOperationType = (): OperationType => {
  return getQueryString('operationType') as OperationType || OperationType.CREATE
}

export const getPlanType = (): PlanTypeEnum | null => {
  return getQueryNumber("planType")
}


export const getActFilterType = (): ActSubTabResources | null => {
  return getQueryNumber("actFilterType")
}

export const getPlanFilterType = (): PlanSubTabResources | null => {
  return getQueryNumber("planFilterType")
}


export const getActivityId = () => {
  // 活动结果页是后者，哎，先不改了，将就下
  return  getQueryNumber('actId') || getQueryNumber('activityId')
}


export const getPlanId = () => {
  return getQueryNumber('planId')
}


 