import { DeleteOutlined } from '@ant-design/icons'
import {
  DefaultPageProps,
  EditableConfig,
  Empty,
  nodeUtil,
} from '@easy-page/antd-ui'
import { Button } from 'antd'
import { FactorsFormProps } from '../interface'
import { OperationFactorItem, toJson } from '@/common'
import { clearStateWhenRemoveFactor } from '../libs/clearStateWhenRemoveFactor'

const disabledRemove = (editable: EditableConfig<any>, id: string) => {
  if (editable === false) {
    return true
  }
  if (editable === true) {
    return false
  }
  if (editable.canEditKeys?.includes(id)) {
    return false
  }
  if (editable.canNotEditKeys?.includes(id)) {
    return true
  }
  return false
}

export const createFactorFieldContaienr = (factor: OperationFactorItem) =>
  nodeUtil.createContainer<Empty, FactorsFormProps>(
    `${factor.factorCode}-container`,
    ({ children, frameworkProps: { store, getFormUtil } }) => {
      const { choosedFactors, setChoosedFactors, editable } =
        store.getPageProps() as FactorsFormProps & DefaultPageProps<any>

      return (
        <div className="flex-row w-full factor-form-item">
          {children}
          <Button
            disabled={disabledRemove(editable, `${factor.factorCode}`)}
            onClick={() => {
              setChoosedFactors(
                choosedFactors.filter((e) => e.factorCode !== factor.factorCode)
              )
              /** 清空当前选中的值 */
              const formUtil = getFormUtil?.()
              clearStateWhenRemoveFactor({ formUtil, factor })
            }}
            className="ml-2 flex items-center "
          >
            <DeleteOutlined />
          </Button>
        </div>
      )
    },
    {
      effectedKeys: ['choosedFactors'],
      when: {
        effectedKeys: ['choosedFactors'],
        show({ effectedData }) {
          const choosedFactors = effectedData['choosedFactors'] || []
          const choosed = Boolean(
            choosedFactors.find((e) => e.factorCode === factor.factorCode)
          )
          return choosed
        },
      },
    }
  )
