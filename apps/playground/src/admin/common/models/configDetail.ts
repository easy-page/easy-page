import { MapModel } from '@/common/models/base/map'
import { getConfigDetail } from '../apis/getConfigDetail'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export const configDetailModel = new MapModel<ConfigListInfo, {}>({})

export const loadConfigDetail = (id: number) => {
  return configDetailModel.loadData(() => getConfigDetail({ id }))
}
