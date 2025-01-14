/**
 * - 一个弹窗，全局只允许弹一次：sence： A，times: 1，triggered: ['A']
 * - 一个弹窗，当 A 没有弹过时，B 可弹，A 弹过后，B 不可弹。 sence: A，times: -1, triggered: ['A']
 * - 一个弹窗，当 B 弹过时，A 可弹。 sence: A，times: -1, triggered: ['B', 'A']
 *
 */

export enum ConfirmSceneEnum {
  /** 神会员活动-差异化补贴-时段弹窗 */
  ShySubsidyPeriod = 'shySubsidyPeriod',
  /** 神会员门店修改后，如果填写了优惠规则差异化补贴，弹窗 */
  PoiTypeChangeConfirm = 'poiTypeChangeConfirm',
  /** 补贴类型修改弹窗场景 */
  ChargeChangeConfirm = 'chargeChangeConfirm',
  /** 集合店类型变化 */
  CollectStoreChangeConfirm = 'collectStoreChangeConfirm',
  /** 美团承担补贴提示 */
  MtChargeChangeConfirm = 'MtChargeChangeConfirm',
  /** 批量确认活动时活动变化 */
  BatchConfirmActChange = 'BatchConfirmActChange',
}

export const NO_LIMIT_TIMES = -1 // 不限次数

export type ConfirmSceneInfo = {
  /** 弹窗次数：-1 表示不限次数 */
  times: number
  triggerRule?: (state: ConfirmInfoState) => boolean
}

/** 当前场景已经触发的信息 */
export type ConfirmInfoState = {
  /** 触发次数 */
  triggeredTimes?: number
  /** 谁触发了 */
  triggeredFields?: string[]
}

export type ConfirmDialogManagerOptions = {
  confirmSceneInfo: Partial<Record<string, ConfirmSceneInfo>>
}

export type ConfirmOption = {
  /** 触发的动作: 返回true, 表示确定，false 表示取消 */
  onConfirm: () => void
  /** 不弹窗，继续动作 */
  callback: () => void
  sence: string
  triggerField: string
}

export class ConfirmDialogManager {
  private options: ConfirmDialogManagerOptions
  private states: Partial<Record<ConfirmSceneEnum, ConfirmInfoState>> = {}
  constructor(options: ConfirmDialogManagerOptions) {
    this.options = options
  }

  updateState({
    sence,
    triggerField,
  }: Pick<ConfirmOption, 'sence' | 'triggerField'>) {
    this.states[sence] = this.states[sence] || {}
    const { triggeredTimes = 0, triggeredFields = [] } = this.states[sence]
    this.states[sence].triggeredTimes = triggeredTimes + 1
    this.states[sence].triggeredFields = [...triggeredFields, triggerField]
  }

  async confirm({ onConfirm, sence, triggerField, callback }: ConfirmOption) {
    const senceInfo = this.options.confirmSceneInfo[sence]

    if (senceInfo.times === NO_LIMIT_TIMES) {
      onConfirm()
      this.updateState({ sence, triggerField })
      return
    }

    if (senceInfo.triggerRule?.(this.states[sence])) {
      onConfirm()
      this.updateState({ sence, triggerField })
      return
    }
    const triggeredTimes = this.states[sence]?.triggeredTimes || 0
    if (senceInfo.times > triggeredTimes) {
      onConfirm()
      this.updateState({ sence, triggerField })
      return
    }
    callback()
  }
}
