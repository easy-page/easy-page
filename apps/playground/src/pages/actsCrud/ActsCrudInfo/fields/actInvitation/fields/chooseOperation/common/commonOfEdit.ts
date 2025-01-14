import { SceneEnum } from '@/common/apis/invitePoi'
import { nodeUtil } from '@easy-page/antd-ui'
import { chooseOperation } from '../base'

export const commonChooseOperationOfEdit = () =>
  nodeUtil.extends(chooseOperation(), {
    postprocess: (oldPostprocess) => {
      return (context) => {
        return {
          ...oldPostprocess(context),
          'invitation.scene': SceneEnum.Create,
        }
      }
    },
  })
