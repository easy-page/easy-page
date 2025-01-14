import { getEnv } from '../libs/env'
import { LxEventBid, LxPageCid } from './constant'
import { SaveActEventParams, SavePlanEventParams } from './interface'

export enum LogLevel {
  Warn = 'warn',
}
export class ReportManager {
  constructor() {}

  owlReport = (name: string, msg: string, level?: LogLevel) => {
    try {
      const owl = (window as any).Owl
      if (owl) {
        owl.addError(
          {
            name,
            msg,
          },
          {
            level: level || LogLevel.Warn,
            combo: false,
          }
        )
      }
    } catch (e) {
      console.log('OWL 自定义上报异常：', e)
    }
  }

  /** 发送活动保存事件： https://ocean.sankuai.com/config/#/page/detail?id=43117425&channelId=45&tabName=page&source_click=21 */
  sendSaveActEvent({
    traceid,
    bizLine,
    success,
    actType,
    msg,
  }: SaveActEventParams) {
    try {
      const tracker = (window as any).LXAnalytics('getTracker')

      const valLab = {
        traceid: traceid,
        custom: {
          submit_status: success ? 'success' : 'fail',
          bizline: bizLine,
          activity_type: actType,
          env: getEnv(),
          error_reason: success ? '' : msg,
        },
      }
      const pageCase = tracker('pageView', valLab, {}, LxPageCid.CRUD_ACT)
      pageCase(
        'moduleClick',
        LxEventBid.SAVE_ACT,
        {
          ...valLab.custom,
          traceid: valLab.traceid,
        },
        {
          isLeave: false,
        }
      )
    } catch (error) {
      console.log('上报方案创建失败：', error)
    }
  }

  /** 发送方案保存事件: https://ocean.sankuai.com/config/#/page/edit?channelId=45&pageId=43116827 */
  sendSavePlanEvent({
    traceid,
    success,
    bizLine,
    planType,
    msg,
  }: SavePlanEventParams) {
    try {
      const tracker = (window as any).LXAnalytics('getTracker')

      const valLab = {
        traceid: traceid,
        custom: {
          submit_status: success ? 'success' : 'fail',
          bizline: bizLine,
          planType: planType,
          error_reason: success ? '' : msg,
          env: getEnv(),
        },
      }
      const pageCase = tracker('pageView', valLab, {}, LxPageCid.CRUD_PLAN)
      pageCase(
        'moduleClick',
        LxEventBid.SAVE_PLAN,
        {
          ...valLab.custom,
          traceid: valLab.traceid,
        },
        {
          isLeave: false,
        }
      )
    } catch (error) {
      console.log('上报方案创建失败：', error)
    }
  }
}

export const reportManager = new ReportManager()
