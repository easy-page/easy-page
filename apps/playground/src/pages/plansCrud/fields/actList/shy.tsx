import { nodeUtil } from '@easy-page/antd-ui'
import { ActListColumnId, ActListTable, OPERATION_COL_KEY, OperationType, getOperationType } from '@/common'
import { ShenhuiyuanSubPlanFormProps, ShenhuiyuanSubPlanFormState } from '../../planPages/createShenHuiYuanPlan/fields/subPlanForm/interface'

const ROW_IDS = [...Object.values(ActListColumnId), OPERATION_COL_KEY].filter(
  (e) =>
    ![ActListColumnId.ActStatsInfo, ActListColumnId.ConfirmStatus].includes(
      e as ActListColumnId
    )
)
export const actList = nodeUtil.createCustomField<
  any,
  ShenhuiyuanSubPlanFormState,
  ShenhuiyuanSubPlanFormProps
>(
  'actList',
  '',
  ({ frameworkProps: { store } }) => {
    const data = store.getAllState() || {}
    const { id } = data
    console.log('dddddata:', data)
    const { subPlan } = store.getPageProps() || {}

    const choosedPlanId =
      subPlan.childFormDefaultValues?.[subPlan.choosedItemId]

    return (
      <div className="px-4 ">
        <div className="font-bold mb-4 text-base">关联提报活动</div>
        <ActListTable
          rowIds={ROW_IDS}
          choosePlanId={choosedPlanId?.id}
          subPlanId={id ? id : undefined}
        />
      </div>
    )
  },
  {
    effectedKeys: ['id', 'subPlan'],
    when: {
      show() {
        const operationType = getOperationType()
        return [OperationType.EDIT].includes(operationType)
      },
    },
  },
  {
    formItem: {
      noStyle: true,
    },
  }
)
