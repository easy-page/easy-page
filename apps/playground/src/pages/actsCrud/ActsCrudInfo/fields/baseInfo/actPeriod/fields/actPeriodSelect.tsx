import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import dayjs from 'dayjs'
import { PeriodTypeEnum } from '../common'

export type ActPeriodSelectOptions = {
  periodType: PeriodTypeEnum[]
}

const range = (
  start: number,
  end: number,
  options?: {
    exclude?: number[]
  }
) => {
  const result = []
  for (let i = start; i < end; i++) {
    if (!options?.exclude?.includes(i)) {
      result.push(i)
    }
  }
  return result
}

export const actPeriodSelect = (
  formIndex: number,
  options?: ActPeriodSelectOptions
) =>
  nodeUtil.createField<string[]>(
    'period',
    '',
    {
      preprocess({ defaultValues }) {
        let period = defaultValues.period || '' // 00:00-04:00
        if (!period) {
          period = formIndex === 0 ? '00:00-23:59' : '01:00-02:00'
        }
        return period.split('-').map((e: string) => dayjs(e, 'HH:mm'))
      },
      postprocess({ value }) {
        if (!value) {
          return {}
        }
        const toHHMM = (date: string) => dayjs(date).format('HH:mm')
        return {
          period: `${toHHMM(value[0])}-${toHHMM(value[1])}`,
        }
      },
    },
    {
      ui: UI_COMPONENTS.DATE_PICKER_RANGE,
      formItem: {
        className: 'mb-2',
      },
      datePickerRange: {
        picker: 'time',
        hideDisabledOptions: true,
        order: false,

        // needConfirm: false,
        // preserveInvalidOnBlur: false,
        disabledTime: (date, type) => {
          const excludes = [0]
          if ((options?.periodType || []).includes(PeriodTypeEnum.From30)) {
            excludes.push(30)
          }
          const excludesWith59 = [...excludes, 59]
          if (type === 'start') {
            return {
              disabledHours: () => [],
              disabledMinutes: () =>
                range(0, 60, {
                  exclude: excludes,
                }),
            }
          }
          return {
            disabledHours: () => [],
            disabledMinutes: (hour) => {
              if (hour === 23) {
                return range(0, 60, {
                  exclude: excludesWith59,
                })
              }
              return range(0, 60, {
                exclude: excludes,
              })
            },
          }
        },
        showTime: { format: 'HH:mm' },
        format: 'HH:mm',
        allowClear: false,
      },
    }
  )
