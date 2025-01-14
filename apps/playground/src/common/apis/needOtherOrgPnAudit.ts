import { postReq, RequestHandler } from "../libs";
import { isCopy } from "../routes";

export type NeedOtherOrgPnAuditParams = {
  /** 复制时不要带 activityId */
  activityId?: number;
  /** pn id */
  pns: string[]
}

export type NeedOtherOrgPnAuditRes = {
  needAudit: boolean;
  // 非本组 pn ID
  pn4Audit?: string[]
}

export const needOtherOrgPnAudit: RequestHandler<NeedOtherOrgPnAuditParams, NeedOtherOrgPnAuditRes> = async (params) => {
  const res = await postReq('/api/zspt/operation/act/needOtherOrgPnAudit', {
    ...params,
    activityId: isCopy() ? undefined : params.activityId
  });
  return res;
}