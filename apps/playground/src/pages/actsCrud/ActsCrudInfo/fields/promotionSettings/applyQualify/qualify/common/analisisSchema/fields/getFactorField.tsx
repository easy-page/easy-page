import {
  ComponentProps,
  DangerouslySetInnerHTML,
  DecoratorProps,
  OperationFactorItem,
  toJson,
} from '@/common'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Empty, nodeUtil } from '@easy-page/antd-ui'
import { Tooltip } from 'antd'
import { CategoryInfo, FactorsFormProps, MccConfig } from '../interface'

import { getFactorsValidate } from '../validate'
import { processMap } from '../../process'

export const getFactorField = ({
  componentProps,
  decoratorProps,
  factor,
  componentName,
  defaultValue,
  categoryCode,
  mccConfigs,
}: {
  factor: OperationFactorItem
  componentName: string
  decoratorProps: DecoratorProps
  categoryCode: string
  defaultValue: Partial<Record<string, string>>
  componentProps: ComponentProps
  mccConfigs: MccConfig
}) => {
  const processDataHandler = processMap[factor.factorCode]
  // const deps =
  //   mccConfigs?.factorAssociationRulesMap?.[factor.factorCode]?.co_occurrence ||
  //   []
  // console.log('depsdeps:', deps)
  return nodeUtil.createField<any, Empty, FactorsFormProps>(
    factor.factorCode,
    factor.factorName,
    {
      ...(defaultValue ? { value: defaultValue } : {}),
      validate: getFactorsValidate(factor, {
        mccConfigs,
      }),
      // /** 依赖的元素能够被更新 */
      // effectedKeys: deps as any,
      postprocess: (context) => {
        if (processDataHandler?.postprocess) {
          return processDataHandler?.postprocess(context)
        }
        const { value } = context
        return {
          [factor.factorCode]: JSON.stringify({
            ...value,
            feExtend: value?.feExtend
              ? JSON.stringify({
                  ...value.feExtend,
                  // 稳妥起见，在提交数据的时候强制保存一个
                  factorCategoryCode: categoryCode,
                })
              : JSON.stringify({
                  factorCategoryCode: categoryCode,
                }),
          }),
        }
      },
      preprocess(context) {
        if (processDataHandler?.preprocess) {
          return processDataHandler?.preprocess(context)
        }
        const { defaultValues } = context
        const curVal = toJson(defaultValues?.[factor.factorCode], {
          defaultValue: factor.viewConfig?.default,
        })
        return {
          ...curVal,
          feExtend: curVal?.feExtend
            ? toJson(curVal?.feExtend, { defaultValue: {} })
            : {},
        }
      },
    },
    {
      ui: componentName,
      [componentName]: {
        oldProps: componentProps,
        factor: {
          ...factor,
          categoryCode: categoryCode,
        },
      } as any,
      formItem: {
        labelCol: {
          span: 4,
        },
        tooltip: decoratorProps?.tooltip ? (
          <Tooltip
            style={{ display: 'inline' }}
            title={
              <DangerouslySetInnerHTML
                children={decoratorProps.tooltip}
              ></DangerouslySetInnerHTML>
            }
          >
            <QuestionCircleOutlined />
          </Tooltip>
        ) : undefined,
      },
    }
  )
}
