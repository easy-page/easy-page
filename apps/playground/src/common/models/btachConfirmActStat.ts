import { getBatchActStat, GetBatchActStatResult } from '../apis/getBatchActStat'
import { MapModel } from './base/map'

export const batchConfirmActStatModel = new MapModel<GetBatchActStatResult, {}>(
  {}
)
