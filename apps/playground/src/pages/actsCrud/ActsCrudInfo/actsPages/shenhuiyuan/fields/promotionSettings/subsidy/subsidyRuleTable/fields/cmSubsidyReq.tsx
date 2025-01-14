import { PoiTypeEnum, SubsidyChargeKeyEnum } from '@/common';
import { chargeTd } from './chargeTd';
import { nodeUtil } from '@easy-page/antd-ui';

export const cmSubsidyReq = nodeUtil.extends(
  chargeTd(SubsidyChargeKeyEnum.ChargeSideAgent),
  {
    when() {
      return {
        effectedKeys: ['poiType'],
        show({ effectedData }) {
          return effectedData['poiType'] !== PoiTypeEnum.Direct;
        },
      };
    },
  },
);
