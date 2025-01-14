import {
  AuthTypeEnum,
  ChargeSideEnum,
  ChargeSideInfo,
  ChargeTypeEnum,
  checkNumberInvalid,
  ISubActivity,
  PoiTypeEnum,
  toNumber,
} from '@/common'
import { getChargeDetailVosFromSubAct } from '@/pages/actsCrud/ActsCrudInfo'
import { InputProps, nodeUtil } from '@easy-page/antd-ui'
import { appendChargeDetailVosToList } from '../uitils'
import { BatchConfirmSubsidyChargeDetailVo } from '@/common/apis/batchConfirmSubsidy'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'

export type MerchantSubsidyInputProps = {
  title: string
  id: string
  disabled?: boolean
  chargeSideCode: ChargeSideEnum
  label?: string
  poiType: PoiTypeEnum
}

export const merchantSubsidyInput = ({
  id,
  title,
  label = '',
  chargeSideCode,
  poiType,
  disabled,
}: MerchantSubsidyInputProps) => {
  const range = {
    min: 0,
    max: 100,
  }
  return nodeUtil.createField(
    id,
    title,
    {
      required: true,
      validate: ({ value, pageState }) => {
        if (!value) {
          return { success: false, errorMsg: `请输入${title}` }
        }
        const res = checkNumberInvalid(value, {
          checkNumber: true,
          checkInteger: true,
          checkInRange: range,
        })
        if (!res.success) {
          return {
            success: false,
            errorMsg: `请输入[${range.min}-${range.max}]的整数`,
          }
        }

        if (poiType === PoiTypeEnum.Agent) {
          const agentValue = pageState[
            `${poiType}_${ChargeSideEnum.Agent}`
          ] as string
          console.log('agentValue', agentValue, typeof agentValue)

          const meituanValue = pageState[
            `${poiType}_${ChargeSideEnum.MeiTuanShanGou}`
          ] as string

          if (
            agentValue &&
            meituanValue &&
            (toNumber(agentValue) || 0) +
              (toNumber(meituanValue) || 0) +
              toNumber(value) !==
              100
          ) {
            return {
              success: false,
              errorMsg: `所有补贴承担比例之和需等于100`,
            }
          }
        }

        return {
          success: true,
        }
      },
      actions: [
        {
          /** 初始化执行 */
          initRun: true,
          effectedKeys: [
            `${poiType}_${ChargeSideEnum.MeiTuanShanGou}`,
            `${poiType}_${ChargeSideEnum.Agent}`,
          ],
          action: async ({ value, initRun, effectedData }) => {
            if (poiType === PoiTypeEnum.Direct) {
              const res =
                100 -
                Math.ceil(
                  toNumber(
                    effectedData[
                      `${poiType}_${ChargeSideEnum.MeiTuanShanGou}`
                    ] as string
                  ) || 0
                )

              if (res < 0) {
                return {
                  fieldValue: '0',
                  validate: true,
                }
              }

              return {
                fieldValue: `${res}`,
                validate: true,
              }
            } else {
              const res =
                100 -
                Math.ceil(
                  toNumber(
                    effectedData[
                      `${poiType}_${ChargeSideEnum.MeiTuanShanGou}`
                    ] as string
                  ) || 0
                ) -
                Math.ceil(
                  toNumber(
                    effectedData[`${poiType}_${ChargeSideEnum.Agent}`] as string
                  ) || 0
                )

              if (res < 0) {
                return {
                  fieldValue: '0',
                  validate: true,
                }
              }

              return {
                fieldValue: `${res}`,
                validate: true,
              }
            }
          },
        },
      ],
      postprocess({ value, processedFormData }) {
        return appendChargeDetailVosToList(
          {
            poiType: poiType,
            maxAmount: null,
            chargeSide: chargeSideCode,
            chargeAmt: toNumber(value),
            chargeType: ChargeTypeEnum.Percentage,
            pn: '',
          } as BatchConfirmSubsidyChargeDetailVo,
          processedFormData as {
            chargeDetailVos: BatchConfirmSubsidyChargeDetailVo[]
          }
        )
      },
    },
    {
      input: {
        placeholder: `${range.min}-${range.max}之间`,
        addonAfter: '%',
        disabled: true,
      },
      formItem: {
        colon: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
        style: {
          position: 'relative',
          left: '18px',
        },
      },
    }
  )
}
