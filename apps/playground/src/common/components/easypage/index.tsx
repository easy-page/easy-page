import { FactorTextarea } from './FactorTextarea'
import { Editor } from './Editor'
import { FactorSelectTextarea } from './FactorSelectTextarea'
import { FactorTextTextarea } from './FactorTextTextarea'
import { FactorCity } from './FactorCity'
import { FactorMultiCascader } from './FactorMultiCascader'
import { FactorBothSelect } from './FactorBothSelect'
import { FactorInterval } from './FactorInterval'
import { FactorIndividualSelect } from './FactorIndividualSelect'
import { FactorIndividualInput } from './FactorIndividualInput'
import { FactorSelectInterval } from './FactorSelectInterval'

export const CUSTOM_COMPONENTS_UI = {
  EDITOR: 'editor',
  FACTOR_SELECT_TEXT_AREA: 'factorSelectTextarea',
  FACTOR_TEXT_AREA: 'factorTextarea',
  FACTOR_TEXT_TEXT_AREA: 'factorTextTextarea',
  FACTOR_CITY: 'factorCity',
  FACTOR_MULTI_CASCADER: 'factorMultiCascader',
  FACTOR_BOTH_SELECT: 'factorBothSelect',
  FACTOR_INTERVAL: 'factorInterval',
  FACTOR_SELECT_INTERVAL: 'factorSelectInterval',
  FACTOR_INDIVIDUAL_SELECT: 'factorIndividualSelect',
  FACTOR_INDIVIDUAL_INPUT: 'factorIndividualInput',
}

export const CUSTOM_COMPONENTS = {
  [CUSTOM_COMPONENTS_UI.EDITOR]: Editor,
  [CUSTOM_COMPONENTS_UI.FACTOR_INDIVIDUAL_SELECT]: FactorIndividualSelect,
  [CUSTOM_COMPONENTS_UI.FACTOR_INTERVAL]: FactorInterval,
  [CUSTOM_COMPONENTS_UI.FACTOR_BOTH_SELECT]: FactorBothSelect,
  [CUSTOM_COMPONENTS_UI.FACTOR_CITY]: FactorCity,
  [CUSTOM_COMPONENTS_UI.FACTOR_TEXT_AREA]: FactorTextarea,
  [CUSTOM_COMPONENTS_UI.FACTOR_SELECT_TEXT_AREA]: FactorSelectTextarea,
  [CUSTOM_COMPONENTS_UI.FACTOR_TEXT_TEXT_AREA]: FactorTextTextarea,
  [CUSTOM_COMPONENTS_UI.FACTOR_MULTI_CASCADER]: FactorMultiCascader,
  [CUSTOM_COMPONENTS_UI.FACTOR_INDIVIDUAL_INPUT]: FactorIndividualInput,
  [CUSTOM_COMPONENTS_UI.FACTOR_SELECT_INTERVAL]: FactorSelectInterval,
}
