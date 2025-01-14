import { SubmitType } from '@/common'
import { cancel } from '@/common/fields/common/toolbar/cancel'
import { submit } from '@/common/fields/common/toolbar/submit'
import { nodeUtil } from '@easy-page/antd-ui'
import classNames from 'classnames'

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
    .appendChildren([
      cancel,

      submit({
        id: 'submitAndCreate',
        label: '提交并继续新建',
        submitType: SubmitType.Continue,
      }),
      submit({}),
    ])
