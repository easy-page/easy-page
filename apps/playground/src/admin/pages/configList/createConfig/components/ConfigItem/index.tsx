import { BIZ_TYPE_MAP, ConfigBizlineText } from '@/common'
import classNames from 'classnames'
import './index.less'
import { ConfigItem } from '@/admin/common/apis/getConfigItems'

export type ConfigItemProps = {
  item: ConfigItem
  onClick: () => void
  choosed: boolean
}
export const ConfigItemCard = ({ item, onClick, choosed }: ConfigItemProps) => {
  const bizlineInfo =
    item.bizLine === undefined ? '' : `（${ConfigBizlineText[item.bizLine]}）`
  return (
    <div
      className={classNames(
        ' mr-2 px-4 config-item cursor-pointer flex flex-row justify-center',
        {
          'config-item-choosed': choosed,
        }
      )}
      onClick={onClick}
    >
      {item.name}
      {bizlineInfo}
    </div>
  )
}
