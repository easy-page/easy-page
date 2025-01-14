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
import { CustomEffectContext, ResourceInfoForm } from './subActForm'
import { checkNumberInvalid, toNumber } from '@/common/libs'
import { Modal } from 'antd'
import { DotText, ISubActivity, mccModel, ResourceInfo } from '@/common'
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { OperationType, ConfigPublishStatus } from '@/common/constants'
import { getOperationType, isView } from '@/common/routes'
import classNames from 'classnames'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  CommonSubActPageState,
} from '@/pages/actsCrud/ActsCrudInfo'
import { cloneDeep, get, uniqueId } from 'lodash'
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

export const subSourceInfo = (options: SubActOptions) => {
  const pu = new PageUtil({ pageId: 'disSubAct-container' })
  pu.addFields(options.nodes)
  const pageInfo = pu.getPageInfo()
  return nodeUtil.createChildForm<
    ChildFormState,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'subSourceInfo',
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
      actions: [],

      childFormContext: [],

      postprocess({ value }) {
        const childForms = Object.values(value.formUtils || {}).map(
          (e, idx) => ({
            ...e.getFormData(),
            order: idx,
          })
        )

        return { 'activity.resourceInfo': childForms }
      },

      preprocess({ defaultValues }) {
        const childFormDefaultValues: Record<string, Partial<ResourceInfo>> = {}
        const childFormItems: ChildFormItem[] = []
        const subActs: ResourceInfo[] =
          get(defaultValues, 'activity.resourceInfo') || []

        console.log('subActs', subActs)

        subActs.forEach((each, index) => {
          const id = generateId(CHILD_PREFIX)
          childFormItems.push({
            id: id,
            label: each?.resourceName || `资源位${index + 1}`,
          })
          childFormDefaultValues[id] = each
        })
        if (childFormItems.length === 0) {
          childFormItems.push({
            id: generateId(CHILD_PREFIX),
            label: '资源位1',
          })
        }
        console.log('childFormItems', childFormItems)

        return {
          choosedItemId: childFormItems[0].id,
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
          frameworkProps,
        } = props

        //TODO: 内容如何复制
        const hanleCopySubForm = (id: string, index: number) => {
          console.log('props:', frameworkProps)

          const { childForms = [], formUtils } = value || {}
          const formUtil = formUtils[id]
          const copyFormValues = formUtil?.getFormData()
          const newId = generateId(CHILD_PREFIX)

          onChange({
            ...value,
            childForms: [
              ...childForms,
              {
                label: '',
                id: newId,
              },
            ],
            childFormDefaultValues: {
              ...value.childFormDefaultValues,
              [newId]: copyFormValues,
            },
            choosedItemId: newId,
          })
        }

        const {
          childForms = [],
          choosedItemId,
          childFormErrors,
          childFormDefaultValues,
        } = value || {}

        const {
          data: { drunkhorse_resource_per_activity = 20 },
        } = mccModel.getData()

        console.log('mccModel.getData()', mccModel.getData())

        const maxCount = toNumber(drunkhorse_resource_per_activity) || 20
        const minCount = 1

        const isMaxSubActCount = childForms.length === maxCount
        const isClosableShow =
          !disabled &&
          !isView() &&
          (childForms.length > minCount ? true : false)
        const disableAdd = isMaxSubActCount

        const disableCopy = childForms.length === maxCount

        console.log('ddd:', childFormContextData)
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
            hideAdd={getOperationType() === OperationType.VIEW}
            addIcon={
              <Button
                icon={<PlusOutlined />}
                type="text"
                disabled={disableAdd || disabled}
              >
                添加资源位
              </Button>
            }
            onEdit={(e, action) => {
              if (action === 'add') {
                onAdd()
              } else if (action === 'remove') {
                Modal.confirm({
                  centered: true,
                  okText: '确认删除',
                  title: '确认删除该资源位吗',
                  content: '资源位删除后不可恢复，确认删除吗？',
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
                      {e.label || `资源位${idx + 1}`}
                    </DotText>
                  </div>
                ),
                closable: isClosableShow,
                forceRender: true,
                children: (
                  <div className="relative">
                    <div className="absolute right-1">
                      <Button
                        onClick={() => {
                          hanleCopySubForm(e.id, idx)
                        }}
                        disabled={disableCopy || disabled}
                      >
                        复制
                      </Button>
                    </div>
                    <ResourceInfoForm // 资源位表单
                      handleChange={options?.handleChange}
                      childForm={e}
                      key={e.id}
                      {...props}
                      effects={options.effects}
                      pageInfo={pageInfo}
                      formIndex={idx}
                    />
                  </div>
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
