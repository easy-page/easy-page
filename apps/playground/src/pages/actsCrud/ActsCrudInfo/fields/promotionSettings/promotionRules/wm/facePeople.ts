import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import {
  ISubActivity,
  PromotionKey,
  SubsidyOptEnum,
  TargetUserTypeDesc,
  TargetUserTypeEnum,
  toNumber,
} from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  CommonSubActPageProps,
  CommonSubActPageState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { appendToKeyList } from './utils'
import { getKeyListInfo } from '../utils'

export const facePeople = nodeUtil
  .createField<
    SelectState<string | null>,
    CommonSubActPageState,
    CommonSubActPageProps,
    SelectEffectType
  >(
    'facePeople',
    '面向人群',
    {
      required: true,
      value: { choosed: `${TargetUserTypeEnum.ALL}`, options: [] },
      // 下拉框不配置这个，默认值会有问题
      mode: 'single',
      postprocess: (context) => {
        const { value } = context
        return appendToKeyList(context, {
          appendValue: (keyList) => {
            keyList.push({
              key: PromotionKey.TargetUserType,
              minValue: value.choosed,
              opt: SubsidyOptEnum.Eq,
            })
            return keyList
          },
        })
      },
      preprocess: ({ defaultValues }) => {
        const info = getKeyListInfo({
          defaultValues: defaultValues as ISubActivity,
          key: PromotionKey.TargetUserType,
        })
        if (info) {
          return { choosed: info?.min }
        }
        return { choosed: `${TargetUserTypeEnum.ALL}` }
      },
      validate: ({ value }) => {
        if (!value || !value.choosed) {
          return { success: false, errorMsg: '必选' }
        }
        return { success: true }
      },
    },
    {
      ui: UI_COMPONENTS.SELECT,
      formItem: {
        tooltip: '',
      },
      select: {
        placeholder: '请选择',
        className: 'w-[300px]',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode(`${TargetUserTypeEnum.ALL}`, {
      name: TargetUserTypeDesc[TargetUserTypeEnum.ALL],
    }),
    nodeUtil.createNode(`${TargetUserTypeEnum.PLATFORM_NEW_CUSTOMER}`, {
      name: TargetUserTypeDesc[TargetUserTypeEnum.PLATFORM_NEW_CUSTOMER],
    }),
    nodeUtil.createNode(`${TargetUserTypeEnum.SG_NEW_CUSTOMER}`, {
      name: TargetUserTypeDesc[TargetUserTypeEnum.SG_NEW_CUSTOMER],
    }),
    nodeUtil.createNode(`${TargetUserTypeEnum.ChenliuUsers}`, {
      name: TargetUserTypeDesc[TargetUserTypeEnum.ChenliuUsers],
    }),
  ])
