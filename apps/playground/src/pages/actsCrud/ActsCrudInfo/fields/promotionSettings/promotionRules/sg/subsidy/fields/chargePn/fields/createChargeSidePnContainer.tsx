import { nodeUtil, SelectState } from '@easy-page/antd-ui'
import { ChargeSidePnPageProps } from '../chargePnForm/interface'
import { ChargeSidePnPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export type CreateChargeSidePnFieldOptions = {
  tooltip: string
  id: string
  label: string
}

export const createChargeSidePnContainer = ({
  tooltip,
  label,
  id,
}: CreateChargeSidePnFieldOptions) =>
  nodeUtil.createCustomField<any, ChargeSidePnPageState, ChargeSidePnPageProps>(
    id,
    label,
    ({ children }) => {
      return (
        <div className="flex flex-row items-start justify-start">
          {children}
        </div>
      )
    },
    {
      effectedKeys: ['pn'],
    },
    {
      formItem: {
        tooltip,
        className: 'mb-2',
        customExtra: ({ frameworkProps: { store } }) => {
          const { pn } = store.getAllState()
          const curVal = pn as SelectState<string>
          const options = curVal?.options || []
          const choosed = options.find((e) => e.value === curVal?.choosed)
          if (choosed) {
            return (
              <span className="text-sm">
                {choosed.label}({choosed.value})
              </span>
            )
          }
          return <></>
        },
      },
      layout: { disableLayout: true },
    }
  )
