import {
  AnyNodesInfoType,
  ChildFormItem,
  ChildFormState,
  EasyPageEffect,
  EasyPageOnChangeContext,
  FormUtil,
  PageUtil,
  generateId,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import { Button, Tabs } from 'antd'
import { CustomEffectContext, SubActForm } from './subActForm'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  CommonSubActPageState,
} from '../interface'
import { checkNumberInvalid, toNumber } from '@/common/libs'
import { Modal } from 'antd'
import { DotText, ISubActivity, mccModel, ZsptButton } from '@/common'
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { OperationType, ConfigPublishStatus } from '@/common/constants'
import { getOperationType, isView } from '@/common/routes'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import './index.less'

const CHILD_PREFIX = 'sub-act'
const defaultId = generateId(CHILD_PREFIX)

const DEFAULT_MAX_COUNT = 20

export type SubActOptions = {
  handleChange?: (
    context: EasyPageOnChangeContext<CommonActCrudFormState>
  ) => void
  nodes: AnyNodesInfoType
  /** 单个子表单的副作用 */
  effects?: (
    context: CustomEffectContext
  ) => EasyPageEffect<CommonSubActPageState>[]
}

const getCanAddState = (data: Record<string, Record<string, any>>) => {
  const forms = Object.keys(data || {})
  if (forms.length > 1 || forms.length === 0) {
    // 超过 1 个子活动，允许添加
    return true
  }
  const fisrtForm = data[forms[0]] as ISubActivity
  return !fisrtForm.poiBuildProduct
}

