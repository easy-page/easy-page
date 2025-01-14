import {
  ChildFormItem,
  ChildFormState,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  FormUtil,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import classNames from 'classnames'
import { TableHeader } from '@/common'
import './index.less'
import { getDefaultRuleTableState, RuleTableSuffix, supplierId } from './utils'
import { WmsActFormProps, WmsActFormState } from '../../../interface'
import { get } from 'lodash'
import { dateRangeField } from './fields/dateRangeField'
import {
  skuAdminRowTitle,
  purchaseManagerRowTitle,
  supplierRowTitle,
} from './fields/commonTitle'
import { skuAdminDateRange } from './fields/skuAdminDateRange'
import { purchaseManagerDateRange } from './fields/purchaseManagerDateRange'
import { supplierDateRange } from './fields/supplierDateRange'
import { FlowNodeKey } from './fields/commonDateRange'

export const DefaultRuleTableId = generateId(RuleTableSuffix)

export const workflowTable = nodeUtil
  .createCustomField<WmsActFormState, WmsActFormProps>(
    'workflowTable',
    ' ',
    ({ children }) => {
      return (
        <div className="flex flex-col mb-8 ">
          <div className="grid grid-cols-12 gap-8 bg-[#F5F5F6] py-2 px-4 min-w-[900px]">
            <TableHeader className="col-span-4" name="提报流程" />
            <TableHeader className="col-span-8" name="待设置项" />
          </div>
          {children}
        </div>
      )
    },
    {},
    {
      layout: {
        disableLayout: true,
      },
    }
  )
  .appendChildren([
    dateRangeField(FlowNodeKey.SkuAdmin, {
      when: {
        effectedKeys: ['skuAdminPartner'],
        show({ effectedData }) {
          return effectedData['skuAdminPartner']?.isSelectSkuPartner
        },
      },
    }).appendChildren([skuAdminRowTitle, skuAdminDateRange]),
    dateRangeField(FlowNodeKey.PurchaseManager).appendChildren([
      purchaseManagerRowTitle,
      purchaseManagerDateRange,
    ]),

    dateRangeField(FlowNodeKey.Supplier).appendChildren([
      supplierRowTitle,
      supplierDateRange,
    ]),
  ])
