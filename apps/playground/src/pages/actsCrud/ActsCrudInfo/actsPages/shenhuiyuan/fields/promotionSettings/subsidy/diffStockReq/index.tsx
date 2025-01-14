import {
  ChildFormItem,
  ChildFormState,
  DEFAULT_COMPONENTS,
  EXTRA_COMPONENTS,
  EasyPage,
  generateId,
  getChildrenFormData,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import classNames from 'classnames'
import { PoiTypeEnum, TableHeader } from '@/common'
import {
  StockRequestEnum,
  StockRequestType,
} from '@/common/apis/saveAct/interfaces/stockReq'
import { Content4Shy } from '@/common/apis/saveAct/interfaces'
import { ISubActivity } from '@/common/apis/saveAct/interfaces/subAct'
import { stockReqTablePageInfo } from './pageInfo'
import './index.less'
import { BudgetRuleTableFormProps, BudgetRuleTableFormState } from './interface'
import { getFromContent4Shy } from '../utils/getFromContent4Shy'
import { appendToContent4Shy } from '../utils/appendToSubActRule'
import {
  ShenhuiyuanFormProps,
  ShenhuiyuanFormState,
} from '../../../../interface'
import { StockReqFormState } from '../stockReq/interface'
import { getStockExpandLevel } from './utils/getStoreBaseLevel'

const budgetSuffix = 'budget-table'
const defaultId = generateId(budgetSuffix)

const DEFAULT_VALUE = {
  childForms: [
    {
      id: defaultId,
      label: '',
    },
  ],
  choosedItemId: defaultId,
}

export const differStockRule = nodeUtil.createChildForm<
  ChildFormState<BudgetRuleTableFormState>,
  ShenhuiyuanFormState,
  ShenhuiyuanFormProps
>(
  'differStockRule',
  {
    value: DEFAULT_VALUE,
    name: '差异化库存要求',
    childFormContext: ['poiType', 'stockRequest'],

    validate: async ({ value, onChange }) => {
      // console.log('what fuck vvvv:', value, Object.keys(value.formUtils || {}));
      const results = await validateAllChildForm(value, { onChange })
      const hasError = results.find((e) => Boolean(e.errors))
      return { success: !hasError }
    },
    postprocess({ value, processedFormData }) {
      const childForms = Object.values(value.formUtils || {}).map((e) =>
        e.getFormData()
      ) as { stockRule: StockRequestType }[]

      const processedSubActs = processedFormData.subActivity || []
      let stockRule = processedSubActs?.[0]?.content4Shy?.stockRule || []
      stockRule = [...stockRule, ...(childForms?.[0]?.stockRule || [])]
      const subAct: ISubActivity[] = appendToContent4Shy(processedFormData, {
        stockRule: stockRule,
      })

      // 差异化库存要求只有一行
      return {
        subActivity: subAct,
      }
    },
    preprocess({ defaultValues }) {
      const stockRequest =
        getFromContent4Shy<Content4Shy['stockRule']>(
          'stockRule',
          defaultValues
        ) || []
      const id = generateId(budgetSuffix)

      const childFormDefaultValues: Record<
        string,
        { stockRule: StockRequestType }
      > = {
        [id]: { stockRule: stockRequest },
      }
      const childFormItems: ChildFormItem[] = [
        {
          id,
          label: '',
        },
      ]
      const firstId = childFormItems?.[0]?.id
      return {
        choosedItemId: firstId,
        childForms: childFormItems,
        childFormDefaultValues,
      }
    },
    childFormContainer: (props) => {
      const { value, setChildFormRef, childFormContextData, disabled } = props
      const poiType = childFormContextData?.['poiType']
      const stockRequest = childFormContextData?.[
        'stockRequest'
      ] as ChildFormState<StockReqFormState>
      console.log('stockRule ==>:', stockRequest)

      const expandLevel = getStockExpandLevel(stockRequest)
      console.log('expandLevel:', expandLevel?.minValue)

      const isDirect = poiType === PoiTypeEnum.Direct
      const { childForms, childFormDefaultValues } =
        value as ChildFormState<BudgetRuleTableFormState>
      return (
        <div className="flex flex-col">
          <div
            className={classNames(
              'grid grid-cols-3 gap-8 bg-[#F5F5F6] py-2 px-4 min-w-[800px]',
              ''
            )}
          >
            <TableHeader
              className="col-span-1"
              name="商家每日库存"
              required
              tooltip="指商家每类差异化追补每天可用的库存"
            />
            <TableHeader
              className="col-span-1"
              required
              tooltip="指BD针对一个门店每类差异化追补的每天可用的库存"
              name="BD每日库存"
            />
            {isDirect ? (
              <></>
            ) : (
              <TableHeader
                className="col-span-1"
                required
                tooltip="指代理CM针对一个门店每类差异化追补的每天可用的库存。"
                name="代理商CM每日库存"
              />
            )}
          </div>
          {childForms.map((each, idx) => {
            const defaultVal = childFormDefaultValues?.[each.id]
            return (
              <EasyPage<BudgetRuleTableFormState, BudgetRuleTableFormProps>
                pageType="form"
                commonUIConfig={{
                  form: {
                    className: classNames(
                      'grid grid-cols-3 gap-8 px-4 py-2 budget-table-form items-start min-w-[800px]'
                    ),
                  },
                }}
                defaultValues={defaultVal}
                effects={[]}
                context={
                  {
                    // TODO 类型定义
                    formId: each.id,
                    ...childFormContextData,
                    stockRequest: stockRequest,
                    editable: disabled || !expandLevel?.minValue ? false : true,
                  } as any
                }
                setFormUtil={(ref) => setChildFormRef(ref, each.id)}
                components={{
                  ...DEFAULT_COMPONENTS,
                  ...EXTRA_COMPONENTS,
                }}
                {...stockReqTablePageInfo}
              />
            )
          })}
        </div>
      )
    },
  },
  {
    formItem: {
      tooltip:
        '每个差异化补贴条件下的补贴库存，均需满足此要求。（各差异化补贴条件库存相互独立）',
      extra: '最小值需小于等于膨胀档位每日库存最小值',
    },
  }
)
