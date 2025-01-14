import React, { useCallback, useMemo, useState } from 'react'
import Selector, {
  SelectorProps,
  NormalOption,
  SelectorOption,
} from '@roo/roo/Selector'
import { debounce } from 'lodash'
import './index.less'
import { Employ, searchUserInfos } from '@/common/apis'
import './index.less'

export interface IEmploySearch extends SelectorProps {
  maxCount?: number
}
export const MisSelectWithCheck: React.FC<IEmploySearch> = ({
  options,
  maxCount,
  ...props
}) => {
  const [loading, setLoading] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const [employList, setEmployList] = useState<Employ[]>(
    (options as Employ[]) ?? []
  )

  const searchEmploy = useCallback(
    debounce(async (keyword) => {
      setLoading(true)
      const res = await searchUserInfos({ keyword })
      if (res.success) {
        setEmployList(res.data || [])
      }
      setLoading(false)
    }, 1000),
    []
  )

  const handleSearch = useCallback((keyword) => {
    if (!keyword) {
      setEmployList([])
      return
    }
    searchEmploy(keyword)
  }, [])

  const optionRenderer = useCallback(
    (normalized: NormalOption, rawOption: SelectorOption) => {
      return (
        <div className="mis-search-container">
          <img
            src={`https://cs-monitor.sankuai.com/api/avatar/${normalized.value}`}
          />
          <span>{normalized.label}</span>
        </div>
      )
    },
    []
  )

  const isMaxSelectNum = useMemo(() => {
    if (maxCount === undefined) {
      return false
    }

    if (!Array.isArray(props.value)) {
      return false
    }

    return maxCount === props.value?.length
  }, [maxCount, props.value])

  if (refresh) {
    return <></>
  }

  return (
    <div className="selector-box">
      <Selector
        options={employList}
        fieldNames={{
          value: 'login',
          label: 'login',
        }}
        disabled={refresh}
        filterable
        clearable
        rawOption
        optionRenderer={optionRenderer}
        onSearch={handleSearch}
        notFoundContent={
          loading ? (
            <a
              className="disabled"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <i className="roo-icon roo-icon-loading ani-spin" />
              加载中
            </a>
          ) : null
        }
        {...props}
        onChange={(value, raw) => {
          if (value.length === 5) {
            setRefresh(true)
            setTimeout(() => {
              setRefresh(false)
            }, 10)
          }
          props.onChange(value, raw)
        }}
      />
      {isMaxSelectNum && (
        <div
          className="selector-mask"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        />
      )}
    </div>
  )
}
