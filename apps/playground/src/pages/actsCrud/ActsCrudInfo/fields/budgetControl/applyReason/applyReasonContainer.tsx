import { isView, BudgetDegreeEnum, getActivityId } from '@/common'
import { nodeUtil, getChildrenFormData } from '@easy-page/antd-ui'
import {
  ApplyReasionState,
  CommonActCrudFormState,
  BudgetaryPnPageState,
} from '../../interface'
import { PnTips } from './components'
import { getPnInfos } from './utils'

export const applyReasonContainer = () =>
  nodeUtil.createCustomField<
    Omit<ApplyReasionState, 'reason'>,
    CommonActCrudFormState
  >(
    'applyReasonContainer',
    '',
    ({ children, value }) => {
      const { notInMisOrgPns, pns } = value || {}
      return (
        <div className="flex flex-col">
          <PnTips
            notMisOrgPns={pns.filter((e) => notInMisOrgPns.includes(e.pn))}
          />
          <div className="bg-[#f8f8f8] p-4">{children}</div>
        </div>
      )
    },
    {
      when: {
        effectedKeys: ['applyReasonContainer'],
        show({ value }) {
          const { pns, notInMisOrgPns = [], needAuditOfApi } = value || {}
          console.log('notInMisOrgPnsnotInMisOrgPns:', pns, notInMisOrgPns)
          if (
            !needAuditOfApi ||
            notInMisOrgPns.length === 0 ||
            pns.length === 0
          ) {
            // 无 pn、后端说不展示、无非本组 pn 都不展示预算申请理由
            return false
          }
          if (isView()) {
            return false
          }

          return true
        },
      },
      postprocess: () => {
        return {}
      },
      preprocess({ defaultValues }) {
        // const budgetControl = defaultValues.budgetControl || ([] as IBudget[])
        return {
          pns: [],
          needAuditOfApi: false,
          notInMisOrgPns: [],
        }
      },
      actions: [
        {
          effectedKeys: ['budgetControl', 'submitVersion'],
          action: async ({ effectedData }) => {
            // const actRules = effectedData['actRule']
            const budgetControl = Object.values(
              effectedData['budgetControl']?.formUtils || {}
            ).map((e) => {
              return e.getFormData()
            }) as BudgetaryPnPageState[]

            const {
              oriPnInfos,
              needAuditOfApi,
              notInMisOrgPns = [],
              success,
            } = await getPnInfos(budgetControl, {
              degree: BudgetDegreeEnum.STRONG,
              actId: getActivityId(),
            })

            if (success) {
              return {
                fieldValue: {
                  pns: oriPnInfos,
                  needAuditOfApi,
                  notInMisOrgPns,
                },
              }
            }
            return {}
          },
        },
      ],
    },
    {
      layout: { disableLayout: true },
      formItem: {
        wrapperCol: {
          span: 16,
        },
      },
    }
  )
