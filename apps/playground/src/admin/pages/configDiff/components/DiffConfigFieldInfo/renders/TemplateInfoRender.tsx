import { TemplateIdInfo } from '@/common'
import { Field } from './Field'

export const TemplateInfoRender = ({ config }: { config: TemplateIdInfo }) => {
  const { prod, test, name } = config
  return (
    <div className="flex flex-col bg-[#EDF2FA] py-2 px-2 rounded-sm">
      <Field label="模板名" labelClass={'w-[100px]'} value={name} />
      <Field labelClass={'w-[100px]'} label={'测试环境 ID'} value={test} />
      <Field labelClass={'w-[100px]'} label={'线上环境 ID'} value={prod} />
    </div>
  )
}
