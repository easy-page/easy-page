import { ActivityStatusEnum } from '@/common'
import { appendOrDelDecorator } from '../../decorators'
import { appendPoi } from './common'

export const addPoiOptionOfEdit = (options?: {
  excludeStatus: ActivityStatusEnum[]
}) =>
  appendOrDelDecorator({
    node: appendPoi(),
    excludeStatus: options?.excludeStatus,
  })
