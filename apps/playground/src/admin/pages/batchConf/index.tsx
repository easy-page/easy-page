import { CUSTOM_ADMIN_COMPONENTS } from '@/admin/common/components/easyPage'
import {
  fullConfigsModel,
  loadFullConfigs,
} from '@/admin/common/models/fullConfigs'
import { BaseContainer, getUserInfo, userModel } from '@/common'
import {
  DEFAULT_COMPONENTS,
  EasyPage,
  EXTRA_COMPONENTS,
  FormUtil,
  generateId,
  SelectState,
} from '@easy-page/antd-ui'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ConfigFormState, ConfigFormProps } from '../crudConfig/interface'
import { FieldsMap, getBatchConfigPageInfo } from './pageInfo'
import { batchConfigToolbar } from '../crudConfig/fields/toolbar'
import { BatchFilterForm } from './fields'
import { BatchFilterFormState } from './fields/interface'
import { flatten } from 'lodash'
import { batchUpdateConfig } from '@/admin/common/apis/batchUpdateConfig'
import { message, Modal } from 'antd'

export const BatchConfig = observer(() => {
  const {
    data: configs,
    error: fullError,
    loading: fullLoading,
  } = fullConfigsModel.getList()
  const {
    data: userInfo,
    loading: userLoading,
    error: userError,
  } = userModel.getData()

  const [choosedField, setChoosedField] = useState([])

  const formRef = useRef<FormUtil<ConfigFormState>>()
  const formFilterRef = useRef<FormUtil<BatchFilterFormState>>()

  useEffect(() => {
    loadFullConfigs()
    userModel.loadData(() => getUserInfo({}))
  }, [])

  const pageInfo = useMemo(() => {
    const defaultValues = formRef.current?.getFormData()
    const configIds = choosedField || []

    const nodesInfo = getBatchConfigPageInfo([
      ...flatten(configIds.map((e) => FieldsMap[e])),
      batchConfigToolbar({}),
    ])
    return {
      nodesInfo,
      id: generateId('batch-config'),
      defaultValues,
    }
  }, [choosedField])

  const loading = fullLoading || userLoading
  const error = fullError || userError
  return (
    <BaseContainer error={error} loading={loading}>
      <div className="p-8 flex flex-col">
        <div className="font-medium text-[24px] py-2">批量设置</div>
        <BatchFilterForm
          onChoosedFieldChange={(val) => {
            setChoosedField(val.choosed)
          }}
          formRef={formFilterRef}
        />
        <div className="px-6 bg-[#f4f4f499]">
          <EasyPage<ConfigFormState, ConfigFormProps>
            pageType="form"
            setFormUtil={(ref) => (formRef.current = ref)}
            key={pageInfo.id}
            {...pageInfo.nodesInfo}
            commonUIConfig={{
              form: {
                labelCol: { span: 4 },
                wrapperCol: { span: 18 },
                className: 'pb-[64px] px-4 pt-4',
              },
              formItem: {
                colon: false,
                className: 'min-w-[800px]',
              },
            }}
            defaultValues={{
              owner: userInfo?.mis,
              managers: userInfo?.mis,
              ...pageInfo.defaultValues,
            }}
            context={{
              userInfo,
              onCancel() {},
              async onSubmit(data, options) {
                const doSubmit = async () => {
                  const filterInfo = formFilterRef.current?.getFormData()
                  const res = await batchUpdateConfig({
                    config: data?.config,
                    env: data?.env,
                    whiteList: data.whiteList,

                    choosedActs: filterInfo.chooseActs || [],
                  })
                  if (res.success) {
                    message.success('批量更新成功')
                  } else {
                    message.error(res.msg)
                  }
                }
                Modal.confirm({
                  title: '确认批量更新?',
                  centered: true,
                  content: `提交后相关活动的变更会立刻生效，请确认是否提交`,
                  // <DiffConfigInfo
                  //   actIds={[1, 2]}
                  //   data={[
                  //     {
                  //       ...configDetail,
                  //       name: `【${configDetail.name}】改动前`,
                  //       id: 1,
                  //     },
                  //     {
                  //       ...data,
                  //       name: `【${configDetail.name}】改动后`,
                  //       id: 2,
                  //     } as any,
                  //   ]}
                  //   fields={diffColumnInfos}
                  //   filterFields={diffInfos.changedKeys || undefined}
                  // />
                  onOk: async () => {
                    return doSubmit()
                  },
                  onCancel: () => {},
                })
              },
            }}
            components={{
              ...DEFAULT_COMPONENTS,
              ...EXTRA_COMPONENTS,
              ...CUSTOM_ADMIN_COMPONENTS,
            }}
          />
        </div>
      </div>
    </BaseContainer>
  )
})
