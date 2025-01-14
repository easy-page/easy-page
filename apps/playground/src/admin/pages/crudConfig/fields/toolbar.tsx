import { SubmitType } from '@/common'
import { baseToolbar, ToolbarProps } from '@/common/fields'
import { cancel } from '@/common/fields/common/toolbar/cancel'
import { submit } from '@/common/fields/common/toolbar/submit'
import { ForEachOptions, Empty, nodeUtil } from '@easy-page/antd-ui'

export const configToolbar = (options: ForEachOptions<Empty> = {}) =>
  baseToolbar().appendChildren([
    cancel,
    submit({
      id: 'submitAndCreate',
      label: '提交并新建',
      submitType: SubmitType.Continue,
      ...options,
    }),
    submit(options),
  ])

export const batchConfigToolbar = (options: ForEachOptions<Empty> = {}) =>
  baseToolbar().appendChildren([cancel, submit(options)])

export const cliConfigToolbar = (options: ForEachOptions<Empty> = {}) =>
  nodeUtil
    .createContainer<Empty, ToolbarProps>('form-toolbar', ({ children }) => {
      return (
        <div className="flex h-[64px] flex-row toolbar-border justify-end px-4 bg-white  fixed left-[0] bottom-[0] toolbar-zindex py-4 w-1/3">
          {children}
        </div>
      )
    })
    .appendChildren([
      cancel,
      nodeUtil.extends(
        submit({
          ...options,
          label: '保存',
        }),
        {
          when() {
            return {
              show() {
                return true
              },
            }
          },
        }
      ),
    ])
