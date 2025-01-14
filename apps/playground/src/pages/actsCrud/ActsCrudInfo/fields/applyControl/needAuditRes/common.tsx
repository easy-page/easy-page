import { nodeUtil } from '@easy-page/antd-ui'

import { Select, Switch } from 'antd'
import { get } from 'lodash'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  NeedAuditResState,
} from '../../interface'

export enum AuditOption {
  Tc = 'tc',
}

export const needAuditRes = nodeUtil.createCustomField<
  NeedAuditResState,
  CommonActCrudFormState,
  CommonActCrudFormProps
>(
  'needAuditRes',
  '是否需审核报名结果',
  ({ value, onChange, disabled }) => {
    return (
      <div className="flex flex-row items-center">
        <Switch
          value={value.needed}
          disabled={disabled}
          onChange={(e) => {
            onChange({
              ...value,
              needed: e,
            })
          }}
        />
        {value.needed ? (
          <Select
            value={value.option}
            className="ml-2 w-[400px]"
            disabled={disabled}
            onChange={(v) => onChange({ ...value, option: v })}
            options={[
              {
                value: AuditOption.Tc,
                label: '天策低效补贴审批（仅门店BD报名）',
              },
            ]}
          />
        ) : (
          <></>
        )}
      </div>
    )
  },
  {
    value: { needed: true, option: AuditOption.Tc },
    preprocess({ defaultValues }) {
      const val = get(defaultValues, 'applyControl.audit.isNeedAudit4Tc')
      return {
        needed: val ?? true,
        option: AuditOption.Tc,
      }
    },
    postprocess: ({ value }) => {
      return {
        'applyControl.audit.isNeedAudit4Tc': Boolean(value.needed),
      }
    },
  }
)
