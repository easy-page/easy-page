import { ChildFormState, getChildrenOriginFormData } from '@easy-page/antd-ui'
import { pnListModel } from '@/common/models'
import { getFullChoosedPnOptions } from '@/pages/actsCrud/ActsCrudInfo/utils'
import { uniq } from 'lodash'
import { getCanChoosePnOptions } from '../../../../promotionSettings'
import {
  ChargeSidePnPageState,
  CommonSubActPageState,
} from '../../../../interface'

/** 如果当前没有选中 pn，且当前只有一个 pn 选项，则默认选中 */
// const getDefaultPn = (
//   curPn: string,
//   canChooseOptions: {
//     label: string
//     value: string
//     disabled: boolean
//   }[]
// ) => {
//   if (curPn) {
//     return curPn
//   }
//   const canUsePns = canChooseOptions.filter((x) => !x.disabled)
//   if (canUsePns.length > 1 || canUsePns.length === 0) {
//     return curPn
//   }
//   console.log('canUsePnscanUsePns:', canUsePns)
//   return canUsePns[0]?.value
// }

export const updateSubActPnForms = ({
  subActOriFormData,
}: {
  subActOriFormData: Partial<CommonSubActPageState>[]
}) => {
  const chargeSidePnforms = (subActOriFormData || []).map(
    (e) => e['pns.chargeSidePnform'] as ChildFormState<ChargeSidePnPageState>
  )
  /** 当前加载的所有 pn 数据 */
  const { data: fullPnList } = pnListModel.getList()

  const allSubActChoosedPns = getFullChoosedPnOptions(subActOriFormData, {
    pns: fullPnList,
  })
    .map((e) => e.value)
    .filter((x) => Boolean(x))
  console.log('allSubActChoosedPnsallSubActChoosedPns:', allSubActChoosedPns)
  /** 子活动已经选择的 pns - 去重复 */
  const allSubActChoosedUniqPns = uniq(allSubActChoosedPns)

  chargeSidePnforms.forEach((chargeSidePnform) => {
    // 遍历每一个子活动里，设置每个子活动的 pn 选项
    setTimeout(() => {
      const curSubActChargeSideForms = getChildrenOriginFormData(
        chargeSidePnform.formUtils
      )
      const curSubActChoosedPns = (curSubActChargeSideForms || []).map(
        (e) => e?.pn?.choosed
      )

      Object.values(chargeSidePnform.formUtils || {}).forEach(
        (eachPnSelect) => {
          // 遍历当前子活动每一个 pn 选项表单，设置可选选项
          setTimeout(() => {
            const { pn } = eachPnSelect.getOriginFormData()
            const curChoosedPn = pn.choosed

            const canChooseOptions = getCanChoosePnOptions({
              fullPnList,
              curSubActChoosedPns,
              curChoosedPn,
              keyword: pn.keyword,
              allSubActChoosedPns,
              allSubActChoosedUniqPns,
            })
            eachPnSelect.setField(
              'pn',
              {
                choosed: curChoosedPn,
                options: canChooseOptions,
              },
              { validate: true }
            )
          }, 0)
        }
      )
    }, 0)
  })
}
