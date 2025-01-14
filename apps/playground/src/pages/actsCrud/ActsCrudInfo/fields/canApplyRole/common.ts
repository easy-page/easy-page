import { baseApplyRole } from './base'
import {
  brandOwnerRoleOption,
  merchantRoleOption,
  poiOwnerRoleOption,
} from './options'

export const commonCanApplyRole = baseApplyRole().appendChildren([
  merchantRoleOption, // 商家
  poiOwnerRoleOption, // 门店负责人（BD）
  brandOwnerRoleOption, // 品牌负责人（KABD）
])
