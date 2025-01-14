import { Empty, nodeUtil } from '@easy-page/antd-ui'
import { FactorsFormProps } from '../interface'

export const createCategoryContainer = (
  id: string,
  title: string,
  options?: {
    toolTips?: string
  }
) =>
  nodeUtil.createContainer<Empty, FactorsFormProps>(
    id,
    ({ children }) => {
      return (
        <div className="flex flex-col mb-2">
          <div className="flex flex-row items-end pb-2">
            <span className="font-bold text-base text-[#446AF6]">{title}</span>
            <span className=" text-[#446AF6] ml-1 text-[12px]">
              {options?.toolTips || ''}
            </span>
          </div>
          {children}
        </div>
      )
    },
    {
      when: {
        effectedKeys: ['choosedFactors'],
        show({ effectedData }) {
          const choosedFactors = effectedData['choosedFactors'] || []
          const choosed = Boolean(
            choosedFactors.find((e) => e.categoryCode === id)
          )
          return choosed
        },
      },
    }
  )
