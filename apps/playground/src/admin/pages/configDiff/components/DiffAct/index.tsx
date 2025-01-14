import { ConfigListInfo } from '@/common/apis/getConfigList'
import { Select } from 'antd'
import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import { DiffConfigInfo } from '../DiffConfigInfo'
import { diffColumnInfos } from '../DiffConfigFieldInfo/fields'

export const DiffAct = ({ configs }: { configs: ConfigListInfo[] }) => {
  const [configIds, setConfigIds] = useState<number[]>([])
  const [search, setSearch] = useState('')
  const debounceSearch = debounce(setSearch, 200)
  const options = useMemo(() => {
    const opts = configs
      .map((e) => ({
        label: e.name,
        value: e.id,
      }))
      .filter((e) => {
        return e.label.includes(search)
      })
    return opts
  }, [search, configs])
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Select
          value={configIds}
          mode="multiple"
          maxCount={2}
          onChange={(e) => {
            setConfigIds(e)
          }}
          filterOption={false}
          onSearch={(v) => debounceSearch(v)}
          className="w-[400px] mb-4"
          showSearch
          placeholder="请选择对比活动"
          options={options}
        />
      </div>
      <DiffConfigInfo
        actIds={configIds}
        data={configs}
        fields={diffColumnInfos}
      />
    </div>
  )
}
