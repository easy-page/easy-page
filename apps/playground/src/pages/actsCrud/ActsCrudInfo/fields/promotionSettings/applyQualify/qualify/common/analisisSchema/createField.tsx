import {
  CUSTOM_COMPONENTS,
  CUSTOM_COMPONENTS_UI,
  OperationFactorItem,
} from '@/common'
import { getComponentName } from './libs/getComponentName'
import { createFactorFieldContaienr } from './fields/createFactorFieldContaienr'
import { getFactorField } from './fields/getFactorField'
import { MccConfig } from './interface'

export const createField = (
  factor: OperationFactorItem,
  categoryCode: string,
  options: {
    mccConfigs: MccConfig
  }
) => {
  const componentName = getComponentName(factor.componentName)
  const componet =
    CUSTOM_COMPONENTS[componentName as keyof typeof CUSTOM_COMPONENTS_UI]
  if (!componet) {
    console.error(`${componentName} 未注册`)
  }
  const componentProps = factor.viewConfig['x-component-props'] || {}
  const decoratorProps = factor.viewConfig['x-decorator-props']
  const defaultValue = factor.viewConfig.default

  return createFactorFieldContaienr(factor).appendChildren([
    getFactorField({
      factor,
      categoryCode,
      componentName,
      decoratorProps,
      defaultValue,
      componentProps: componentProps,
      mccConfigs: options.mccConfigs,
    }),
  ])
}
