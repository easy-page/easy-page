import { NeedOtherOrgPnAuditRes } from '../apis'
import { MapModel } from './base/map'

export type NeedOtherOrgInfo = {
  /**
   * - 当有结果的时候，是否需要再发起请求
   * - 在页面中需要在提交的时候，存储的数据则不用发请求
   *  */
  needReq: boolean
  result: NeedOtherOrgPnAuditRes
}

export const needOtherOrgModel = new MapModel<NeedOtherOrgInfo, {}>({})
