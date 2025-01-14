import {
  CommonApplyResultTabTypeEnum,
  WaiMaResourceTabTypeMap,
} from '@/pages/actApplyResult/ActApplyResultInfo/common'
import { ListModel } from '../base/list'
import {
  ResourceApplyListItem,
  QueryResourceApplyListParams,
  queryResourceApplyList,
} from '@/common/apis/waiMaResource'

export enum applyTypeEnum {
  supplier = 1,
  category = 2,
}

export const sourceApplyListModel = new ListModel<
  ResourceApplyListItem,
  QueryResourceApplyListParams
>({
  defaultFilters: {
    activityId: null, // 活动ID
    applyType:
      WaiMaResourceTabTypeMap[
        CommonApplyResultTabTypeEnum.SUPPLIER_APPLY_RESULT
      ],
  },
})

export const loadWaiMaSourceApplyListToModel = ({
  applyType,
  activityId,
}: {
  applyType: number
  activityId: number
}) => {
  return sourceApplyListModel.loadListWithPage(async (filters) => {
    const res = await queryResourceApplyList({
      // ...filters,
      applyType,
      activityId,
    })
    const {
      activityName,
      status,
      contractId,
      contractStatus,
      contractStatusDesc,
    } = res?.data || {}

    return {
      extraInfo: {
        activityName,
        activityId: res?.data?.activityId,
        status, // 活动状态
        contractId, // 合同id
        contractStatus, // 合同签署状态
        contractStatusDesc, // 合同签署状态描述
      },
      data: res?.data?.items,
      error: !res.success,
      msg: res.msg,
    }
  })
}
