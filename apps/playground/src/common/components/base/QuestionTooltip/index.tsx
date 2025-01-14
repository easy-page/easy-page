import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import classNames from 'classnames'

export type QuestionTooltipProps = {
  tooltip: string | React.ReactNode
  text: React.ReactNode
  showTip?: boolean
  placement?: 'top' | 'left' | 'right' | 'bottom'
  className?: string
}
export const QuestionTooltip = ({
  tooltip,
  text,
  showTip,
  className,
  placement = 'top',
}: QuestionTooltipProps) => {
  if (showTip) {
    return (
      <div className={classNames('flex flex-row items-center', className)}>
        <div>{text}</div>
        <QuestionCircleOutlined className="ml-1" />
        <div className="text-sec ml-2">{tooltip}</div>
      </div>
    )
  }
  return (
    <div className={classNames('flex flex-row items-center', className)}>
      <div>{text}</div>
      {tooltip ? (
        <Tooltip
          style={{ display: 'inline' }}
          rootClassName="whitespace-pre-line"
          title={tooltip}
          placement={placement}
        >
          <QuestionCircleOutlined className="ml-1" />
        </Tooltip>
      ) : (
        <></>
      )}
    </div>
  )
}
