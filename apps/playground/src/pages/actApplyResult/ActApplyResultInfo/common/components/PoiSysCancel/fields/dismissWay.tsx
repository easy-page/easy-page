import {
  nodeUtil,
  RadioEffectedType,
  RadioGroupEffectType,
} from '@easy-page/antd-ui'
import {
  CHECK_AND_RETURN_OPTIONS,
  CheckAndReturnDesc,
  CheckAndReturnEnum,
} from '../constant'
import { PoiSysCancelFormProps, PoiSysCancelFormState } from '../interface'
import { batchGrayModel } from '@/common'
import { Tooltip } from 'antd'

export const dismisWay = nodeUtil.createField<
  CheckAndReturnEnum,
  PoiSysCancelFormState,
  PoiSysCancelFormProps,
  RadioGroupEffectType
>(
  'isAllSelect',
  '选择清退方式',
  {
    value: CheckAndReturnEnum.Section,
    mode: 'single',
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请选择清退方式' }
      }
      return { success: true }
    },
    postprocess({ value }) {
      return {
        isAllSelect: value === CheckAndReturnEnum.All,
      }
    },
    actions: [
      {
        initRun: true,
        action: () => {
          const {
            data: { batchSysCancelAll4Sg },
          } = batchGrayModel.getData()
          return {
            effectResult: {
              options: [
                {
                  label: CheckAndReturnDesc[CheckAndReturnEnum.Section],
                  value: CheckAndReturnEnum.Section,
                },
                {
                  label: (
                    <Tooltip title="需申请白名单权限，联系产品管理员">
                      {CheckAndReturnDesc[CheckAndReturnEnum.All]}
                    </Tooltip>
                  ),
                  value: CheckAndReturnEnum.All,
                  disabled: batchSysCancelAll4Sg !== '1',
                },
              ],
            },
          }
        },
      },
    ],
  },
  {}
)
