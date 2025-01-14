import {
  BudgetDegreeEnum,
  IActRuleList,
  IBudget,
  needOtherOrgPnAudit,
  ProductSelection,
} from '@/common'
import { BudgetaryPnPageState } from '../../../interface'
import { needOtherOrgModel } from '@/common/models/needOtherOrgPnAudit'

/** 神价类活动，通过表格获得 PN */
export const getPnInfos = async (
  // actRule: IActRuleList<ProductSelection>,
  budgetControl: BudgetaryPnPageState[],
  options: {
    degree: BudgetDegreeEnum
    actId: number
  }
): Promise<{
  oriPnInfos: IBudget[]
  success: boolean
  notInMisOrgPns?: string[]
  needAuditOfApi?: boolean
}> => {
  const { degree, actId } = options
  const pns = budgetControl || []

  const oriPnInfos = pns.map(
    (e) =>
      ({
        degree: degree,
        pn: e.pn || '',
        pnName: e.pnName,
        /** 重新上传表格，清空 budget */
        budget: null,
      } as IBudget)
  )
  const pnIds = oriPnInfos.map((e) => e.pn)

  const { data } = needOtherOrgModel.getData()
  console.log('添加 pn 时候：', data)
  if (!data.needReq) {
    return {
      oriPnInfos: oriPnInfos,
      success: true,
      needAuditOfApi:
        data.result?.needAudit !== undefined ? data.result?.needAudit : false,
      notInMisOrgPns: data.result?.needAudit ? data.result?.pn4Audit : [],
    }
  }

  const { success, data: checkRes } = await needOtherOrgModel.loadData(
    async () => {
      const res = await needOtherOrgPnAudit({
        activityId: actId,
        pns: pnIds,
      })
      return {
        ...res,
        data: {
          needReq: true,
          result: res.data,
        },
      }
    }
  )

  console.log('checkRes', checkRes)

  const { pn4Audit = [], needAudit } = checkRes?.result || {}
  return {
    oriPnInfos: oriPnInfos,
    success,
    needAuditOfApi: needAudit !== undefined ? needAudit : false,
    notInMisOrgPns: needAudit ? pn4Audit : [],
  }
}
