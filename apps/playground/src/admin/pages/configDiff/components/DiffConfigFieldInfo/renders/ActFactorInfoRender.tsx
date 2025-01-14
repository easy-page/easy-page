import { TagRender } from './TagRender'
import { CategoryCodeDesc } from '@/common'
import { Field } from './Field'
import { FactorInfoConfig } from '@/common/apis/getConfigList'

export const ActFactorInfoRender = ({
  config,
}: {
  config: FactorInfoConfig
}) => {
  const { categories = [], factorCodes = [] } = config || {}
  return (
    <div className="flex flex-col">
      <Field
        label="维度"
        labelClass="w-[50px]"
        value={<TagRender val={categories.map((e) => CategoryCodeDesc[e])} />}
      />
      <Field
        label="因子"
        labelClass="w-[50px]"
        value={<TagRender val={factorCodes.map((e) => e)} />}
      />
    </div>
  )
}
