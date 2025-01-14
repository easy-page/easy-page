import {
  Operation,
  PoiApplyListItem,
  OperationEnum,
  poiApplyListModel,
  SkuApplyListItem,
} from '@/common'
import { CommonApplyResultTabTypeEnum } from '../../../constants'

export const viewToPoiTab: Operation<SkuApplyListItem> = {
  id: OperationEnum.ViewToPoiTab,
  label: '查看',
  show() {
    return true
  },
  async action({ record, setTab }: any) {
    setTab(CommonApplyResultTabTypeEnum.POI_APPLY_RESULT)

    poiApplyListModel.setFilters({
      poiBrandIds: [record.poiBrandId],
    })
  },
  auth: [],
}
