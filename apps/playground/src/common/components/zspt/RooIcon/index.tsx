import classNames from 'classnames'
import './index.less'

export const RooIcon = ({ name, size }: { name: string; size: number }) => {
  return (
    <i
      className={classNames('roo-icon ', name)}
      style={{ height: size, width: size, fontSize: size }}
    ></i>
  )
}
