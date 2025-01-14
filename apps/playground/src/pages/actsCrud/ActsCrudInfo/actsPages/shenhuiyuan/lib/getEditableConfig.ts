import {
  ActFullInfo,
  ActivityStatusEnum,
  OperationType,
  getOperationType,
} from '@/common';
import { ShenhuiyuanFormState } from '../interface';
import { EditableConfig } from '@easy-page/antd-ui';

const actEditableConfigMap: Record<
  OperationType,
  (actDetail: ActFullInfo) => EditableConfig<ShenhuiyuanFormState>
> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo) => {
    const actStatus = actDetail?.activity?.status;
    if (
      [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ].includes(actStatus)
    ) {
      return {
        // canNotEditKeys: ['poiType', 'canApplyRole'],
        canNotEditKeys: ['poiType'],
      };
    }
    
    if ([ActivityStatusEnum.Active].includes(actStatus)) {
      return {
        canEditKeys: [
          'actName',
          'brief',
          'stockRequest',
          'ruleDesc',
          'qualify',
          'subsidyPercent',
          'subsidyRuleInfo',
          'ruleTable',
          'differStockRule',
          'chooseOperation',
          'inputIdsWay',
          'inputId',
          'uploadId',
          'filterRule',
          'activitySceneTag'
        ],
      };
    }

    // 报名中，邀请中
    if ([ActivityStatusEnum.Applying,ActivityStatusEnum.Inviting].includes(actStatus)) {
      return {
        canEditKeys: [
          'activitySceneTag'
        ],
      };
    }

    return false;
  },
};

export const getEditableConfig = (
  actDetail: ActFullInfo,
): EditableConfig<ShenhuiyuanFormState> => {
  const operationType = getOperationType();
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail);
};
