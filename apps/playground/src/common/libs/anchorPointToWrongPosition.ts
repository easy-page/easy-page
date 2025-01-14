export const ANTD_ERROR_CLASS = '-has-error'
// export const ANTD_COMPONENT_ERROR_CLASS = '-status-error'

// -status-error
export const anchorPointToWrongPosition = (
  className: string = ANTD_ERROR_CLASS
) => {
  const firstErrorField = document.querySelector(`[class$="${className}"]`)
  // const defaultErrorField = document.querySelector(
  //   `[class$="${ANTD_COMPONENT_ERROR_CLASS}"]`
  // )
  // console.log('defaultErrorField:', defaultErrorField)
  // if (defaultErrorField) {
  //   // 优先找字段，找不到再找 ANTD_ERROR_CLASS ，解决子活动滚动问题
  //   defaultErrorField.scrollIntoView({ behavior: 'smooth' })
  //   return
  // }

  if (firstErrorField) {
    firstErrorField.scrollIntoView({ behavior: 'smooth' })
  }
}
