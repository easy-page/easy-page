import {
  openInUocEntry,
  appendParamsToUrl,
  UrlEnum,
  getQueryString,
} from '@/common'
import { SingleBrandStatInfo } from '@/common/apis/getBrandStatList'
import { Button, message, Tooltip } from 'antd'

type BatchConfirmBrandButtonProps = {
  selectRecords: SingleBrandStatInfo[]
}
export const BatchConfirmBrandButton = ({
  selectRecords,
}: BatchConfirmBrandButtonProps) => {
  const handleJumpToBatchConfirm = () => {
    if (selectRecords.length === 0) {
      message.warning('请先勾选需要确认的业务品牌')
      return
    }

    if (
      selectRecords
        .map((item) => item.amountTobeConfirm)
        .reduce((pre, next) => pre + next, 0) === 0
    ) {
      message.warning('所业务品牌当前待确认活动数为 0，请检查后重新勾选')
      return
    }

    if (selectRecords.length > 300) {
      message.warning('一次最多可选300条数据，超过请分批选中')
      return
    }
    
    const bizLine = getQueryString('bizLine')
    openInUocEntry(
      appendParamsToUrl(UrlEnum.BatchConfirmSubsidy, {
        bizLine,
        brandIds: JSON.stringify(selectRecords.map((item) => item.brandId)),
        confirm4Batch: 'true',
      }),
      '_blank'
    )
  }

  return (
    <Button className="mb-4" type="primary" onClick={handleJumpToBatchConfirm}>
      业务品牌批量确认
    </Button>
  )
}
