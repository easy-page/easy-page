import { SubsidyCharge, SubsidyChargeKeyEnum, SubsidyOptEnum } from '@/common';

import { nodeUtil } from '@easy-page/antd-ui';
import { RangeConfig, RangeState, numberRangeField } from '@/common/fields';
import { RuleTableFormProps, RuleTableFormState } from '../interface';

const PriceRange: RangeConfig = {
  max: 20,
  min: 0,
};

export const chargeTd = (id: SubsidyChargeKeyEnum) => {
  return nodeUtil.extends<RangeState, RuleTableFormState, RuleTableFormProps>(
    numberRangeField({
      id,
      label: '',
      range: PriceRange,
      formItemConfig: {
        className: 'col-span-3 mb-0',
      },
      denyZero: true,
      validateConfig: {
        errorMsg: '0.5~20，支持0.5结尾的一位小数',
        decimalNumber: 1,

        endWith: [
          {
            sence: (val) => val.includes('.'),
            endWith: ['.5', '.0'],
          },
        ],
      },
    }),
    {
      preprocess() {
        return ({ defaultValues }) => {
          const charges: SubsidyCharge[] = defaultValues?.['charge'] || [];
          const curCharge = charges.find((e) => e.key === id);
          return {
            max: curCharge?.maxValue || `${PriceRange.max}`,
            min: curCharge?.minValue || '0.5',
          };
        };
      },
      postprocess() {
        return ({ processedFormData, value }) => {
          const charge: SubsidyCharge[] = processedFormData?.['charge'] || [];
          charge.push({
            key: id,
            opt: SubsidyOptEnum.CloseInterval,
            maxValue: value.max,
            minValue: value.min,
          });

          return {
            charge,
          };
        };
      },
    },
  );
};
