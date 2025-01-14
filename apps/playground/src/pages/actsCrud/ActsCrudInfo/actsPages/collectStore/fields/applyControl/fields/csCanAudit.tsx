import { canAudit } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'

export const csCanAudit = nodeUtil.extends(canAudit, {
  value: true,
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.formItem.extra = (
      <div className="text-[#FF4D4F] mt-1 relative right-[-50px] top-[-27px] text-xs font-medium">
        如您关闭审核开关，商家报名后，商品将无需审核，直接在集合店中生效
      </div>
    )
    return oldFieldUIConfig
  },
})
