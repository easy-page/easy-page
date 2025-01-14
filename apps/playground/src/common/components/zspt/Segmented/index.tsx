import { useParamsInfo } from '@/common/hooks'
import { toNumber } from '@/common/libs'
import { Segmented, SegmentedProps } from 'antd'
import { useEffect, useState } from 'react'

export type ZsptSegmentedProps = SegmentedProps<any> & {
  paramId?: any
  defaultId: any
  onChange?: (id: any) => void
  /** 当前是否存在此权限 tab */
  hasTab: (id: any) => boolean
}

export const ZsptSegmented = ({
  paramId,
  defaultId,
  onChange,
  hasTab,
  ...rest
}: ZsptSegmentedProps) => {
  const { appendParamToUrl, params } = useParamsInfo()
  const [val, setVal] = useState(() => {
    const paramsVal = toNumber(params[paramId])
    if (hasTab(paramsVal)) {
      return paramsVal || defaultId
    }
    return defaultId
  })
  useEffect(() => {
    if (paramId) {
      appendParamToUrl({ [paramId]: val })
    }
  }, [val])

  return (
    <Segmented<number>
      {...rest}
      value={val}
      onChange={(value: number) => {
        console.log('Segmented value', value) // number
        setVal(value)
        onChange?.(value)
      }}
    />
  )
}