export const subAct = (options: SubActOptions) => {
  const pu = new PageUtil({ pageId: 'disSubAct-container' })
  pu.addFields(options.nodes)
  const pageInfo = pu.getPageInfo()
  return nodeUtil.createChildForm<
    ChildFormState,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'subActivity',
    {
      value: {
        childForms: [
          {
            label: '',
            id: defaultId,
          },
        ],
        choosedItemId: defaultId,
      },
      actions: [
        {
          effectedKeys: ['subactivityRule.enterMax', 'mccSubActMaxCount'],
          action: ({ effectedData, value }) => {
            const mccSubActMaxCount = effectedData.mccSubActMaxCount

            if (!mccSubActMaxCount) {
              return {}
            }

            const actNumMax = toNumber(effectedData['subactivityRule.enterMax'])

            // 判断最大活动数是否合法再生成，否则容易生成过多
            const res = checkNumberInvalid(
              effectedData['subactivityRule.enterMax'] || '',
              {
                checkNumber: true,
                checkInRange: {
                  min: 1,
                  max: mccSubActMaxCount,
                },
              }
            )
            if (actNumMax !== undefined && res.success) {
              const newChildForms = [...value.childForms]
              const actCount = newChildForms.length
              if (actCount < actNumMax) {
                for (let i = actCount; i < actNumMax; i++) {
                  newChildForms.push({
                    id: generateId(CHILD_PREFIX),
                    label: '',
                  })
                }
              }
              console.log('exec action:', newChildForms)
              return {
                fieldValue: { ...value, childForms: newChildForms },
                validate: false,
              }
            }
            return {}
          },
        },
      ],

      childFormContext: [
        /** 不能有 subActivity 不然会超级卡 */
        // 'subActivity',
        'mccSubActMaxCount',
        'factors',
        'poiType',
        'chargeFlowType',
        'promotionTime.timeRange',
        'subactivityRule.enterMax',
      ],
      postprocess({ value }) {
        console.log(
          '子活动顺序：',
          value.childForms,
          Object.keys(value.formUtils || {})
        )
        const childForms = (value.childForms || []).map((e, idx) => {
          const form = value.formUtils?.[e.id]
          return {
            ...(form?.getFormData() || {}),
            order: idx,
          }
        })

        return { subActivity: childForms }
      },
      preprocess({ defaultValues }) {
        const childFormDefaultValues: Record<string, Partial<ISubActivity>> = {}
        const childFormItems: ChildFormItem[] = []
        const subActs: ISubActivity[] = defaultValues['subActivity'] || []
        subActs.forEach((each) => {
          const id = `${each.id}` || generateId(CHILD_PREFIX)
          childFormItems.push({
            id: id,
            label: each.name || '',
          })
          childFormDefaultValues[id] = each
        })
        if (childFormItems.length === 0) {
          childFormItems.push({
            id: generateId(CHILD_PREFIX),
            label: '子活动1',
          })
        }

        return {
          choosedItemId: undefined,
          childForms: childFormItems,
          formUtils: {},
          childFormDefaultValues: childFormDefaultValues,
        }
      },
      validate: async ({ value, onChange }) => {
        const results = await validateAllChildForm(value, { onChange })
        const hasError = results.find((e) => Boolean(e.errors))
        return { success: !hasError }
      },
      childFormContainer: (props) => {
        const {
          value,
          disabled,
          onChange,
          onRemove,
          onAdd,
          childFormContextData,
        } = props
        const { childForms = [], choosedItemId, childFormErrors } = value || {}
        const { data } = mccModel.getData()
        const maxCount = toNumber(childFormContextData['mccSubActMaxCount']) || DEFAULT_MAX_COUNT
        const minCount =
          toNumber(childFormContextData['subactivityRule.enterMax']) || 1

        const isMaxSubActCount = childForms.length === maxCount
        const isClosableShow =
          !disabled &&
          !isView() &&
          (childForms.length > minCount ? true : false)

        const t = value.childFormDefaultValues
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [canAdd, setCanAdd] = useState(
          getCanAddState(value.childFormDefaultValues || {})
        )

        const disableAdd = isMaxSubActCount || !canAdd

        console.log('ddd:', disableAdd, disabled)

        return (
          <Tabs
            activeKey={choosedItemId}
            destroyInactiveTabPane={false}
            type="editable-card"
            onChange={(id) => {
              return onChange({
                ...value,
                choosedItemId: id,
              })
            }}
            className="sub-act-form"
            hideAdd={getOperationType() === OperationType.VIEW}
            addIcon={
              <ZsptButton
                icon={<PlusOutlined />}
                type="text"
                tips={
                  !canAdd
                    ? '引导商家建品暂不支持多个子活动。如需创建多个子活动，请您先关闭引导商家建品开关。'
                    : ''
                }
                disabled={disableAdd || disabled}
              >
                添加子活动
              </ZsptButton>
            }
            onEdit={(e, action) => {
              if (action === 'add') {
                if (disableAdd || disabled) {
                  return
                }
                onAdd()
              } else if (action === 'remove') {
                Modal.confirm({
                  centered: true,
                  okText: '确认删除',
                  title: '确认删除该子活动吗',
                  content: '子活动删除后不可恢复，确认删除吗？',
                  onOk() {
                    onRemove(e as string)
                  },
                })
              }
            }}
            items={childForms.map((e, idx) => {
              const hasError = Boolean(
                childFormErrors?.find((each) => e.id === each.id)
              )
              const choosed = e.id === choosedItemId
              console.log('hasErrorhasError:', childFormErrors, hasError)
              return {
                id: e.id,
                icon: e.icon,
                key: e.id,

                label: (
                  <div className="flex flex-row items-center">
                    {hasError ? (
                      <CloseCircleOutlined className="mr-1 text-red-600" />
                    ) : (
                      <></>
                    )}
                    <DotText
                      className={classNames('max-w-[150px]  text-[16px] ml-1', {
                        'font-medium': choosed,
                      })}
                      line={1}
                    >
                      {e.label || `子活动${idx + 1}`}
                    </DotText>
                  </div>
                ),
                closable: isClosableShow,
                forceRender: true,
                children: (
                  <SubActForm // 子活动表单
                    handleChange={options?.handleChange}
                    childForm={e}
                    setCanAdd={setCanAdd}
                    key={e.id}
                    {...props}
                    effects={options.effects}
                    pageInfo={pageInfo}
                    formIndex={idx}
                  />
                ),
              }
            })}
          ></Tabs>
        )
      },
    },
    {
      childForm: {
        childFormIdPrefix: CHILD_PREFIX,
      },
      formItem: {
        labelCol: { span: undefined },
        wrapperCol: { span: undefined },
        noStyle: true,
      },
    }
  )
}

export * from './subActForm'
export * from './validationRule'
export * from './fields'
