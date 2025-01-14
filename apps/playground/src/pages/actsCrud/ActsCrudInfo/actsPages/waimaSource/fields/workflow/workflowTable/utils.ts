import { generateId } from '@easy-page/antd-ui'

export const RuleTableSuffix = 'workflow'

export const skuAdminId = generateId(RuleTableSuffix)
export const purchaseManagerId = generateId(RuleTableSuffix)
export const supplierId = generateId(RuleTableSuffix)

export const getDefaultRuleTableState = (defaultValues) => {
  return {
    childForms: [
      {
        id: skuAdminId,
        label: '',
      },
      {
        id: purchaseManagerId,
        label: '',
      },
      {
        id: supplierId,
        label: '',
      },
    ],
    formUtils: {},
    childFormDefaultValues: {
      [skuAdminId]: defaultValues,
      [purchaseManagerId]: defaultValues,
      [supplierId]: defaultValues,
    },

    choosedItemId: skuAdminId,
  }
}
