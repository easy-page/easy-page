import { ActivityStatusEnum } from '@/common'
import { appendOrDelDecorator } from '../../decorators'
import { removePoi } from './common'

export const removePoiOptionOfEdit = (options?: {
  excludeStatus: ActivityStatusEnum[]
}) =>
  appendOrDelDecorator({
    node: removePoi(),
    excludeStatus: options?.excludeStatus,
  })
