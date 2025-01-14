import { nodeUtil } from '@easy-page/antd-ui'
import { AuditOption, needAuditRes } from './common'

export const shenquanNeedAuditRes = nodeUtil.extends(needAuditRes, {
  preprocess() {
    return () => {
      return {
        needed: false,
        option: AuditOption.Tc,
      }
    }
  },
  postprocess() {
    return ({ value }) => {
      return {
        'applyControl.audit.isNeedAudit': false,
      }
    }
  },
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.formItem = oldFieldUIConfig.formItem || {}
    oldFieldUIConfig.formItem.disabled = true
    oldFieldUIConfig.formItem.tooltip =
      ' 打开开关，代表需要运营审核；关闭开关，代表不需要运营审核'
    return oldFieldUIConfig
  },
})
