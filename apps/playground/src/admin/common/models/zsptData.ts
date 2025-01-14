import { MapModel } from '@/common/models/base/map'
import { getZsptData, ZsptDatas } from '../apis/getZsptDatas'

export const zsptDataModel = new MapModel<ZsptDatas, {}>({})

export const loadZsptData = () => {
  return zsptDataModel.loadData(() => getZsptData({}))
}
