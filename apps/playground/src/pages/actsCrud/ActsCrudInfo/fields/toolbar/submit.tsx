import { ZsptButton } from '@/common'
import { FormUtil, nodeUtil } from '@easy-page/antd-ui'
import { Button, message } from 'antd'

export type SubmitOption<T> = {
  submitText: string
  submitHandler: (
    formData: T,
    options: {
      formUtil: FormUtil<Record<string, any>>
    }
  ) => Promise<void>
}

export function submit<T>({ submitHandler, submitText }: SubmitOption<T>) {
  return nodeUtil.createCustomNode(
    'submit',
    ({ frameworkProps: { getFormUtil } }) => {
      return (
        <ZsptButton
          onClick={async () => {
            const formUtil = getFormUtil?.()
            try {
              await formUtil?.validateVisibleFields()
              const formData = formUtil?.getFormData() || {}
              console.log('formData:', formData)
              return submitHandler(formData as T, { formUtil })
            } catch (error) {
              message.error('表单信息有误，请检查')
            }
          }}
        >
          {submitText}
        </ZsptButton>
      )
    },
    {}
  )
}
