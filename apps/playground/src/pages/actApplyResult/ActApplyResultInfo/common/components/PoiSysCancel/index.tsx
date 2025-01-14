/**
 * 清退弹窗
 *  */

import { EasyPage, DEFAULT_COMPONENTS } from '@easy-page/antd-ui'
import { pageInfo } from './pageInfo'
import {
  BaseContainer,
  batchGrayModel,
  ExitPoiApplyParams,
  GrayRuleCode,
  loadBatchGray,
} from '@/common'
import { PoiSysCancelFormProps, PoiSysCancelFormState } from './interface'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

export type PoiSysCancelProps = {
  onSubmit: (
    data: Pick<ExitPoiApplyParams, 'reason' | 'poiIds' | 'isAllSelect'>
  ) => Promise<void>
  onCancel: () => void
}
export const PoiSysCancel = observer(
  ({ onSubmit, onCancel }: PoiSysCancelProps) => {
    useEffect(() => {
      loadBatchGray({
        ruleCodes: [GrayRuleCode.BatchSysCancelAll4Sg],
        extend: {},
      })
    }, [])

    return (
      <BaseContainer isPanel models={[batchGrayModel]}>
        <EasyPage<PoiSysCancelFormState, PoiSysCancelFormProps>
          {...pageInfo}
          context={{
            onSubmit(data, options) {
              return onSubmit(data as any)
            },
            onCancel,
          }}
          commonUIConfig={{
            form: {
              labelCol: { span: 6 },
              wrapperCol: { span: 14 },
            },
          }}
          components={{
            ...DEFAULT_COMPONENTS,
          }}
        />
      </BaseContainer>
    )
  }
)
