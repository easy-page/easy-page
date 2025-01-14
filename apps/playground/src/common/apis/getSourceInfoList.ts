import { RequestHandler, postReq } from '@/common/libs'

export interface LimitInfo {
  regular?: string
  maxLength?: number
  supportMediaTypeList?: string[]
  wideLimit?: number
  highLimit?: number
  picSizeLimit?: number
}

// 资源要求类型
export enum MaterialTypeEnum {
  Text = 1,
  Image = 2,
}

export interface MetaInfo {
  materialName: string
  materialType: number
  limitInfo: LimitInfo
}

export interface ResourceTemplate {
  resourceMaterialTemplateId: string
  resourceName: string
  resourceMaterialList?: MetaInfo[]
}

export type GetSourceInfoListParams = {}

export type GetSourceInfoListRes = {
  drunkHorse: ResourceTemplate[]
}

// "drunkHorse":[
//       {
//         "resourceMaterialTemplateId":"2##hotsearchbox##landing",
//         "resourceName": "搜索发现词-会场",
//         "resourceMaterialList": [
//           {
//             "materialName": "搜索词",
//             "materialType": 1,
//             "limitInfo": {
//               "regular":".*",
//               "maxLength": 50
//             }
//           },
//           {
//             "materialName": "banner图",
//             "materialType": 2,
//             "limitInfo": {
//               "supportMediaTypeList": [
//                 "jpg",
//                 "jpeg",
//                 "png"
//               ],
//               "wideLimit": 50,
//               "highLimit": 50,
//               "picSizeLimit": 200
//             }
//           }
//         ]
//       }
//     ]

export const getSourceInfoList: RequestHandler<
  GetSourceInfoListParams,
  ResourceTemplate[]
> = async () => {
  const res = await postReq('/api/zspt/apply/resource/getResourceInfo', {})
  return {
    ...res,
    data: res.data?.drunkHorse,
  }
}
