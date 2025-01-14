import { RequestHandler, postReq } from "@/common/libs";

export type CheckQualifyParams = {
  /**
   * - key 为 factorCode
   * - value 为 JSON.stringify(factorValue)
   */
  dataCollector: Record<string, string>
}

export interface RemoteCheckDetail {
  factorCode: string
  factorName: string
  message: string
}


export type CheckQualifyRes = {
  isMatch: boolean;
  checkResult?: RemoteCheckDetail[];
}

export const checkQualify: RequestHandler<CheckQualifyParams, {
  success: boolean
  errorMsg?: string
}> = async (params) => {
  const result = await postReq('/api/zspt/factor/qualify/remoteCheck', params);
  if (!result.success) {
    return {
      success: false,
      msg: '远程校验请求失败'
    }
  }
  if (
    !result.data?.isMatch &&
    result.data?.checkResult &&
    result.data?.checkResult.length > 0
  ) {

    return {
      success: true,
      data: {
        success: false, errorMsg: result.data?.checkResult[0].message
      }
    }
  }
  return { success: true, data: { success: true } }
}