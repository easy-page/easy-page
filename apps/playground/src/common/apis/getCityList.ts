import { RequestHandler, postReq } from "../libs";

export type GetCityListParams = {
  activityId: number;
  poiIds?: number[];
}

export type CityListItem = {
  cityName: string;
  cityId: number;
}

export const getCityList: RequestHandler<GetCityListParams, CityListItem[]> = (params) => {
  return postReq('/api/zspt/apply/applyResult/queryCityList', params)
}