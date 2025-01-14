import {
  CommonSubActPageProps,
  CommonSubActPageState,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { SelectState } from '@easy-page/antd-ui'

/** 选择承担组织自增表单的 FormProps */
export type ChargeSidePnPageProps = Partial<CommonSubActPageProps> & {
  chargeType?: SelectState<string>
  onRemove: () => void
} & Partial<CommonSubActPageState>
