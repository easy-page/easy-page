import { AuthTypeEnum, openInUoc } from '@/common'
import { subsidyAuthModel } from '@/common/models/subsidyAuth'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { BatchConfirmFormState } from '../../interface'
import './index.less'

export const checkCanEditForm = nodeUtil.createCustomField<
  any,
  BatchConfirmFormState
>(
  '',
  '',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    // 当前表单所有配置
    const { pageState } = store
    const { chooseAct } = pageState

    const { data: resourceIdRes = [] } = subsidyAuthModel.getList()

    const hasAuth =
      resourceIdRes.find(
        (item) => item.resourceId === AuthTypeEnum.PoiConfirmMtCharge
      )?.status || false

    if (!hasAuth) {
      return (
        <div className="text-[#ff4d4f]">
          需先申请“统一招商平台合作运营确认美补“权限，
          <a
            href="javascript:void(0)"
            onClick={() => {
              openInUoc(
                'sgyx-glzx-qxsq',
                `/shangou/pages/grains/permission/apply`
              )
            }}
            className="text-[#1677ff]"
          >
            点击申请
          </a>
        </div>
      )
    }

    if (!Array.isArray(chooseAct) || chooseAct.length === 0) {
      return <div className="text-[#ff4d4f]">请先勾选需要确认的活动</div>
    }

    return <></>
  },
  {
    effectedKeys: ['chooseAct'],
  },
  {
    ui: UI_COMPONENTS.CUSTOM,
    formItem: {
      className: 'check-text-box',
    },
  }
)
