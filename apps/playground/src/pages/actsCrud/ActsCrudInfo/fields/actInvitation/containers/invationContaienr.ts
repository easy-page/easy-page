import { OperationType } from "@/common/constants";
import { getOperationType } from "@/common/routes";
import { generateId, nodeUtil } from "@easy-page/antd-ui";

export const invitationOfCreateSceneContainer = (operationTypes?: OperationType[]) => {
  return nodeUtil
    .createContainer(
      generateId('invite-info'),
      ({ children }) => {
        return children;
      },
      {
        when: {
          show: () => {
            if (!operationTypes) {
              return true;
            }
            return operationTypes.includes(getOperationType())
          },
        },
      },
    )
}