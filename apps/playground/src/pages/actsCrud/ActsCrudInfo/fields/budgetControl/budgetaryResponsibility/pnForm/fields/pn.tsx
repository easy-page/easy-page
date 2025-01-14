import {
  FormItemEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import { ActFullInfo, DotText, IBudget, isCopy, isCreate } from '@/common'
import { BudgetaryPnPageState } from '../../../../interface'
import { BudgetaryPnPageProps } from '../interface'

export const pn = nodeUtil.createField<
  SelectState<string>,
  BudgetaryPnPageState,
  BudgetaryPnPageProps,
  FormItemEffectType
>(
  'pn',
  '',
  {
    mode: 'single',
    required: true,
    actions: [
      {
        effectedKeys: ['formIndex'],
        initRun: true,
        action: ({ effectedData }) => {
          return {
            effectResult: {
              formItem: {
                label: `预算承担${effectedData['formIndex'] + 1}`,
              },
            },
          }
        },
      },
    ],
    preprocess({ defaultValues }) {
      if (!defaultValues?.pn) {
        return { choosed: undefined, options: [] }
      }

      return {
        choosed: defaultValues.pn,
        options: [{ value: defaultValues.pn, label: defaultValues.pnName }],
      }
    },
    postprocess({ value, defaultValues }) {
      const { options = [] } = value || {}
      const pnInfo = options.find((item) => item.value === value.choosed)
      return {
        pn: value.choosed,
        pnName: pnInfo?.label,
        balance: defaultValues?.balance,
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,

    formItem: {
      // noStyle: true,
      className: 'mb-0',
      disabled: true,
      customExtra: ({ frameworkProps: { store } }) => {
        const { offline } = (store.getDefaultValues() || {}) as IBudget
        if (!offline || isCreate() || isCopy()) {
          return <></>
        }

        return <div className="text-[#FF4D4F] font-medium">PN超预算下线</div>
      },
    },
    select: {
      className: 'w-[240px]',
      labelRender: (text) => {
        console.log('texttext:', text)
        return (
          <DotText line={1} className="w-[200px]">
            {text.label}
          </DotText>
        )
      },
    },
  }
)
