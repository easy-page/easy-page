import { Employ, EmploySearch, searchUserInfos } from '@/common'
import {
  getSourceInfoList,
  ResourceTemplate,
} from '@/common/apis/getSourceInfoList'
import {
  nodeUtil,
  searchAction,
  SelectState,
  UI_COMPONENTS,
} from '@easy-page/antd-ui'
import { Select } from 'antd'
import { debounce, get, String } from 'lodash'
import { useState, useCallback, useEffect, useRef } from 'react'
import { isCopy, isCreate, isEdit, isView } from '@/common'
import { sourceNameListModel } from '@/common/models/sourceInfoNameList'

export const sourceInfoName = nodeUtil.createField<SelectState<string>>(
  'resourceName',
  '资源位名称',

  {
    value: null,
    mode: 'single',
    actions: [
      {
        /** 初始化执行 */
        initRun: true,
        effectedKeys: ['resourceName'],
        /** 初始化查询选中数据 */
        action: async ({ value, initRun }) => {
          if (initRun) {
            let result = null
            const modelData = sourceNameListModel.getList()
            if (modelData?.data?.length > 0) {
              result = modelData
            } else {
              result = await sourceNameListModel.loadList(() =>
                getSourceInfoList({})
              )
            }

            return {
              fieldValue: {
                ...value,
                options: result.data,
              },
              validate: false,
            }
          } else {
            const result = await searchAction({
              uniqKey: 'resourceMaterialTemplateId',
              async searchByChoosed() {
                return []
              },
              async searchByKeyword(keyword) {
                const { data } = await sourceNameListModel.getList()
                if (data) {
                  return (data || []).filter(
                    (item) => !keyword || item.resourceName.includes(keyword)
                  )
                }
                return []
              },
              initRun,
              value,
            })
            console.log('result', result)

            return {
              ...result,
              validate: false,
            }
          }
        },
      },
    ],
    preprocess({ defaultValues }) {
      const materialType = get(defaultValues, 'materialType')
      // const resourceName = get(defaultValues, 'resourceName')
      return {
        choosed: materialType,
      }
    },
    postprocess: ({ value }) => {
      const resourceInfo = value?.options?.find(
        (item) => item.resourceMaterialTemplateId === value.choosed
      )
      return {
        materialType: value.choosed,
        resourceName: resourceInfo?.resourceName,
      }
    },
    required: true,
    validate: ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '必填',
        }
      }

      console.log('value?.options', value)

      if (isCopy()) {
        const resourceInfo = value?.options?.find(
          (item) => item.resourceMaterialTemplateId === value.choosed
        )

        if (!resourceInfo) {
          return {
            success: false,
            errorMsg: '当前选项不可用，请修改',
          }
        }
      }

      return { success: true }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      // labelInValue: true,
      showSearch: true,
      placeholder: '请选择',
      filterOption: false,
      fieldNames: {
        label: 'resourceName',
        value: 'resourceMaterialTemplateId',
      },
    },
  }
)
