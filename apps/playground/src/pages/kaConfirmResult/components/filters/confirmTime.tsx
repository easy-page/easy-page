import { getQueryNumber } from '@/common'
import { SearchRuleId } from './constant'

import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import dayjs, { Dayjs } from 'dayjs'

export const confirmTime = nodeUtil.createField<Dayjs[]>(
  SearchRuleId.ConfirmTime,
  '合作运营确认时间',
  {
    value: [undefined, undefined],
    preprocess({ defaultValues }) {
      const confirmStartTime = getQueryNumber('confirmStartTime')
      const confirmEndTime = getQueryNumber('confirmEndTime')

      return [
        confirmStartTime ? dayjs(confirmStartTime * 1000) : undefined,
        confirmEndTime ? dayjs(confirmEndTime * 1000) : undefined,
      ]
    },
    postprocess: ({ value }) => {
      if (!value) {
        return {}
      }
      return {
        [SearchRuleId.ConfirmTime]: [
          value[0] ? dayjs(value[0]).startOf('D').unix() : undefined,
          value[1] ? dayjs(value[1]).endOf('D').unix() : undefined,
        ].filter((e) => Boolean(e)),
      }
    },
  },
  {
    ui: UI_COMPONENTS.DATE_PICKER_RANGE,
    datePickerRange: {
      picker: 'date',
      className: 'w-full',
    },
  }
)
