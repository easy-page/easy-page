import { nodeUtil } from '@easy-page/antd-ui'
import {
  EditCliConfigFormProps,
  EditCliConfigFormState,
  FieldBelongState,
} from '../../interface'
import { Drawer } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ZsptButton } from '@/common'
import { get } from 'lodash'
import { ConfigsInfoMappings } from '../../constants'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { ConfigFields } from './components/ConfigField'
import { prepareFieldConfig } from '../../utils/prepareFieldConfig'

export const chooseFieldsBelong = nodeUtil.createCustomField<
  FieldBelongState,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'belong',
  '',
  ({ frameworkProps: { store }, value, onChange }) => {
    const fieldFullIds = store.pageState['fields'] || []
    const template = store.pageState['template']

    const fieldsTree = prepareFieldConfig({
      fieldIds: fieldFullIds,
      configs: {},
      belong: value,
      template: template.choosed as string,
    })

    console.log('fieldsTree:', fieldsTree)

    const [belong, setBelong] = useState(value)
    const [open, setOpened] = useState(false)

    useEffect(() => {
      setBelong(value)
    }, [value, open])

    const configOptions = useMemo(() => {
      const configsInfo = store.getPageProps()['configsMap']
      console.log('configsInfoconfigsInfo:', configsInfo)
      return Object.keys(ConfigsInfoMappings)
        .filter((e) => Boolean(ConfigsInfoMappings[e]))
        .map((e) => ({
          label: (configsInfo[e] as ConfigListInfo)?.name,
          value: e,
        }))
    }, [])
    return (
      <div className="flex flex-col flex-1">
        <div>
          <ZsptButton type="primary" onClick={() => setOpened(true)}>
            选择所属配置
          </ZsptButton>
        </div>
        <Drawer
          destroyOnClose
          closable={false}
          onClose={() => {
            setOpened(false)
          }}
          footer={
            <div className="flex flex-row justify-start  w-full p-4">
              <ZsptButton
                className="mr-2"
                onClick={() => {
                  setOpened(false)
                }}
              >
                取消
              </ZsptButton>
              <ZsptButton
                type="primary"
                onClick={() => {
                  onChange({
                    ...value,
                    ...belong,
                  })
                  setOpened(false)
                }}
              >
                确定
              </ZsptButton>
            </div>
          }
          title={'选择字段继承来源'}
          width={'95%'}
          open={open}
        >
          <div className="flex flex-col overflow-auto ">
            {fieldsTree.map((each) => {
              return (
                <ConfigFields
                  field={each}
                  configOptions={configOptions}
                  key={each.id}
                  belong={belong}
                  template={template}
                  onChange={setBelong}
                />
              )
            })}
          </div>
        </Drawer>
      </div>
    )
  },
  {
    effectedKeys: ['fields', 'configsMap', 'template'],
    value: {},
    preprocess({ defaultValues }) {
      return get(defaultValues, 'fullConfig.crudConfig.belong')
    },
    postprocess: ({ value }) => {
      // 统一通过 Fields 提交
      return {
        'crudConfig.belong': value ? { ...value } : {},
      }
    },
  },
  {
    formItem: {
      className: 'flex-1',
    },
  }
)
