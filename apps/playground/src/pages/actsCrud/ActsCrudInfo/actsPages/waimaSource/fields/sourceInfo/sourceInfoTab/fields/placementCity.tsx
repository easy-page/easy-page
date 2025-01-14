import { Employ, EmploySearch, searchUserInfos, toJson } from '@/common'
import {
  getSourceInfoList,
  LimitInfo,
  MaterialTypeEnum,
  ResourceTemplate,
} from '@/common/apis/getSourceInfoList'
import { ProvinceItem, queryCityInfo } from '@/common/apis/queryCityInfo'
import { sourceNameListModel } from '@/common/models/sourceInfoNameList'
import { placementCityModel } from '@/common/models/waiMaResource/placementCity'
import { nodeUtil } from '@easy-page/antd-ui'
import { Cascader, TreeSelect } from 'antd'
import { useEffect, useState } from 'react'

const { SHOW_PARENT } = TreeSelect
export const placementCity = nodeUtil.createCustomField<
  Array<{
    label: string
    value: string
  }>
>(
  'placementCity',
  '投放地区',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    const { pageState } = store

    const [loading, setLoading] = useState(false)
    const [cityInfoList, setCityInfoList] = useState<ProvinceItem[]>([])

    const transformProvinceList = (provinceList: ProvinceItem[]) => {
      //支持选择全部，选择全部时，其他一级城市置灰，展示为：全部
      return [
        {
          label: '全部',
          value: -1,
          children: provinceList.map((item) => {
            return {
              value: item.provinceId,
              label: item.provinceName,
              children: item.cityList.map((each) => ({
                value: each.cityId,
                label: each.cityName,
              })),
            }
          }),
        },
      ]
    }

    useEffect(() => {
      const getSourceInfo = async () => {
        if (placementCityModel.getList()?.data?.length > 0) {
          setCityInfoList(placementCityModel.getList()?.data || [])
        } else {
          const result = await placementCityModel.loadList(() =>
            queryCityInfo({})
          )
          setCityInfoList(result.data || [])
        }
      }
      getSourceInfo()
    }, [])

    return (
      <div className="">
        <TreeSelect
          multiple
          disabled={disabled}
          style={{ width: '100%' }}
          treeCheckable
          labelInValue
          showSearch={false}
          placeholder="请选择城市"
          treeDefaultExpandAll
          value={value}
          showCheckedStrategy={SHOW_PARENT}
          treeData={transformProvinceList(cityInfoList)}
          onChange={(value) => {
            onChange(value)
          }}
        />
      </div>
    )
  },
  {
    value: [],
    // effectedKeys: ['resourceName'],
    preprocess({ defaultValues }) {
      const cityInfoStr = defaultValues?.['cityInfo']
      const cityInfoObject = toJson(cityInfoStr, {
        defaultValue: [],
      })
      return cityInfoObject
    },
    postprocess: ({ value }) => {
      return {
        cityInfo: JSON.stringify(
          value.map((item) => {
            return {
              label: item.label,
              value: item.value,
            }
          })
        ),
      }
    },
    validate: ({ value }) => {
      if ((value || []).length === 0) {
        return {
          success: false,
          errorMsg: '请选择城市',
        }
      }

      return { success: true }
    },

    required: true,
  }
)
