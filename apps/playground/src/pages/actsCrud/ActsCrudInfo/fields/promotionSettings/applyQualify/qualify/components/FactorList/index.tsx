import {
  BizLineEnum,
  CategoryCode,
  FactorListSecondCategory,
  mccModel,
  OperationFactorItem,
} from '@/common'
import { getBizLine } from '@/common'
import { FactorItem } from '../FactorItem'
import { FormUtil } from '@easy-page/antd-ui'

export type FactorListProps = {
  choosedFactors: OperationFactorItem[]
  setChooseFactors: (choosedFactors: OperationFactorItem[]) => void
  searched: string
  categoryCode: CategoryCode
  secondCategory: FactorListSecondCategory<OperationFactorItem>
  title: string
  formRef: React.MutableRefObject<FormUtil<Record<string, any>>>
  disabled?: boolean
  // tooltip?: string | React.ReactNode;
}

export const FactorList = ({
  choosedFactors,
  searched,
  secondCategory,
  categoryCode,
  setChooseFactors,
  disabled,
  title,
  formRef,
}: // tooltip,
FactorListProps) => {
  const factors = secondCategory.list || []

  const {
    data: { factor_association_rules_map },
  } = mccModel.getData()

  // const searchedFactors = searched
  //   ? factors.filter((e) => e.factorCode === searched)
  //   : factors;

  // HARD CODE: 历史设计是写死的，暂时写死提示语吧
  const showTips =
    getBizLine() === BizLineEnum.ShanGou &&
    secondCategory.code === CategoryCode.Sku &&
    secondCategory.name === '基本属性'

  return (
    <div className="flex flex-col mb-6">
      <div className="flex flex-row">
        <div className="font-bold">{title}</div>
        {showTips ? (
          <a
            className="type-link text-[#1677FF]"
            target="_blank"
            rel="noreferrer"
            href={'https://km.sankuai.com/page/179155832'}
          >
            说明文档
          </a>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {factors.map((e) => (
          <FactorItem
            key={e.factorCode}
            factor={e}
            formRef={formRef}
            factorAssociationRulesMap={factor_association_rules_map}
            disabled={disabled}
            categoryTitle={title}
            categoryCode={categoryCode}
            setChooseFactors={setChooseFactors}
            searched={searched === e.factorCode}
            choosedFactors={choosedFactors}
          />
        ))}
      </div>
    </div>
  )
}
