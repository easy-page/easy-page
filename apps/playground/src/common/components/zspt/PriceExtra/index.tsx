import { getDigitPosition, toNumber } from '@/common/libs'
import { FormItemProps } from '@easy-page/antd-ui'

export const PriceExtra: React.FC<
  Omit<FormItemProps, 'customExtra'> & {
    priceWarningLimit: number
  }
> = ({ value, priceWarningLimit }) => {
  const valNum = toNumber(value)

  // 不超过 10 元不提示
  if (valNum === undefined || value === '') {
    return <></>
  }
  const tip = getDigitPosition(valNum)
  return (
    <div className="flex flex-row items-center mt-1">
      <div className="text-[#5BBDB2] text-xs mr-2">{tip}</div>
      {valNum > priceWarningLimit && (
        <div className="text-[#FAD071] text-xs font-bold font-medium">
          补贴金额较大，请认真核对
        </div>
      )}
    </div>
  )
}
