import { nodeUtil } from '@easy-page/antd-ui'
import { showDecorator } from './common/showDecorator'
import { actType } from '@/admin/pages/crudConfig/fields/acts/actType'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../../interface'
import { SubmitPrefix } from './constant'
import { commonContainer } from './common/commonContainer'

export const actPromotionType = showDecorator(
  'promotionType',
  commonContainer('promotionType', '促销类型').appendChildren([
    nodeUtil.extends(actType, {
      id: 'promotionType',
      postprocess() {
        return ({ value }) => {
          return {
            [`${SubmitPrefix}.promotionType`]: value,
          }
        }
      },
      // preprocess() {
      //   return ({ pageProps }) => {
      //     console.log('casdsasdsasad:', pageProps.defaultValues?.promotionType)
      //     return pageProps.defaultValues?.promotionType
      //   }
      // },
      actions() {
        return [
          {
            effectedKeys: ['fullConfig'],
            initRun: true,
            action: ({ pageState }) => {
              return {
                fieldValue: pageState.fullConfig?.config?.actType as string,
              }
            },
          },
        ]
      },
      fieldUIConfig(oldFieldUIConfig) {
        return {
          ...oldFieldUIConfig,
          input: {
            ...(oldFieldUIConfig.input || {}),
            disabled: true,
          },
        }
      },
    }),
  ])
)
