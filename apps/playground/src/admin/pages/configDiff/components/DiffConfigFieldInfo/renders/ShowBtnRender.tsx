import { OperationShowConfig } from '@/common/apis/getConfigList'
import { Field } from './Field'
import { TagRender } from './TagRender'
import { Tag } from 'antd'

export const ShowBtnRender = ({
  value,
  statusTextMap,
  tabMap,
}: {
  value: OperationShowConfig<any, any>
  statusTextMap: Record<any, string>
  tabMap: Record<any, string>
}) => {
  const { show, showWithStatus = [], tab = [] } = value || {}
  return (
    <div className="flex flex-col">
      <Field
        labelClass="w-[140px]"
        label={'是否展示按钮'}
        value={
          <Tag color={show ? 'green' : 'default'}>
            {show ? '展示' : '不展示'}
          </Tag>
        }
      />
      <Field
        label={'展示条件'}
        labelClass="w-[140px]"
        value={<TagRender val={showWithStatus.map((e) => statusTextMap[e])} />}
      />
      <Field
        label={'所在 Tab'}
        labelClass="w-[140px]"
        value={<TagRender val={tab.map((e) => tabMap[e])} />}
      />
    </div>
  )
}
