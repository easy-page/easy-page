// 通用文本域组件
import React, { useCallback, useMemo } from 'react'
import { TextAreaProps } from 'antd/es/input'
import { Input, Tooltip } from 'antd'
import './index.less'
import { OperationFactorItem, ValidatorType } from '@/common/apis'

export type CommonTextareaProps = Omit<TextAreaProps, 'onChange'> & {
  commaSeparated: boolean // 是否以逗号分隔
  saveTextSpace: boolean // 是否保留字符串中的空格
  maxCount: number // 最大个数
  onChange?: (val: string) => void
  tipName?: string
  factor: OperationFactorItem
  dataKey: string
}
export const CommonTextarea: React.FC<CommonTextareaProps> = ({
  commaSeparated,
  saveTextSpace,
  maxCount,
  placeholder,
  value,
  factor,
  tipName,
  onChange,
  onBlur,
  dataKey,
  ...props
}) => {
  const handleMsg = useCallback(
    (msg: string) => {
      msg = msg || ''

      // 逗号分隔时自动替换中文逗号、去除多余逗号、去除开始和结尾的逗号
      if (commaSeparated) {
        msg = msg
          .trim()
          .replace(/，/g, ',') // 替换中文逗号
          .replace(/,+/g, ',') // 去除多余逗号
          .replace(/^,/g, '') // 去除字符串开始逗号
          .replace(/,$/g, '') // 去除字符串结束逗号
        if (saveTextSpace) {
          // 保留文本空格的情况下移除逗号前后的的空格
          msg = msg
            .trim()
            .replace(/\s+,/g, ',') // 去除逗号前空格
            .replace(/,\s+/g, ',') // 去除逗号后空格
        } else {
          // 不保留文本空格的情况下移除所有空格
          msg = msg.replace(/\s/g, '') // 去除空格
        }
      }
      console.log('msgmsg:', msg, commaSeparated)
      return msg
    },
    [commaSeparated]
  )

  const maxiQuantity = useMemo(() => {
    if (!factor.validators) {
      return null
    }
    const validatorList = factor.validators[dataKey]
    if (!validatorList) {
      return null
    }
    const maxiQuantityValidator = validatorList.find(
      (validator) => validator.type === ValidatorType.MaxiQuantity
    )
    return maxiQuantityValidator?.maxiQuantity
  }, [factor, dataKey])

  // 失去焦点时先处理逗号空格，然后再通知变更
  const handleOnBlur = (e) => {
    onChange(handleMsg(e.target.value))
    onBlur && onBlur(e)
  }

  // 粘贴时先处理逗号空格和最大个数限制，然后再通知变更
  const handleOnPaste = (e) => {
    const target = e.target
    setTimeout(() => {
      if (target) {
        let str = handleMsg(target.value)
        // 逗号分隔 && 大于最大个数 => 裁剪
        if (commaSeparated) {
          if (str && maxiQuantity && str.split(',').length > maxiQuantity) {
            str = str.split(',').slice(0, maxiQuantity).join(',')
          }
        }
        onChange(str)
      }
    }, 10)
  }

  const valueNum = value
    ? handleMsg(value as string)?.split(',').length || 0
    : 0
  return (
    <div className="flex flex-col w-full">
      <Tooltip title={placeholder} trigger={'focus'}>
        <Input.TextArea
          onChange={(e) => onChange?.(e.target.value)}
          autoSize={{ maxRows: 5 }}
          onPaste={handleOnPaste}
          value={value}
          onBlur={handleOnBlur}
          allowClear={true}
          placeholder={placeholder}
          {...props}
        ></Input.TextArea>
        {commaSeparated ? (
          <div
            className={`textarea-tip flex justify-end ${
              valueNum > maxCount ? 'textarea-tip-error' : ''
            }`}
          >
            {`(已输入${valueNum}个${tipName || ''}`}
            {maxCount ? ` ${valueNum}/${maxCount})` : ')'}
          </div>
        ) : null}
      </Tooltip>
    </div>
  )
}
