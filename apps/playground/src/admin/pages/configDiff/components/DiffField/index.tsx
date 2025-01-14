import { ConfigId, ConfigIdText } from '@/admin/common/constant/configDiff'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { Select } from 'antd'
import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import { DiffConfigFieldInfo } from '../DiffConfigFieldInfo'
import { diffColumnInfos } from '../DiffConfigFieldInfo/fields'

export const DiffField = ({ configs }: { configs: ConfigListInfo[] }) => {
  const [search, setSearch] = useState('')
  const [searchAct, setSearchAct] = useState('')
  const [acts, setActs] = useState<number[]>([])
  const [configId, setConfigId] = useState<ConfigId>()
  const debounceSearch = debounce(setSearch, 200)
  const debounceSearchAct = debounce(setSearchAct, 200)
  const options = useMemo(() => {
    const opts = Object.keys(ConfigIdText)
      .map((e) => {
        return {
          value: e,
          label: ConfigIdText[e] || '',
        }
      })
      .filter((e) => {
        return e.label.includes(search)
      })
    return opts
  }, [search])

  const actOptions = useMemo(() => {
    const opts = configs
      .map((e) => ({
        label: e.name,
        value: e.id,
      }))
      .filter((e) => {
        return e.label.includes(searchAct)
      })
    return opts
  }, [searchAct, configs])
  return (
    <div>
      <div className=" mb-4 flex flex-row">
        <Select
          value={acts}
          mode="multiple"
          onChange={(e) => {
            setActs(e)
          }}
          filterOption={false}
          onSearch={(v) => debounceSearchAct(v)}
          className="w-[400px] mr-2 "
          showSearch
          placeholder="请选择对比活动"
          options={actOptions}
        />
        <Select
          value={configId}
          onChange={(e) => {
            setConfigId(e)
          }}
          filterOption={false}
          onSearch={(v) => debounceSearch(v)}
          className="w-[400px]"
          showSearch
          placeholder="请选择对比配置"
          options={options}
        />
      </div>
      <DiffConfigFieldInfo
        fields={diffColumnInfos}
        data={configs.filter((x) => {
          if (!acts || acts.length === 0) {
            return true
          }
          return acts.includes(x.id)
        })}
        fieldId={configId}
      />
    </div>
  )
}
