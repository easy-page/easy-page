import { PlanInfo, getPlanCopyAuth } from '../apis'
import { AuthHandler } from './planAndActAuths'
import { openInUoc } from '../libs'
import { ApplyChargeCodeEnum } from '../constants'
import './planAndAct.less'
import { Modal } from 'antd'

export const authPlanCopy: AuthHandler<PlanInfo> = async ({ record }) => {
  if (!record.id) {
    return {
      allow: false,
      msg: '缺少方案 ID，无法校验权限',
      continueNextResult: 'allow',
    }
  }
  const result = await getPlanCopyAuth({
    opType: 'copy',
    planId: record.id,
  })
  if (!result.success) {
    return {
      allow: false,
      msg: '网络异常，请稍后重试',
      continueNextResult: 'allow',
    }
  }
  if (result.data?.authResult) {
    // 允许，继续后续权限
    return { allow: true, continueNextResult: 'allow' }
  }
  // 弹窗提示去申请权限，且阻断后续判断流程
  Modal.confirm({
    centered: true,
    height: 300,
    title: '申请权限',
    content: (
      <div
        className="zspt-dangerously-set-inner-html"
        dangerouslySetInnerHTML={{
          __html: result.data?.reason || '',
        }}
      />
    ),
    okText: '去申请权限',
    onOk: () => {
      //需要品牌补贴权限- TODO: 替换权限申请路径
      openInUoc(
        'sgyx-glzx-qxsq',
        `/shangou/pages/grains/permission/apply?id=${ApplyChargeCodeEnum.CommonCode}`
      )
    },
  })
  return { allow: false, continueNextResult: 'allow', msg: '无权限操作' }
}
