import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../../interface'
import { TemplateIdType } from '@/common/constants/fieldMaps/interface'
import { get } from 'lodash'
import { CliConfigConfirmSence, TemplateMap } from '../../constants'
import { Modal } from 'antd'

/** 选择字段模板：模板中包含一系列字段 */
export const chooseTemplate = nodeUtil.createField<
  SelectState<TemplateIdType>,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'template',
  '选择模板',
  {
    value: {
      choosed: undefined,
    },
    mode: 'single',
    // actions: [
    //   {
    //     initRun: true,
    //     effectedKeys: ['configs'],
    //     action: ({ effectedData, defaultValues }) => {
    //       const configs = effectedData['configs']
    //       return {
    //         fieldValue: {
    //           choosed: get(defaultValues, 'fullConfig.crudConfig.template'),
    //           options: Object.keys(TemplateMap).map((each) => ({
    //             label: configs[each as TemplateIdType]?.name,
    //             value: each,
    //           })),
    //         },
    //       }
    //     },
    //   },
    // ],
    postprocess({ value }) {
      return {
        'crudConfig.template': value.choosed,
      }
    },
    preprocess({ defaultValues }) {
      console.log('adasdsdasadsasad')
      return get(defaultValues, 'fullConfig.crudConfig.template')
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择',
      handleChange({
        value,
        preValue,
        onChange,
        frameworkProps: { store, nodeInfo },
      }) {
        if (!preValue.choosed) {
          onChange({
            ...preValue,
            choosed: value,
          })
          return
        }
        const { confirmDialogManager } =
          store.pageState as EditCliConfigFormState
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
                <div>修改后所选字段与字段归属配置都将重置，确认修改？</div>
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
          sence: CliConfigConfirmSence.ChangeTemplate,
        })
      },
    },
  }
)
