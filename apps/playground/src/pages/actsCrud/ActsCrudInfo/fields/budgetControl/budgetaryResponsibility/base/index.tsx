import { IBudget } from '@/common'
import {
  AnyNodesInfoType,
  PageUtil,
  nodeUtil,
  ChildFormState,
  Empty,
  getChildrenFormData,
  ChildFormItem,
  generateId,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import classNames from 'classnames'
import {
  BudgetaryPnPageState,
  CommonActCrudFormState,
  PnControl,
} from '../../../interface'
import { BudgetaryResponsibilityForm } from '../pnForm'

export const baseBudgetaryResponsibility = ({
  nodes,
}: {
  nodes: AnyNodesInfoType
}) => {
  const pu = new PageUtil({
    pageId: 'budgetControl-container',
  })
  pu.addFields(nodes)
  const pageInfo = pu.getPageInfo()
  return nodeUtil.createChildForm<
    ChildFormState<BudgetaryPnPageState>,
    CommonActCrudFormState,
    Empty,
    Empty
  >(
    'budgetControl',
    {
      // childFormContext: ['activity'],
      postprocess: ({ value }) => {
        return {
          budgetControl: getChildrenFormData(value.formUtils),
        }
      },

      preprocess(context) {
        const { defaultValues } = context

        const childFormDefaultValues: Record<string, Partial<IBudget>> = {}
        const childFormItems: ChildFormItem[] = []
        const budgetControl = (defaultValues?.budgetControl || []) as IBudget[]
        budgetControl.forEach((each) => {
          // const id = generateId('budgetControl')
          childFormItems.push({
            id: each.pn,
            label: '',
          })
          childFormDefaultValues[each.pn] = each
        })
        return {
          choosedItemId: undefined,
          childForms: childFormItems,
          formUtils: {},
          childFormDefaultValues: childFormDefaultValues,
        }
      },

      childFormContainer: (props) => {
        const { value } = props

        const hasChildrenForm = value.childForms.length > 0

        return (
          <div
            className={classNames('flex flex-col', {
              'pt-4': hasChildrenForm,
            })}
          >
            {(value.childForms || []).map((each, idx) => {
              const defaultValue = (value.childFormDefaultValues?.[each.id] ||
                {}) as IBudget

              return (
                <BudgetaryResponsibilityForm
                  {...props}
                  formId={each.id}
                  formIndex={idx}
                  pageInfo={pageInfo}
                  defaultValues={{
                    ...defaultValue,
                    pn: defaultValue.pn || each.id,
                    pnName: defaultValue?.pnName || each.label,
                    pnControl: defaultValue.degree || PnControl.Week,
                  }}
                />
              )
            })}
          </div>
        )
      },
      value: {
        choosedItemId: undefined,
        childForms: [],
        formUtils: {},
        childFormDefaultValues: {},
      },
      validate: async ({ value }) => {
        /**
         * - 当：action 执行清理 formUtil 后，会触发：validate 和 重新挂载 ref
         * - ref 会在 validate 之前执行，导致：validate 变化吧 formUtil 覆盖了
         * - 外部不需要感知子表单异常，onChange可传空
         */
        const results = await validateAllChildForm(value, {})

        const hasError = results.find((e) => Boolean(e.errors))
        return { success: !hasError, errorMsg: '' }
      },
    },
    {
      formItem: {
        wrapperCol: { span: 22, className: 'mb-0' },
        customExtra: ({ value }) => {
          const val = value as ChildFormState<IBudget>
          if (!val.childForms.length) {
            return (
              <div className="budge-empty-title relative top-[-24px]">
                补贴信息中无美团/品牌补贴，无需填写预算管控。
              </div>
            )
          }
          return null
        },
      },
    }
  )
}
