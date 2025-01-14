import { CategoryCode, OperationFactorItem } from '@/common/apis'
import { FactorAssociationRulesMap } from '@/pages/actsCrud/ActsCrudInfo/actsPages'

export type FactorsFormProps = {
  choosedFactors: OperationFactorItem[]
  setChoosedFactors: (choosedFactors: OperationFactorItem[]) => void
}

export type CategoryInfo = {
  code: CategoryCode
  title: string
  tooltips?: string
}

export type MccConfig = {
  factorAssociationRulesMap: FactorAssociationRulesMap
}
export type GetFieldsOption = {
  allFactors: OperationFactorItem[]
  id: string
  mccConfigs: MccConfig
}
