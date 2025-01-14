import { ActionTypeEnum, toNumber } from '@/common'
import { Collector, getCollectorList } from '@/common/apis/getCollectorList'
import { collectListModel } from '@/common/models/collectList'
import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../../../interface'

const prepareOptions = (collectorList: Collector[]) => {
  return collectorList.map((e) => ({
    ...e,
    label: `【ID: ${e.id}】${e.name}`,
  }))
}

export const filterRule = () =>
  nodeUtil.createField<
    SelectState<number | null>,
    CommonActCrudFormState,
    CommonActCrudFormProps,
    SelectEffectType
  >(
    'filterRule',
    '关联供给筛选集',
    {
      mode: 'single',
      value: { choosed: null, keyword: '' },
      preprocess({ defaultValues }) {
        const choosed = defaultValues?.invitation?.inputData
        return {
          choosed: toNumber(choosed) || null,
        }
      },
      postprocess: ({ value }) => {
        return {
          'invitation.inputData': value.choosed ? `${value.choosed}` : '',
        }
      },
      validate: ({ value }) => {
        if (!value || !value.choosed) {
          return { success: false, errorMsg: '请选择关联供给筛选集' }
        }
        return { success: true }
      },
      required: true,
      actions: [
        {
          effectedKeys: ['filterRule', 'chooseOperation'],
          /** 初始化执行 */
          initRun: true,
          /** 初始化查询选中数据 */
          action: async ({ value, initRun, effectedData }) => {
            const result = await searchAction({
              async searchByChoosed(choosed) {
                const result = await collectListModel.loadData(() =>
                  getCollectorList({
                    keyword: choosed ? `${choosed}` : '',
                  })
                )
                if (result?.success) {
                  return prepareOptions(result.data?.collectorList || [])
                }
                return []
              },
              async searchByKeyword(keyword) {
                const result = await collectListModel.loadData(() =>
                  getCollectorList({
                    keyword: keyword ? `${keyword}` : '',
                  })
                )
                if (result.success) {
                  return prepareOptions(result.data?.collectorList || [])
                }
                return []
              },
              initRun,
              value,
            })
            const chooseOperation = effectedData['chooseOperation']
            const isNoChange = chooseOperation === `${ActionTypeEnum.NoChange}`
            return {
              ...result,
              validate: !initRun,
              effectResult:
                chooseOperation && isNoChange
                  ? {
                      disabled: isNoChange,
                    }
                  : {},
            }
          },
        },
      ],
    
    },
    {
      ui: UI_COMPONENTS.SELECT,
      select: {
        allowClear: true,
        showSearch: true,
        filterOption: false,
        notFoundContent: null,
        placeholder: '支持供给筛选集id/名称搜索',

        fieldNames: {
          value: 'id',
          label: 'label',
        },
      },
    }
  )
