import { FieldBelongState } from '@/admin/pages/editCliConfig/interface'
import { getFieldName } from '@/admin/pages/editCliConfig/utils/getFieldName'
import { ZsptButton } from '@/common'
import {
  FieldConfig,
  TemplateIdType,
} from '@/common/constants/fieldMaps/interface'
import { FiedConfigs } from '@/pages/actsCrud/ActsCrudInfo/common'
import { SelectState } from '@easy-page/antd-ui'
import { Checkbox, Input, Modal, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { getBatchConfig } from '../../utils/getBatchConfig'

export type ConfigFieldsProps = ConfigFieldProps

export type ConfigFieldProps = {
  field: FieldConfig
  belong?: FieldBelongState
  configOptions?: {
    label: string
    value: string
  }[]
  template: SelectState<TemplateIdType>
  onChange: (value: FieldBelongState) => void
  disableChildrenConfig?: boolean
  disableTitle?: boolean
  showBatchConfig?: boolean
}

export const ConfigField = ({
  field,
  configOptions,
  template,
  belong = {},
  onChange,
  disableTitle,
  disableChildrenConfig,
}: ConfigFieldProps) => {
  const id = field.id
  const fieldName = useMemo(() => getFieldName(id), [id])
  const type = belong?.[id] || template?.choosed
  const hasChildren = field.children?.length > 0
  const [showChildren, setShowChildren] = useState(false)
  const [childrenBelong, setChildrenBelong] = useState(belong)

  useEffect(() => {
    setChildrenBelong(belong)
  }, [belong, showChildren])

  return (
    <div key={id} className="flex flex-row items-center">
      {disableTitle ? (
        <></>
      ) : (
        <>
          <Input value={fieldName} disabled className="w-[250px]" />
          <div className="px-2 ">继承于</div>
        </>
      )}
      <Select
        options={configOptions || []}
        value={type}
        className="min-w-[200px]"
        placeholder="请选择所属配置"
        onChange={(val) => {
          onChange({
            ...belong,
            [id]: val,
          })
        }}
      />
      {hasChildren && !disableChildrenConfig ? (
        <ZsptButton
          type="default"
          onClick={() => setShowChildren(true)}
          className="ml-2"
        >
          设置子元素
        </ZsptButton>
      ) : (
        <></>
      )}
      <Modal
        destroyOnClose
        onCancel={() => {
          setShowChildren(false)
        }}
        onClose={() => {
          setShowChildren(false)
        }}
        onOk={() => {
          onChange(childrenBelong)
          setShowChildren(false)
        }}
        title={'配置子字段'}
        width={'95%'}
        open={showChildren}
      >
        <div className="flex flex-col overflow-auto ">
          {(field.children || []).map((each) => {
            return (
              <ConfigFields
                field={each}
                showBatchConfig
                configOptions={configOptions}
                key={each.id}
                belong={childrenBelong}
                template={template}
                onChange={setChildrenBelong}
              />
            )
          })}
        </div>
      </Modal>
    </div>
  )
}

export const ConfigFields = ({
  field,
  belong,
  template,
  configOptions,
  onChange,
  showBatchConfig,
}: ConfigFieldsProps) => {
  const fieldName = useMemo(() => getFieldName(field.id), [field])
  const hasChildren = field.children?.length > 0
  const [batch, setBatch] = useState(false)
  return (
    <div className="flex flex-col mb-2">
      <div className="my-2 flex flex-row items-center">
        {hasChildren ? (
          <div className=" flex flex-row items-center mr-2">
            <div className="font-medium">{fieldName}</div>
            {showBatchConfig ? (
              <Checkbox
                className="mx-4 mr-2"
                value={batch}
                onChange={(e) => setBatch(!e.target.value)}
              >
                批量设置于子元素
              </Checkbox>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <ConfigField
          field={field}
          belong={belong}
          disableTitle={hasChildren}
          configOptions={configOptions}
          template={template}
          onChange={(val) => {
            if (!batch) {
              onChange(val)
              return
            }
            const curBelong = val[field.id]
            onChange(
              getBatchConfig({
                curValue: val,
                field,
                curBelong,
              })
            )
          }}
          disableChildrenConfig={true}
        />
      </div>
      {hasChildren ? (
        <div className="grid grid-cols-2 gap-2 bg-[#F7FBFC] p-4 rounded-sm">
          {(field.children || []).map((each) => (
            <ConfigField
              field={each}
              configOptions={configOptions}
              key={each.id}
              belong={belong}
              template={template}
              onChange={onChange}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
