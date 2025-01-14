import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  getChildrenFormData,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { BatchConfirmFormState } from '../../../../interface'
import { SingleBatchConfirmAct } from '@/common/apis/getBatchConfirmActList'
import {
  getPnList,
  ChargeSideEnum,
  IsMisOrgPn,
  pnListModel,
  ChargeTypeEnum,
  toNumber,
  PoiTypeEnum,
  batchConfirmPnListModel,
  AuthTypeEnum,
  mccModel,
  toJson,
} from '@/common'
import select from 'antd/es/select'
import { appendChargeDetailVosToList } from '../../uitils'
import { BatchConfirmSubsidyChargeDetailVo } from '@/common/apis/batchConfirmSubsidy'
import { crudPnListModal } from '@/common/models/crudPnList'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { preCheckPn } from '@/common/apis/preCheckPn'
import { ChoosePnExtraText } from './choosePnExtraText'

export type ChoosePnProps = {
  id: string
  poiType: PoiTypeEnum
  chargeSideCode: ChargeSideEnum
  disabled?: boolean
}

export const choosePn = ({ id, poiType, chargeSideCode }: ChoosePnProps) => {
  return nodeUtil.createField<
    SelectState<string>,
    BatchConfirmFormState,
    any,
    SelectEffectType
  >(
    id,
    '承担组织',
    {
      mode: 'single',
      required: true,
      value: { choosed: undefined },
      // effectedKeys: ['meituan.chargeAmt'],
      postprocess({ value, processedFormData }) {
        return appendChargeDetailVosToList(
          {
            poiType: poiType,
            chargeSide: chargeSideCode,
            pn: value.choosed || '',
          } as BatchConfirmSubsidyChargeDetailVo,
          processedFormData as {
            chargeDetailVos: BatchConfirmSubsidyChargeDetailVo[]
          }
        )
      },
      validate: ({ value, pageProps, pageState }) => {
        console.log('pageState', pageState)

        const mtChargeSide =
          pageState[`${poiType}_${ChargeSideEnum.MeiTuanShanGou}`]

        if (!mtChargeSide || toNumber(mtChargeSide) === 0) {
          return { success: true }
        }

        if (!value || !value.choosed) {
          return { success: false, errorMsg: '请选择补贴承担组织' }
        }
        return { success: true }
      },
      actions: [
        {
          /** 初始化执行 */
          initRun: true,
          effectedKeys: [
            'chooseAct',
            `${poiType}_${ChargeSideEnum.MeiTuanShanGou}`,
          ],
          action: async ({ value, initRun, effectedData }) => {
            const chooseAct =
              effectedData?.chooseAct as Array<SingleBatchConfirmAct>

            const mtChargeSide =
              effectedData[`${poiType}_${ChargeSideEnum.MeiTuanShanGou}`]

            if (!mtChargeSide || toNumber(mtChargeSide) === 0) {
              return {
                fieldValue: {
                  choosed: undefined,
                  options: [],
                },
                validate: true,
                effectResult: {
                  disabled: true,
                },
              }
            }

            const { data: resourceIdRes = [] } = subsidyAuthModel.getList()

            const hasAuth = resourceIdRes.find(
              (item) => item.resourceId === AuthTypeEnum.PoiConfirmMtCharge
            )?.status

            const isDisabled =
              !hasAuth || !Array.isArray(chooseAct) || chooseAct.length === 0

            if (!chooseAct || chooseAct.length === 0) {
              return {
                fieldValue: {
                  choosed: undefined,
                  options: [],
                },
                validate: false,
                effectResult: {
                  disabled: isDisabled,
                },
              }
            }

            const { data } = batchConfirmPnListModel.getList()

            // 获取Mcc映射配置
            const {
              data: { uoc_operate_confirm_template_pn_mapping },
            } = mccModel.getData()

            const pnMccConfigList = toJson(
              uoc_operate_confirm_template_pn_mapping,
              {
                defaultValue: {},
              }
            )

            let options = []

            // 根据模板ID筛选mcc配置
            const mccPnConfig = pnMccConfigList?.[0] || {}
            let mccPnList = ''
            Object.keys(mccPnConfig).map((item) => {
              mccPnList = mccPnConfig[item]
            })

            // 根据Mcc配置筛选PnList
            options = data.filter((item: any) => {
              return mccPnList.split(',').includes(item.pn)
            })

            if (options.length > 0) {
              return {
                fieldValue: {
                  choosed: options.length === 1 ? options[0].pn : undefined,
                  options: options,
                },
                validate: false,
                effectResult: {
                  disabled: isDisabled,
                },
              }
            }

            return {
              fieldValue: {
                choosed: undefined,
                options: [],
              },
              validate: false,
              effectResult: {
                select: {
                  disabled: isDisabled,
                },
              },
            }
          },
        },
      ],
    },
    {
      ui: UI_COMPONENTS.SELECT,
      select: {
        // ...disabledConfig,
        showSearch: true,
        allowClear: false,
        filterOption: false,
        notFoundContent: <span>无可用PN </span>,
        placeholder: '请选择',
        className: 'max-w-[250px]',
        fieldNames: {
          label: 'pnName',
          value: 'pn',
        },
        optionRender: ({ label, value, data }: any) => {
          const text = `${label}(${value})`
          console.log('balancebalance:', data.balance)
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={text}>
                <div
                  style={{
                    textOverflow: 'ellipsis',
                    display: 'block',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {text}
                </div>
              </Tooltip>

              {/* {data?.balance <= 0 ? (
                <Tooltip
                  className="ml-1"
                  title={'PN预算小于0，不可创建活动，请充值后再试'}
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              ) : (
                <></>
              )} */}
            </div>
          )
        },
      },
      formItem: {
        colon: false,
        className: 'w-[400px] mr-2 mb-0',
        customExtra: (props) => {
          return <ChoosePnExtraText {...props} />
        },
      },
    }
  )
}
