import {
  Employ,
  EmploySearch,
  isCopy,
  isEdit,
  searchUserInfos,
  toJson,
} from '@/common'
import {
  getSourceInfoList,
  ResourceTemplate,
} from '@/common/apis/getSourceInfoList'
import { queryBrandByIds } from '@/common/apis/queryBrandByIds'
import {
  WaimaBrandItem,
  queryBrandByName,
} from '@/common/apis/queryBrandByName'
import { nodeUtil } from '@easy-page/antd-ui'
import { Selector } from '@roo/roo'
import { Select } from 'antd'
import { debounce, get, String } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

export const targetBrand = nodeUtil.createCustomField<
  Array<{ brandName: string; brandId: string }>
>(
  'targetBrand',
  '目标品牌',
  ({ value, onChange, disabled }) => {
    const [loading, setLoading] = useState(false)
    const [brandList, setBrandList] = useState<WaimaBrandItem[]>([])

    useEffect(() => {
      const checkBrandList = async () => {
        const res = await queryBrandByIds({
          brandIdList: value.map((item) => item.brandId),
        })

        if (res.success) {
          const resData = res.data?.items

          const computedList = value.map((item) => {
            const newitem = resData.find(
              (each) => each.brandId === item.brandId
            )
            if (newitem) {
              return newitem
            }
            return item
          })
          onChange(computedList)
        }
      }
      if (isEdit() || isCopy()) {
        checkBrandList()
      }
    }, [])

    const searchEmploy = useCallback(
      debounce(async (keyword) => {
        setLoading(true)
        const res = await queryBrandByName({
          brandName: keyword,
          pageNum: 1,
          pageSize: 20,
        })
        if (res.success) {
          setLoading(false)
          setBrandList(res.data?.items || [])
        }
      }, 1000),
      []
    )

    const handleSearch = useCallback((keyword: string) => {
      if (!keyword) {
        setBrandList([])
        return
      }
      searchEmploy(keyword)
    }, [])

    console.log('brandList', brandList)

    return (
      <Selector
        options={brandList}
        loading={loading}
        // showSearch
        disabled={disabled}
        // labelInValue
        onSearch={handleSearch}
        fieldNames={{ value: 'brandId', label: 'brandName' }}
        value={value}
        // mode={'multiple'}
        multiple
        rawOption
        maxCount={20}
        placeholder={'请输入'}
        onChange={(value) => {
          onChange(value)
        }}
        className="w-full"
        notFoundContent={
          <div style={{ paddingLeft: 12, color: '#ccc' }}>暂无数据</div>
        }
      ></Selector>
    )
  },
  {
    value: null,
    preprocess({ defaultValues }) {
      const targetBrandStr = get(defaultValues, 'targetBrand')
      const targetBrandArr = toJson(targetBrandStr, {
        defaultValue: [],
      })

      console.log('targetBrandArr', targetBrandArr)

      return targetBrandArr
    },
    postprocess: ({ value }) => {
      return {
        targetBrand: JSON.stringify(
          value.map((item) => ({
            brandName: item.brandName,
            brandId: item.brandId,
          }))
        ),
      }
    },
    validate: async ({ value }) => {
      if ((value || []).length === 0) {
        return {
          success: false,
          errorMsg: '请选择目标品牌',
        }
      }

      if (isCopy()) {
        const res = await queryBrandByIds({
          brandIdList: value.map((item) => item.brandId),
        })

        if (res.success) {
          const resData = res.data?.items

          const isNotValidItems = value.filter(
            (item) => !resData.find((each) => each.brandId === item.brandId)
          )

          if (isNotValidItems.length > 0) {
            return {
              success: false,
              errorMsg: `目标品牌:${isNotValidItems
                .map((item) => item.brandName)
                .join('，')}不可用，请重新选择`,
            }
          }
        } else {
          return {
            success: false,
            errorMsg: '目标品牌校验失败，请重试',
          }
        }
      }

      return { success: true }
    },
  }
)
