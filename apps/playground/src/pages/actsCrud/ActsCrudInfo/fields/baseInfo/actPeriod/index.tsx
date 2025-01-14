import {
  ChildFormItem,
  ChildFormState,
  generateId,
  nodeUtil,
} from '@easy-page/antd-ui'
import {
  MAX_PERIODS,
  Period,
  PeriodTypeEnum,
  hasCrossTime,
  isValidPeriod,
  isValidTimeRange,
} from './common'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ActPeriodForm } from './periodForm'
import { get } from 'lodash'

const ACT_PERIOD_PREFIX = 'act-period'
const defaultId = generateId(ACT_PERIOD_PREFIX)

export const actPeriod = (periodType: PeriodTypeEnum[]) => {
  return nodeUtil.createChildForm<ChildFormState>(
    'promotionTime.period',
    {
      name: '生效时段',
      required: true,
      validate: async ({ value }) => {
        const childForms = Object.values(value.formUtils || {}).map((e) => {
          return e.getFormData()
        })
        console.log('childForms periods:', childForms)
        const periods = childForms.map((e) => e.period?.split('-') || [])

        if (hasCrossTime(periods as Period[])) {
          return { success: false, errorMsg: '多个时段不可交叉' }
        }

        if (!isValidTimeRange(periods)) {
          return { success: false, errorMsg: '开始时间必须小于结束时间' }
        }

        if (!isValidPeriod(periods as Period[], periodType)) {
          return {
            success: false,
            errorMsg: '时段必须是整点或半点，如13:00或者13:30，23:59除外',
          }
        }
        return { success: true }
      },
      value: {
        childForms: [
          {
            label: '',
            id: defaultId,
          },
        ],
        choosedItemId: defaultId,
      },
      postprocess({ value }) {
        const childForms = Object.values(value.formUtils || {}).map((e) => {
          return e.getFormData()
        })
        return {
          'activity.promotionTime.period': childForms
            .map((e) => e.period)
            .join(','),
        }
      },
      preprocess({ defaultValues }) {
        const period = get(defaultValues, 'activity.promotionTime.period')
        const childFormDefaultValues: Record<
          string,
          Record<string, string>
        > = {}
        const childFormItems: ChildFormItem[] = []
        if (!period) {
          const id = generateId(ACT_PERIOD_PREFIX)
          childFormItems.push({
            id: id,
            label: '',
          })
        }
        const periods: string[] = (period || '')
          .split(',')
          .filter((x) => Boolean(x))
        periods.forEach((x) => {
          const id = generateId(ACT_PERIOD_PREFIX)
          childFormItems.push({
            id: id,
            label: '',
          })
          childFormDefaultValues[id] = {
            period: x,
          }
        })
        return {
          choosedItemId: undefined,
          childForms: childFormItems,
          formUtils: {},
          childFormDefaultValues: childFormDefaultValues,
        }
      },
      childFormContainer: (props) => {
        const { value, onRemove, onAdd, disabled } = props
        const { childForms = [] } = value || {}
        const showDelete = childForms.length > 1
        return (
          <div className="flex flex-col">
            {childForms.map((e, idx) => {
              const curId = e.id
              console.log('onRemove childForms:', curId)

              return (
                <div key={e.id} className="flex flex-row">
                  <ActPeriodForm
                    periodType={periodType}
                    formIndex={idx}
                    {...props}
                    formId={e.id}
                  />
                  {showDelete && (
                    <Button
                      onClick={() => {
                        console.log('onRemove childForms: remove', curId)
                        onRemove(curId)
                      }}
                      disabled={disabled}
                      className="ml-2"
                      icon={<DeleteOutlined />}
                    ></Button>
                  )}
                </div>
              )
            })}
            <Button
              disabled={childForms.length === MAX_PERIODS || disabled}
              type="link"
              className="w-[100px] px-0 flex justify-start"
              onClick={() => {
                onAdd()
              }}
              icon={<PlusOutlined />}
            >
              生效时段({childForms.length}/{MAX_PERIODS})
            </Button>
          </div>
        )
      },
    },
    {
      childForm: {
        childFormIdPrefix: ACT_PERIOD_PREFIX,
      },
      formItem: {
        validateTrigger: 'onChange',
        tooltip:
          '时段必须是整点或半点，比如 13:00 或者 13:30。其中，23 点除外，支持 23:59。举例：10:00-10:30,17:00-19:00',
      },
    }
  )
}

export * from './common'
