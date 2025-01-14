import {
  Employ,
  EmploySearch,
  InviteInputTypeEnum,
  isCopy,
  isEdit,
  isView,
  searchUserInfos,
  toJson,
} from '@/common'
import {
  getSourceInfoList,
  ResourceTemplate,
} from '@/common/apis/getSourceInfoList'
import { checkSupplier } from '@/common/apis/waiMaResource/checkSupplier'
import {
  fuzzyQueryName,
  WaimaSupplierItem,
} from '@/common/apis/waiMaResource/fuzzyQueryName'
import { nodeUtil } from '@easy-page/antd-ui'
import { Selector } from '@roo/roo'
import { Select } from 'antd'
import { debounce, get } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

export const inputDataOfSelect = nodeUtil.createCustomField<{
  supplierId: number
  supplierName: string
}>(
  'invitation.inputDataOfSelect',
  ' ',
  ({ value, onChange, disabled }) => {
    const [loading, setLoading] = useState(false)
    const [supplierList, setSupplierList] = useState<WaimaSupplierItem[]>([])

    useEffect(() => {
      // 根据id反查name
      const checkSupplierList = async () => {
        const res = await checkSupplier({
          supplierId: String(value.supplierId),
        })

        if (res.success) {
          if (res?.data?.supplierName) {
            onChange({
              ...res?.data,
            })
          }
        }
      }
      if (isEdit() || isCopy() || isView()) {
        checkSupplierList()
      }
    }, [])

    const searchEmploy = useCallback(
      debounce(async (keyWord) => {
        setLoading(true)
        const res = await fuzzyQueryName({
          keyWord,
        })
        if (res.success) {
          setLoading(false)
          setSupplierList(res.data?.items || [])
        }
      }, 1000),
      []
    )

    const handleSearch = useCallback((keyword: string) => {
      if (!keyword) {
        setSupplierList([])
        return
      }
      searchEmploy(keyword)
    }, [])

    return (
      <Selector
        options={supplierList}
        loading={loading}
        // showSearch
        disabled={disabled}
        // labelInValue
        filterable
        onSearch={handleSearch}
        fieldNames={{ value: 'supplierId', label: 'supplierName' }}
        value={value}
        rawOption
        placeholder={'请输入'}
        onChange={(value) => {
          onChange(value)
        }}
        className="w-full"
        notFoundContent={
          <div style={{ paddingLeft: 12, color: '#ccc' }}>暂无数据</div>
        }
        contentRenderer={(raw: {
          supplierId: number
          supplierName: string
        }) => {
          if (!raw.supplierName) {
            return `${raw.supplierId}`
          }
          return `${raw.supplierName}(${raw.supplierId})`
        }}
      ></Selector>
    )
  },
  {
    value: null,
    when: {
      effectedKeys: ['invitation.inputType'],
      show({ effectedData }) {
        return (
          effectedData['invitation.inputType'] ===
          InviteInputTypeEnum.OnlineSearch
        )
      },
    },
    preprocess({ defaultValues }) {
      const targetSupplier = get(defaultValues, 'invitation.inputData')
      if (!targetSupplier) {
        return null
      }
      return {
        supplierId: targetSupplier,
        supplierName: '',
      }
    },
    postprocess: ({ value }) => {
      return {
        'invitation.inputData': value.supplierId,
      }
    },
    validate: async ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '请选择供应商id',
        }
      }

      if (isCopy()) {
        const res = await checkSupplier({
          supplierId: String(value.supplierId),
        })

        if (!res.success || !res?.data?.supplierName) {
          return {
            success: false,
            errorMsg: '供应商id校验失败，请重试',
          }
        }
      }

      return { success: true }
    },
  }
)
