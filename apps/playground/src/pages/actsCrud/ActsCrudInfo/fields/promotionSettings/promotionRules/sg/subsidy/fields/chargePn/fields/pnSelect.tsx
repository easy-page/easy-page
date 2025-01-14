import {
  SelectState,
  UI_COMPONENTS,
  getChildrenFormData,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import { Tooltip } from 'antd'
import { ChargeSidePnPageProps } from '../chargePnForm/interface'
import { isEmptyMtChargeAmt } from '../utils'
import { ChargeSidePnPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const pnSelect = nodeUtil.createField<
  SelectState<string>,
  ChargeSidePnPageState,
  ChargeSidePnPageProps
>(
  'pn',
  '',
  {
    mode: 'single',
    required: true,
    value: { choosed: undefined },
    effectedKeys: ['meituan.chargeAmt'],
    postprocess({ value }) {
      return {
        pn: value.choosed,
        pnName: (value.options || []).find(
          (item) => item.value === value.choosed
        )?.label,
      }
    },
    preprocess({ defaultValues }) {
      return {
        choosed: defaultValues?.['pn'],
      }
    },
    // 在 pnsChangeEffects 中维护
    // actions: [
    //   {
    //     effectedKeys: ['pn'],
    //     initRun: true,
    //     action: async ({ value, initRun, effectedData }) => {
    //       const result = await searchAction({
    //         uniqKey: 'value',
    //         async searchByChoosed() {
    //           return []
    //         },
    //         async searchByKeyword(keyword) {
    //           if (keyword === undefined) {
    //             return value.options || []
    //           }
    //           const res = (value.options || []).filter((e) =>
    //             (e.label as string).includes(keyword)
    //           )

    //           return [...res]
    //         },
    //         initRun,
    //         value,
    //       })
    //       return {
    //         ...result,
    //         validate: false,
    //       }
    //     },
    //   },
    // ],
    validate: ({ value, pageProps }) => {
      const mtCharge = pageProps['meituan.chargeAmt']
      if (isEmptyMtChargeAmt(mtCharge)) {
        return { success: true }
      }
      if (!value || !value.choosed) {
        return { success: false, errorMsg: '请选择补贴承担组织' }
      }
      return { success: true }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      showSearch: true,
      allowClear: false,
      filterOption: false,
      notFoundContent: <span>无可用PN </span>,
      placeholder: '请选择',
      className: 'max-w-[250px]',
      fieldNames: {
        label: 'label',
        value: 'value',
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

            {data?.balance <= 0 ? (
              <Tooltip
                className="ml-1"
                title={'PN预算小于0，不可创建活动，请充值后再试'}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            ) : (
              <></>
            )}
          </div>
        )
      },
    },
    formItem: {
      className: 'w-[400px] mr-2',
    },
  }
)
