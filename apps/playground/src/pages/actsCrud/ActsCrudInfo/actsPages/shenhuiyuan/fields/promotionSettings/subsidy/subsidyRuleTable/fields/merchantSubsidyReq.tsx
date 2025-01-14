import { SubsidyChargeKeyEnum, checkNumberInvalid, toNumber } from '@/common';

import { chargeTd } from './chargeTd';

export const merchantSubsidyReq = chargeTd(SubsidyChargeKeyEnum.ChargeSidePoi);
