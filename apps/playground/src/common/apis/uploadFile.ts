import { RequestHandler, postReq } from "@/common/libs";
import { UploadSceneEnum } from "../constants";

export type UploadFileParams = {
  file: File;
  scene: UploadSceneEnum
}

export type UploadFileResult = {
  fileUrl: string;
  fileType: string;
}

export const uploadFile: RequestHandler<UploadFileParams, UploadFileResult> = (params: UploadFileParams) => {
  const form = new FormData()
  Object.keys(params).forEach((key) => {
    form.append(key, params[key as keyof UploadFileParams] as any)
  })
  return postReq('/api/zspt/operation/common/uploadFile', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}