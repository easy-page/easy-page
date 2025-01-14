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
import {
  Empty,
  InputEffectedType,
  InputProps,
  nodeUtil,
} from '@easy-page/antd-ui'
import { appendChargeDetailVosToList } from '../uitils'
import { BatchConfirmSubsidyChargeDetailVo } from '@/common/apis/batchConfirmSubsidy'
import { BatchConfirmFormState } from '../../../interface'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'

export type MeituanSubsidyInputProps = {
  title: string
  id: string
  disabled?: boolean
  chargeSideCode: ChargeSideEnum
  label?: string
  poiType: PoiTypeEnum
}

export const meituanSubsidyInput = ({
  id,
  title,
  label = '',
  chargeSideCode,
  poiType,
}: MeituanSubsidyInputProps) => {
  const range = {
    min: 0,
    max: 100,
  }
  return nodeUtil.createField<
    string,
    BatchConfirmFormState,
    Empty,
    InputEffectedType
  >(
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
            errorMsg: `美补比例仅可输入0-100 之间的整数`,
          }
        }

        if (poiType === PoiTypeEnum.Agent) {
          const agentValue = pageState[
            `${poiType}_${ChargeSideEnum.Agent}`
          ] as unknown as string

          if (
            agentValue &&
            (toNumber(agentValue) || 0) + (toNumber(value) || 0) > 100
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
      postprocess({ value, processedFormData }) {
        return appendChargeDetailVosToList(
          {
            poiType: poiType,
            maxAmount: null,
            chargeSide: chargeSideCode,
            chargeAmt: toNumber(value),
            chargeType: ChargeTypeEnum.Percentage,
          } as BatchConfirmSubsidyChargeDetailVo,
          processedFormData as {
            chargeDetailVos: BatchConfirmSubsidyChargeDetailVo[]
          }
        )
      },

      actions: [
        {
          effectedKeys: [`${poiType}_${ChargeSideEnum.Merchant}`] as any,
          action: async ({ value, initRun, effectedData }) => {
            if (
              effectedData[`${poiType}_${ChargeSideEnum.Merchant}`] === '100'
            ) {
              return {
                fieldValue: value,
                validate: false,
              }
            }

            return {
              fieldValue: value,
              validate: true,
            }
          },
        },
        {
          /** 初始化执行 */
          initRun: true,
          effectedKeys: [`chooseAct`],
          action: async ({ value, initRun, effectedData }) => {
            const chooseAct = effectedData['chooseAct']
            const { data: resourceIdRes = [] } = subsidyAuthModel.getList()
            const hasAuth = resourceIdRes.find(
              (item) => item.resourceId === AuthTypeEnum.PoiConfirmMtCharge
            )?.status

            const isDisabled =
              !hasAuth || !Array.isArray(chooseAct) || chooseAct.length === 0

            return {
              fieldValue: poiType === PoiTypeEnum.Agent ? '0' : '',
              validate: false,
              effectResult: {
                inputProps: {
                  disabled: isDisabled,
                },
              },
            }
          },
        },
      ],
    },

    {
      input: {
        placeholder: `${range.min}-${range.max}之间`,
        addonAfter: '%',
        // ...disabledConfig,
      },
      formItem: {
        className: 'mb-0',
        colon: false,
      },
    }
  )
}
