import {
  CategoryCode,
  FactorListFirstCategory,
  OperationFactorItem,
} from '@/common'
import { getFactorsCount } from './utils/getFactorsCount'
import { Qualify } from '@/common/apis/saveAct/interfaces'
import { FactorTable } from '../FactorTable'

export type ChoosedInfoProps = {
  categoryCodes: CategoryCode[]
  searchOptions: OperationFactorItem[]
  value: Qualify
}
export const ChoosedFactorInfo = ({
  categoryCodes,
  searchOptions,
  value,
}: ChoosedInfoProps) => {
  const { poiFactorCount, skuFactorCount } = getFactorsCount(
    searchOptions || [],
    value?.dataCollector
  )
  const hasPoi = categoryCodes.includes(CategoryCode.Poi)
  const hasSku = categoryCodes.includes(CategoryCode.Sku)
  if (!hasPoi && !hasSku) {
    return <></>
  }
  return (
    <>
      <div>
        <span>已选</span>
        {hasPoi ? (
          <>
            <span className="text-[#386bff]">{poiFactorCount}</span>
            <span>个商家维度因子</span>
          </>
        ) : (
          <></>
        )}
        {hasPoi && hasSku ? '，' : ''}
        {hasSku ? (
          <>
            <span className="text-[#386bff]">{skuFactorCount}</span>
            <span>个商品维度因子</span>
          </>
        ) : (
          <></>
        )}
      </div>
      {poiFactorCount || skuFactorCount ? (
        <FactorTable
          dataCollector={value?.dataCollector}
          searchOptions={searchOptions}
        />
      ) : (
        <></>
      )}
    </>
  )
}
