import { EffectActionType, CheckboxEffectedType } from '@easy-page/antd-ui'
import { AuthTypeEnum, PoiTypeEnum } from '@/common/constants'
import { AuthResInfo, openInUoc } from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../../interface'

export const disableActions: (
  poiType: PoiTypeEnum,
  options: {
    resourceId: AuthTypeEnum
    name: string
    disableAllForSomeWithNoAuth?: boolean
  }
) => EffectActionType<
  any,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  CheckboxEffectedType
>[] = (poiType, { resourceId, name, disableAllForSomeWithNoAuth }) => [
  {
    effectedKeys: ['poiType', 'resourceIdRes'],
    initRun: true,
    action: ({ effectedData }) => {
      const curPoiType = effectedData['poiType']
      const resourceIdRes = effectedData['resourceIdRes'] || []
      const hasNoAuth =
        resourceIdRes.find((e) => e.resourceId === resourceId)?.status === false
      const resourceDisabled =
        disableAllForSomeWithNoAuth && PoiTypeEnum.All === curPoiType
          ? resourceIdRes.some((x) => x.status !== true)
          : hasNoAuth
      return {
        effectResult: {
          checkboxProps: {
            disabled: resourceDisabled || !curPoiType || curPoiType === poiType,
            customLabel: hasNoAuth
              ? () => {
                  return (
                    <span>
                      <span className="mr-1">{name}</span>
                      （当前无权限，
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
                      ）
                    </span>
                  )
                }
              : undefined,
          },
        },
      }
    },
  },
]
