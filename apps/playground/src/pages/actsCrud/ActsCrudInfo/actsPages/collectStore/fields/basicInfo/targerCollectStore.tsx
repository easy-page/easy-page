import { collectStoreListModel, getJhdType, isEdit, toNumber } from '@/common'
import {
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
  searchAction,
} from '@easy-page/antd-ui'
import { CsActFormState } from '../../interface'
import { Modal } from 'antd'
import { ConfirmSceneEnum } from '@/common/fields'

export const targetCollectStore = nodeUtil.createField<
  SelectState<string | null>
>(
  'jhdType',
  '目标集合店',
  {
    mode: 'single',
    required: true,
    value: { choosed: null, keyword: '' },
    preprocess({ defaultValues }) {
      const choosed = defaultValues?.jhdType

      return {
        choosed: choosed || null,
      }
    },
    postprocess: ({ value }) => {
      return {
        jhdType: value.choosed ? `${value.choosed}` : '',
      }
    },
    validate: ({ value, pageState }) => {
      if (isEdit()) {
        console.log('pageState', pageState)
      }

      if (!value.choosed) {
        return {
          success: false,
          errorMsg: '请选择招商供给需要关联哪类集合店。',
        }
      }
      return { success: true }
    },
    actions: [
      {
        /** 初始化执行 */
        initRun: true,
        /** 初始化查询选中数据 */
        action: async ({ value, initRun }) => {
          const result = await searchAction({
            async searchByChoosed() {
              return []
            },
            async searchByKeyword() {
              const result = await collectStoreListModel.loadList(() =>
                getJhdType({})
              )
              if (result.data) {
                return result.data || []
              }
              return []
            },
            initRun,
            value,
          })

          return {
            ...result,
            validate: false,
          }
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    formItem: {
      tooltip: '请选择招商供给需要关联哪类集合店。',
    },
    select: {
      allowClear: false,
      showSearch: false,
      filterOption: false,
      notFoundContent: null,
      placeholder: '请选择',
      handleChange: ({
        onChange,
        value,
        preValue,
        frameworkProps: { store, nodeInfo },
      }) => {
        const { confirmDialogManager } = store.pageState as CsActFormState
        if (!preValue.choosed) {
          onChange({
            ...preValue,
            choosed: value,
          })
          return
        }
        confirmDialogManager?.confirm({
          callback() {
            onChange({
              ...preValue,
              choosed: value,
            })
          },
          onConfirm() {
            Modal.confirm({
              centered: true,
              title: '提示',
              content: (
                <div>
                  修改后优惠活动、预算管控信息、
                  <span className="text-[#FE4B48]">活动邀请信息</span>
                  均会被清空，是否修改？
                </div>
              ),
              onOk() {
                onChange({
                  ...preValue,
                  choosed: value,
                })
              },
            })
          },
          triggerField: nodeInfo.id,
          sence: ConfirmSceneEnum.CollectStoreChangeConfirm,
        })
      },
      fieldNames: {
        value: 'value',
        label: 'label',
      },
    },
  }
)
