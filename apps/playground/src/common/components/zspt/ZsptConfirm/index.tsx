import { Modal, ModalFuncProps } from 'antd'
import './index.less'
import classNames from 'classnames'

export const zsptConfirm = (
  props: ModalFuncProps & {
    /** 宽度通过：className 属性指定即可 */
    height?: number
    minHeight?: number
  }
) => {
  return Modal.confirm({
    ...props,
    centered: true,
    className: classNames(props.className, 'zspt-confirm'),
    styles: {
      content: {
        ...(props.height ? { height: `${props.height}px` } : {}),
        minHeight: props.minHeight,
        width: '100%',
        overflow: 'hidden',
        padding: 0,
      },
      body: { height: '100%', overflow: 'hidden' },
    },
  })
}
