import { Context, nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState, CommonActCrudFormProps } from '../../interface'

// 折扣菜活动  是否可取消
export const createCanCancelOption = ({
  id,
  label,
  show,
  disabled,
}: {
  id: string
  label: string
  disabled?: boolean
  show: <DefaultValues = Record<string, unknown>>(
    context: Context<
      string,
      CommonActCrudFormState,
      CommonActCrudFormProps,
      DefaultValues
    >
  ) => boolean
}) => {
  return nodeUtil.createNode<
    string,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    id,
    {
      name: label,
      when: {
        effectedKeys: ['poiType'],
        show,
      },
    },
    {
      checkBox: {
        disabled: disabled,
      },
    }
  )
}
