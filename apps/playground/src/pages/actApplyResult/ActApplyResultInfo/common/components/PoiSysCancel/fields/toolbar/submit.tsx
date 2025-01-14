import { Empty, ForEachOptions, nodeUtil } from '@easy-page/antd-ui'
import { ToolbarProps } from './interface'
import { anchorPointToWrongPosition } from '@/common/libs'
import { ZsptButton } from '@/common/components'
import { isEdit, isView } from '@/common/routes'
import { SubmitType } from '@/common/constants'

export const submit = ({
  id = 'submit',
  label = '提交',
  submitType = SubmitType.Default,
  ...restOptions
}: ForEachOptions<Empty> & {
  id?: string
  label?: string
  submitType?: SubmitType
}) =>
  nodeUtil.createCustomNode<any, Empty, ToolbarProps>(
    id,
    ({ frameworkProps: { store, getFormUtil } }) => {
      const { onSubmit } = store.getPageProps() as ToolbarProps
      const isContinueBtn = submitType !== SubmitType.Default
      return (
        <ZsptButton
          onClick={async () => {
            const formUtil = getFormUtil?.()
            console.log('submit formData:', formUtil?.getOriginFormData?.())
            try {
              await formUtil.validateVisibleFields()
              const data = formUtil?.getFormData?.(restOptions) || {}
              return onSubmit?.(
                {
                  ...data,
                },
                { submitType, formUtil }
              )
            } catch (error) {
              console.warn('error:', error)
              setTimeout(() => {
                anchorPointToWrongPosition()
              }, 50)
              return Promise.resolve()
            }
          }}
          type={!isContinueBtn ? 'primary' : 'default'}
          className="ml-2"
        >
          {label}
        </ZsptButton>
      )
    },
    {
      when: {
        show() {
          if (submitType === SubmitType.Continue) {
            return !isView() && !isEdit()
          }
          return !isView()
        },
      },
    }
  )
