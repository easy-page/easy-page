import { RequestHandler, postReq } from "@/common/libs"
import { ProductSelectionFromBackend, ProductSelection } from "../saveAct"
import { convertProductionSelectionToLocal } from "./utils"

export type GetPreviewRulesParams = {
  activityId: number
}
export type GetPreviewRulesRes = {
  data: {
    actStashList: ProductSelectionFromBackend[]
  }
  code: number
  msg: string
}

export const getPreviewRulesInfo: RequestHandler<
  GetPreviewRulesParams,
  ProductSelection[]
> = async (params) => {
  try {
    const result = await postReq(
      '/api/zspt/operation/act/previewActRule',
      params
    )
    if (result.success) {
      return {
        success: true,
        data: convertProductionSelectionToLocal(
          false,
          result.data?.actStashList
        ),
      }
    }
    return {
      success: false,
      msg: result?.msg,
    }
  } catch (error: any) {
    return {
      success: false,
      msg: error?.message,
    }
  }
}
