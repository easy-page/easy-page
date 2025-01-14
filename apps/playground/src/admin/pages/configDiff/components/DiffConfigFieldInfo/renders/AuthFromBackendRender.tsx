import { AuthFromBackendConfig } from '@/common/apis/getConfigList'
import { TagRender } from './TagRender'
import { AuthFromBackendResText, AuthSenceText } from '@/common'
import { Field } from './Field'

export const AuthFromBackendRender = ({
  config,
  label,
}: {
  config: AuthFromBackendConfig
  label: string
}) => {
  const { auths = [], authUrl, sence } = config
  return (
    <div className="flex flex-row mb-2">
      <div className="text-sec mb-2 w-[200px]">{label}</div>
      <div className="px-2 flex flex-col bg-[#EDF2FA] p-2  w-[400px] flex-wrap">
        <Field
          label="鉴权点"
          labelClass={'w-[100px]'}
          value={
            <TagRender val={auths.map((e) => AuthFromBackendResText[e])} />
          }
        />
        <Field labelClass={'w-[100px]'} label={'鉴权路径'} value={authUrl} />
        <Field
          labelClass={'w-[100px]'}
          label={'鉴权场景'}
          value={AuthSenceText[sence]}
        />
      </div>
    </div>
  )
}
