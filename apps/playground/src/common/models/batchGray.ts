import { MapModel } from './base/map'
import { batchGray, BatchGrayParams, BatchGrayRes } from '../apis/batchGray'

export const batchGrayModel = new MapModel<BatchGrayRes>({})

export const loadBatchGray = (params: BatchGrayParams) => {
  return batchGrayModel.loadData(async () => {
    const res = await batchGray(params)
    return res
  })
}
