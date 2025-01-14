import { PageUtil } from '@easy-page/antd-ui'
import { belong, fieldId, fieldName, owner } from './fields'
import { bottomToolbar } from './fields/toolbar'
import { recordInfoField } from '@/common/fields'

const pu = new PageUtil({ pageId: 'field-config' })
pu.addFields([
  recordInfoField('id'),
  fieldId,
  fieldName,
  belong,
  owner,
  bottomToolbar({ className: 'absolute' }),
])
export const pageInfo = pu.getPageInfo()
