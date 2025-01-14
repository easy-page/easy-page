import {
  ChildFormContainerProps,
  ChildFormState,
  ComponentProps,
  DefaultPageProps,
  generateId,
} from '@easy-page/antd-ui'
import { ZsptTab, SubMarketingPlan, SubMarketingPlanStatus } from '@/common'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Modal } from 'antd'
import { CommonPlanFormState, CommonPlanFormProps } from '../../../interface'
import { SubPlanFormComponent } from '../../interface'
import { getGroupStatusMap } from '../../utils'
import { SubPlanOperation } from './operations'
import { SubPlanTabLabel } from './SubPlanTabLabel'
import './index.less'
import { hasSubPlanContent } from './utils'

const DEFAULT_MAX_SUB_PLAN_COUNT = 20

export const subPlanFormPrefix = 'subPlan'
export const subPlanDefaultId = generateId(subPlanFormPrefix)

export const DEFAULT_SUB_PLAN_INFO = {
  childForms: [{ id: subPlanDefaultId, label: '' }],
  choosedItemId: subPlanDefaultId,
  groupStatus: SubMarketingPlanStatus.ToStart,
}

export type SubPlanState = ChildFormState<Record<string, any>>

export type SubPlanContainerProps = ComponentProps<
  ChildFormContainerProps,
  SubPlanState,
  any,
  CommonPlanFormState,
  CommonPlanFormProps & DefaultPageProps<CommonPlanFormState>
> & {
  formComponent: SubPlanFormComponent
}

export const SubPlanContainer = (props: SubPlanContainerProps) => {
  const {
    childForms,
    choosedItemId,
    formUtils,
    childFormErrors,
    childFormDefaultValues,
  } = props.value
  const maxSubPlanCount =
    props.childFormContextData?.['maxSubPlanCount'] ??
    DEFAULT_MAX_SUB_PLAN_COUNT
  const FormComponent = props.formComponent
  const hideAdd = childForms.length === maxSubPlanCount

  const [groupStatusMap, setGroupStatusMap] = useState(
    getGroupStatusMap(childFormDefaultValues)
  )
  return (
    <div className="">
      <ZsptTab
        tabProps={{
          hideAdd,
          destroyInactiveTabPane: true,
          className: 'sub-plan-tab ',
          onChange(val) {
            props.onChange({
              ...props.value,
              choosedItemId: val,
            })
          },
          addIcon: (
            <div className="flex flex-row min-w-[100px]">
              <PlusCircleOutlined className="mr-1" />

              <div>添加子方案</div>
            </div>
          ),
          type: 'editable-card',
          activeKey: choosedItemId,
          onEdit(e, action) {
            if (action === 'add') {
              props.onAdd()
            } else if (action === 'remove') {
              props.onRemove(e as string)
            }
          },
        }}
        tabs={childForms.map((each, idx) => {
          const hasError = Boolean(
            childFormErrors?.find((e) => e.id === each.id)
          )
          const curFormDefaultValues = childFormDefaultValues?.[
            each.id
          ] as SubMarketingPlan
          const groupStatus = groupStatusMap[each.id]

          const choosed = each.id === choosedItemId
          return {
            id: each.id,
            forceRender: true,
            label: (
              <SubPlanTabLabel
                groupStatus={groupStatus}
                label={each.label}
                choosed={choosed}
                idx={idx}
                hasError={hasError}
              />
            ),
            closable: false,
            content: (
              <div className="w-full h-full relative">
                <div className="absolute right-0 top-0">
                  {SubPlanOperation[
                    groupStatus || SubMarketingPlanStatus.ToStart
                  ]({
                    childForms,
                    onRemove: () => {
                      const formUtil = formUtils?.[each.id]
                      const hasContent = hasSubPlanContent(formUtil)
                      if (!hasContent) {
                        props.onRemove(each.id)
                      } else {
                        Modal.confirm({
                          title: '确认删除该子方案吗?',
                          centered: true,
                          content: '删除后，该子方案下编辑的所有信息都将删除',
                          cancelText: '取消',
                          okText: '确认',
                          onOk() {
                            props.onRemove(each.id)
                            return null
                          },
                        })
                      }
                    },
                    groupId: curFormDefaultValues?.id,
                    updateStatusToStop() {
                      const formUtil = formUtils?.[each.id]
                      formUtil.setField(
                        'groupStatus',
                        SubMarketingPlanStatus.Pause
                      )
                      setGroupStatusMap({
                        ...groupStatusMap,
                        [each.id]: SubMarketingPlanStatus.Pause,
                      })
                    },
                  })}
                </div>
                <FormComponent
                  {...props}
                  key={each.id}
                  curIdx={idx}
                  groupStatus={groupStatusMap[each.id]}
                  curForm={each}
                />
              </div>
            ),
          }
        })}
        defaultTab={subPlanDefaultId}
      />
    </div>
  )
}
