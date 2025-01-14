import { nodeUtil } from '@easy-page/antd-ui'
import { showDecorator } from './common/showDecorator'
import { actType } from '@/admin/pages/crudConfig/fields/acts/actType'
import { SubmitPrefix } from './constant'
import { commonContainer } from './common/commonContainer'

export const qualify = showDecorator(
  'qualify',
  commonContainer('qualify', '因子配置').appendChildren([
    nodeUtil.extends(actType, {
      id: 'qualify',
      postprocess() {
        return ({ value }) => {
          return {
            [`${SubmitPrefix}.qualify`]: value,
          }
        }
      },
      // preprocess() {
      //   return ({ pageProps }) => {
      //     console.log('casdsasdsasad:', pageProps.defaultValues?.qualify)
      //     return pageProps.defaultValues?.qualify
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
