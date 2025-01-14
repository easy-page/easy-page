import { Tag } from 'antd'
import classNames from 'classnames'

export const TagRender = ({
  val,
  className,
}: {
  val: string[]
  className?: string
}) => {
  if (val.length === 0) {
    return <>-</>
  }
  return (
    <div className={classNames('flex flex-row mb-2  flex-wrap', className)}>
      {val.map((e) => (
        <Tag key={e} className="mr-2 mb-1">
          {e}
        </Tag>
      ))}
    </div>
  )
}
