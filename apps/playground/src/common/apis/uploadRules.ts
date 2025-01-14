import { ChargeFlowTypeEnum } from '../constants'
import { RequestHandler, postReq } from '../libs'
import { filterUndefined } from '../utils'
import { ActRuleExcelInfo, ProductSelectionFromBackend } from './saveAct'

export type UploadActRuleParams = {
  file: any
  chargeFlowType: ChargeFlowTypeEnum[]
  /**集合店类型 */
  jhdType: string
  /** 编辑时必填写 */
  activityId?: number
  /** 活动开始时间 */
  startTime: number
}

export type PnInfo = {
  pn: string // pn id
  pnName: string // pn 名称
  balance: number // pn 预算余额
}
/** 活动创建中，上传文件后返回结果类型 */
export type IActRuleList<T> = {
  allPass: boolean
  actRule?: ActRuleExcelInfo // 上传文件信息，仅在：allpass = true 时候存在
  actStashList: T[] // 表格数据
  pn: PnInfo[] // 上传excel中的PN信息
  uploadError?: string[]
}

// export type UploadActRuleRes = {
//   allPass: boolean
//   actStashList: ProductSelectionFromBackend[]
//   fileInfo: {
//     fileName: string
//     fileUrl: string
//   }
//   batchId: number
//   pn: PnInfo[]
//   uploadError?: string[]
// }

export const uploadActRule: RequestHandler<
  UploadActRuleParams,
  IActRuleList<ProductSelectionFromBackend>
> = async (params) => {
  const form = new FormData()
  const transformParams = filterUndefined(params)
  Object.keys(transformParams).forEach((key) => {
    form.append(key, transformParams[key as keyof UploadActRuleParams] as any)
  })
  return postReq('/api/zspt/operation/group/jhdUpload', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  // const res = (await postReq('/api/zspt/operation/group/jhdUpload', form, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // })) as RequestResult<UploadActRuleRes>
  // if (res.success) {
  //   return {
  //     success: true,

  //     data: {
  //       allPass: res.data?.allPass,
  //       actStashList: res.data?.actStashList || [],
  //       actRule: {
  //         fileName: res.data?.fileInfo?.fileName,
  //         url: res.data?.fileInfo?.fileUrl,
  //         dataId: res.data?.batchId,
  //       },
  //       pn: res.data?.pn || [],
  //       uploadError: res.data?.uploadError || [],
  //     },
  //   }
  // }
  // return {
  //   success: false,
  //   msg: res.msg,
  //   data: {
  //     allPass: false,
  //     actStashList: [],
  //     actRule: null,
  //     uploadError: [],
  //     pn: res.data?.pn || [],
  //   },
  // }
}
