import { RequestHandler, postReq } from '@/common/libs'

export type CityItem = {
  cityId: number
  cityName: string
}

export type ProvinceItem = {
  provinceId: number
  provinceName: string
  cityList: CityItem[]
}

export type QueryCityInfoParams = {}

export type QueryCityInfoRes = {
  drunkHorse: ProvinceItem[]
}
// "drunkHorse":[
//     {
//       "provinceId": 123,
//       "provinceName": "四川省",
//       "cityList": [
//         {
//           "cityId": 12312,
//           "cityName": "成都市"
//         }
//       ]
//     }
//   ]

export const queryCityInfo: RequestHandler<
  QueryCityInfoParams,
  ProvinceItem[]
> = async () => {
  const res = await postReq('/api/zspt/apply/resource/queryCityInfo', {})
  return {
    ...res,
    data: res.data?.drunkHorse,
  }
}
