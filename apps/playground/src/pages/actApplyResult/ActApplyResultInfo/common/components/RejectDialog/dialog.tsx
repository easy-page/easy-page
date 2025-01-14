import React from 'react'
import { useState } from 'react'
import './dialog.less'
import { Input, Modal, ModalProps } from 'antd'

export type RejectDialogProps = Omit<
  ModalProps,
  'children' | 'onConfirm' | 'onCancel'
> & {
  visible?: boolean
  onClose?: () => void
  onConfirm?: (data: any) => void | Promise<void>
  onCancel?: () => void
  placeholder?: string
}

const MAX_LENGTH = 50
export const RejectDialog = (props: RejectDialogProps) => {
  const { onConfirm, onCancel, placeholder, ...rest } = props
  const [reason, setReason] = useState('')
  return (
    <Modal
      children={
        <div className="reject-dialog">
          <Input.TextArea
            showCount
            value={reason}
            className="reject-dialog-text"
            placeholder={placeholder}
            maxLength={MAX_LENGTH}
            rows={5}
            onChange={(e) => {
              setReason(e.target.value || '')
            }}
          />
        </div>
      }
      onOk={() => {
        return onConfirm?.(reason)
      }}
      okButtonProps={{
        disabled: !reason,
      }}
      onCancel={() => {
        onCancel?.()
      }}
      {...rest}
    ></Modal>
  )
}
