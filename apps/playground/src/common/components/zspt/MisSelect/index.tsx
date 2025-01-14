import { Employ, searchUserInfos } from '@/common/apis'
import { Select, SelectProps } from 'antd'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

export type EmploySearchProps = SelectProps & {
  maxLength?: number
}

export const EmploySearch: React.FC<EmploySearchProps> = ({
  options,
  maxLength,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
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
  const handleSearch = useCallback((keyword: string) => {
    if (!keyword) {
      setEmployList([])
      return
    }
    searchEmploy(keyword)
  }, [])

  return (
    <Select
      options={employList}
      maxCount={maxLength}
      loading={loading}
      showSearch
      onSearch={handleSearch}
      fieldNames={{ value: 'login', label: 'login' }}
      optionRender={({ value, label }) => {
        return (
          <div className="flex flex-row">
            <img
              width={24}
              className="rounded-full mr-2"
              src={`https://cs-monitor.sankuai.com/api/avatar/${value}`}
            />
            <span>{label}</span>
          </div>
        )
      }}
      {...props}
      notFoundContent={<div>暂无数据</div>}
    ></Select>
  )
}
