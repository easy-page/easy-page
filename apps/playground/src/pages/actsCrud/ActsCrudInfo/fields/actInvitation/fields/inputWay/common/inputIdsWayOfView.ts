import { inputIdsWay } from '../base'
import { byIdOption, byUpload } from '../options'

/** 查看不带录入 ID 的输入框、选择框 */
export const commonInputIdsWayOfView = inputIdsWay().appendChildren([
  byIdOption(),
  byUpload(),
])
