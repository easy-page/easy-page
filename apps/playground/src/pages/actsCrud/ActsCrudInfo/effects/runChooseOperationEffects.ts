import { EasyPageOnChangeContext } from '@easy-page/antd-ui'
import {
  ActionTypeEnum,
  InputTypeEnum,
} from '@/common/constants/planAndAct/act'
import { CommonActCrudFormState, InviteWay } from '../fields'
import { ActFullInfo, toJson, toNumber } from '@/common'
import { get } from 'lodash'

export const runChooseOperationEffects = ({
  formUtil,
  value,
  actDetail,
}: EasyPageOnChangeContext<CommonActCrudFormState> & {
  actDetail: ActFullInfo
}) => {
  const isNoChange = value.chooseOperation === `${ActionTypeEnum.NoChange}`
  const { filterRule } = formUtil.getOriginFormData()

  if (!isNoChange) {
    // 选择：追加、删除、整体替换，则清空下面三个字段的值
    formUtil.setField('inputId', '', { validate: false })

    formUtil.setField(
      'filterRule',
      { choosed: null, keyword: '' },
      { validate: false }
    )
    formUtil.setField('uploadId', [], { validate: false })
    return
  } else {
    const inputIdsWay = get(actDetail, 'invitation.inputType')
    const dataType = get(actDetail, 'invitation.dataType')
    formUtil.setField(
      'inputIdsWay',
      `${inputIdsWay || InputTypeEnum.ManualEntry}`,
      { validate: false }
    )
    formUtil.setField(
      'dataType',
      !dataType ? InviteWay.ByPoiInvite : `${dataType}`,
      {
        validate: false,
      }
    )

    formUtil.setField('inputId', get(actDetail, 'invitation.inputData'), {
      validate: false,
    })
    console.log('filterRulefilterRulefilterRule:', filterRule)
    formUtil.setField(
      'filterRule',
      {
        // ...filterRule,
        choosed: toNumber(get(actDetail, 'invitation.inputData')),
        keyword: '',
      },
      { validate: false }
    )

    const fileInfo = toJson(get(actDetail, 'invitation.inputData'))
    formUtil.setField(
      'uploadId',
      inputIdsWay !== InputTypeEnum.File ? [] : [fileInfo],
      {
        validate: false,
      }
    )
  }
}
