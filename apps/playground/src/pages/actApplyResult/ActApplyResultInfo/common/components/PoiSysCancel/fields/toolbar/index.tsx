import { nodeUtil } from '@easy-page/antd-ui'
import { cancel } from './cancel'
import { submit } from './submit'
import './index.less'
import classNames from 'classnames'

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
