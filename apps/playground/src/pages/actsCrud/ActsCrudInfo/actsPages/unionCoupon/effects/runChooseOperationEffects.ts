import { EasyPageOnChangeContext } from "@easy-page/antd-ui";
import { UnionCouponFormState } from "../interface";
import { ActionTypeEnum } from "@/common/constants/planAndAct/act";

export const runChooseOperationEffects = ({ formUtil, value }: EasyPageOnChangeContext<UnionCouponFormState>) => {
  const isNoChange = value.chooseOperation === `${ActionTypeEnum.NoChange}`
  if (!isNoChange) {
    // 选择：追加、删除、整体替换，则清空下面三个字段的值
    formUtil.setField('inputId', '', { validate: false })
    formUtil.setField('filterRule', { choosed: null, keyword: '' }, { validate: false })
    formUtil.setField('uploadId', [], { validate: false })
  }
  // 切换回不操作，则保留默认值，这个在提交时，通过：prepareDataForEdit 已经处理，不用关心。
}