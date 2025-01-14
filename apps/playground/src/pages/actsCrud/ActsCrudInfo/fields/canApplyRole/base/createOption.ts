import { Context, nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState, CommonActCrudFormProps } from '../../interface'

export const createApplyRoleOption = ({
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
        effectedKeys: ['dataType', 'poiType'],
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
