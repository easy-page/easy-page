import {
  BaseContainer,
  isView,
  OperationType,
  SubmitType,
  userModel,
} from '@/common'
import { DEFAULT_COMPONENTS, EasyPage, generateId } from '@easy-page/antd-ui'
import { Drawer, message } from 'antd'
import { observer } from 'mobx-react'
import { pageInfo } from './pageInfo'
import { CrudFieldFormProps, CrudFieldFormState } from './interface'
import { useEffect } from 'react'
import { fieldDetailModel } from '@/admin/common/models/fieldDetail'
import { getFieldDetail } from '@/admin/common/apis/getFieldDetail'
import { createField } from '@/admin/common/apis/createField'
import { loadFieldListToModel } from '@/admin/common'
import { updateField } from '@/admin/common/apis/updateField'

export type CrudFieldProps = {
  id?: number
  onClose: () => void
  operationType: OperationType
  onOpen: () => void
}

const DrawerTitle: Record<OperationType, string> = {
  [OperationType.CREATE]: '创建字段',
  [OperationType.COPY]: '复制字段',
  [OperationType.VIEW]: '查看字段',
  [OperationType.EDIT]: '编辑字段',
}

export const CrudField = observer(
  ({ operationType, id, onClose, onOpen }: CrudFieldProps) => {
    const { loading, error, data } = fieldDetailModel.getData()
    const { data: userInfo } = userModel.getData()
    useEffect(() => {
      if (id) {
        fieldDetailModel.loadData(() => getFieldDetail({ id }))
      }
    }, [id])
    console.log('Boolean(operationType):', Boolean(operationType))
    return (
      <Drawer
        destroyOnClose
        closable
        onClose={() => {
          onClose()
        }}
        title={DrawerTitle[operationType || OperationType.CREATE]}
        width={'60%'}
        open={Boolean(operationType)}
      >
        <BaseContainer loading={loading} error={error}>
          <EasyPage<CrudFieldFormState, CrudFieldFormProps>
            pageType="form"
            {...pageInfo}
            defaultValues={{ ...data, owner: data.owner || userInfo?.mis }}
            commonUIConfig={{
              form: {
                className: 'relative h-full',
              },
            }}
            key={id || generateId('new-field')}
            context={{
              onCancel() {
                onClose()
              },
              editable: operationType !== OperationType.VIEW,
              async onSubmit(data, options) {
                const isEdit = operationType === OperationType.EDIT
                const isCopy = operationType === OperationType.COPY
                if (isCopy) {
                  delete data.id
                }
                const action = isEdit ? updateField : createField
                const res = await action({
                  ...data,
                  updator: userInfo?.mis,
                } as any)
                if (res.success) {
                  message.success('创建成功')
                  loadFieldListToModel()
                  onClose()
                  if (options.submitType === SubmitType.Continue) {
                    onOpen()
                  }
                } else {
                  onClose()
                  message.error(res.msg || '创建失败')
                }
              },
            }}
            components={{ ...DEFAULT_COMPONENTS }}
          />
        </BaseContainer>
      </Drawer>
    )
  }
)
