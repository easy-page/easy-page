import {
  ActFullInfo,
  BusinessPartition,
  GetPlanDetailResult,
  OperationType,
  SubMarketingPlanStatus,
  UserInfo,
  getOperationType,
} from '@/common'
import { cloneDeep, set } from 'lodash'

// 子方案是否邀请了自己
const hasInviteMe = ({
  userInfo,
  businessPartition,
}: {
  businessPartition?: BusinessPartition[]
  userInfo: UserInfo
}) => {
  if (!businessPartition || businessPartition.length === 0) {
    return false
  }
  const orgMis = businessPartition[0].oriMisId || []
  return orgMis.includes(userInfo.mis)
}

export type GetPlanDefaultValueOption = {
  planDetail?: GetPlanDetailResult
  userInfo: UserInfo
}

const getCopyDefaultValues = ({
  planDetail,
  userInfo,
}: GetPlanDefaultValueOption): Record<string, any> => {
  const defaultValues = cloneDeep(planDetail || {}) as GetPlanDetailResult
  console.log('defaultValues胡雪测试', defaultValues)
  // set(defaultValues, 'invitation.inputData', '');
  set(defaultValues, 'name', '副本-' + planDetail?.name)

  // defaultValues.group = (defaultValues.group || []).map((e) => {
  //   const enabled =
  //     e.subsidyRule4Group?.groupStatus === SubMarketingPlanStatus.Started;
  //   const needSubsidy =
  //     enabled &&
  //     hasInviteMe({
  //       businessPartition: e.subsidyRule4Group.businessPartition,
  //       userInfo,
  //     });
  //   return {
  //     ...e,
  //     subsidyRule4Group: needSubsidy ? e.subsidyRule4Group : null,
  //   };
  // });
  defaultValues.group = (defaultValues.group || []).map((e) => {
    // const enabled =
    //   e.subsidyRule4Group?.groupStatus === SubMarketingPlanStatus.Started;
    // const needSubsidy =
    //   enabled &&
    //   hasInviteMe({
    //     businessPartition: e.subsidyRule4Group.businessPartition,
    //     userInfo,
    //   });
    return {
      ...e,
      groupStatus: SubMarketingPlanStatus.ToStart,
      // name: '副本-' + e?.name,
    }
  })
  return defaultValues
}

export const getPlanDefaultValues = ({
  userInfo,
  planDetail,
}: GetPlanDefaultValueOption): Record<string, any> => {
  const operationType = getOperationType()
  if (operationType === OperationType.CREATE) {
    return {}
  }
  if ([OperationType.EDIT, OperationType.VIEW].includes(operationType)) {
    return planDetail || {}
  }

  if (operationType === OperationType.COPY) {
    return getCopyDefaultValues({ userInfo, planDetail })
  }
}
