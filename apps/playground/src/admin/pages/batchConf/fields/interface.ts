import { ConfigId } from '@/admin/common/constant/configDiff'
import { SelectState } from '@easy-page/antd-ui'

export type BatchFilterFormState = {
  chooseField?: SelectState<ConfigId[]>
  chooseActs?: number[]
}

export type BatchFilterFormProps = {}
