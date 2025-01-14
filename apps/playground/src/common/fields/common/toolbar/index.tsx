import { Empty, ForEachOptions, nodeUtil } from '@easy-page/antd-ui'
import { cancel } from './cancel'
import { submit } from './submit'
import { ToolbarProps } from './interface'
import './index.less'
import { SubmitType } from '@/common/constants'
import classNames from 'classnames'

/**
 *  - 创建活动、方案底部固定工具栏，EasyPage 父元素需要有：relative
 */
export const baseToolbar = () =>
  nodeUtil.createContainer<Empty, ToolbarProps>(
    'form-toolbar',
    ({ children }) => {
      return (
        <div className="flex h-[64px] flex-row toolbar-border justify-end px-4 bg-white  fixed left-[0] bottom-[0] toolbar-zindex py-4 w-full">
          {children}
        </div>
      )
    }
  )
export const toolbar = (options: {
  submitOptions?: ForEachOptions<Empty>
  name: string
}) => {
  const submitOptions = options.submitOptions || {}
  return baseToolbar().appendChildren([
    cancel,
    submit({
      id: 'submitAndCreate',
      label: options.name,
      submitType: SubmitType.Continue,
      ...submitOptions,
    }),
    submit(submitOptions),
  ])
}

/**
 * - 放在表单底部右侧剧中，EasyPage 父元素需要有：relative
 */
export const bottomToolbar = ({ className }: { className?: string }) =>
  nodeUtil
    .createContainer(
      'tool-bar',
      ({ children }) => {
        return (
          <div
            className={classNames(
              'flex flex-row  items-center toolbar-border mt-2 py-2 bg-white  left-0 bottom-0 toolbar-zindex justify-end w-full',
              className || 'sticky'
            )}
          >
            {children}
          </div>
        )
      },
      {}
    )
    .appendChildren([cancel, submit({})])

export * from './interface'
