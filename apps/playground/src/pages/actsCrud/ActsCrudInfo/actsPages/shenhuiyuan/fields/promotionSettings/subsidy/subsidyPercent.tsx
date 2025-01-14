import { generateId, nodeUtil } from '@easy-page/antd-ui';
import { Input } from 'antd';
import { ShenhuiyuanFormState, ShenhuiyuanFormProps } from '../../../interface';
import {
  PoiTypeEnum,
  SubsidyOptEnum,
  checkNumberInvalid,
  removeLeadingZeros,
} from '@/common';
import { useCallback } from 'react';
import {
  Content4Shy,
  SubsidyRatePoi2Agent,
} from '@/common/apis/saveAct/interfaces';
import { ISubActivity } from '@/common/apis/saveAct/interfaces/subAct';
import { appendToContent4Shy } from './utils/appendToSubActRule';
import { getFromContent4Shy } from './utils/getFromContent4Shy';

const PercentRange = {
  min: 0,
  max: 10,
};

export const subsidyPercent = nodeUtil.createCustomField<
  string,
  ShenhuiyuanFormState,
  ShenhuiyuanFormProps
>(
  'subsidyPercent',
  '商家-代理差异化补贴比例',
  ({ value, onChange, disabled }) => {
    const handleChange = useCallback(
      ({ curVal }: { curVal: string }) => {
        if (!curVal) {
          onChange(curVal);
          return;
        }
        const res = checkNumberInvalid(curVal, {
          checkNumber: true,
          checkInRange: {
            min: PercentRange.min,
            max: PercentRange.max,
          },
        });
        if (res.success) {
          onChange(removeLeadingZeros(curVal));
        }
      },
      [value],
    );
    return (
      <div className="flex flex-row items-center">
        <div className="mr-1"> &gt;=</div>
        <Input
          value={value || ''}
          disabled={disabled}
          placeholder="请输入"
          className="w-[200px]"
          onChange={(e) => handleChange({ curVal: e.target.value })}
        />
      </div>
    );
  },

  {
    actions: [
      {
        effectedKeys: ['poiType'],
        action: () => {
          // 门店发生变化，清空
          console.log('清空差异化补贴比例');
          return {
            fieldValue: '',
            validate: false,
          };
        },
      },
    ],
    preprocess({ defaultValues }) {
      const data = getFromContent4Shy<Content4Shy['subsidyRatePoi2Agent']>(
        'subsidyRatePoi2Agent',
        defaultValues,
      );
      return data?.minValue;
    },
    postprocess: ({ value, processedFormData }) => {
      if (!value) {
        return {};
      }
      const subAct: ISubActivity[] = appendToContent4Shy(processedFormData, {
        subsidyRatePoi2Agent: {
          key: 'subsidyRatePoi2Agent',
          opt: SubsidyOptEnum.Eq,
          minValue: value,
          maxValue: '',
        } as SubsidyRatePoi2Agent,
      });
      return {
        subActivity: subAct,
      };
    },
    validate: ({ value }) => {
      if (!value) {
        return { success: true };
      }
      if (Number(value) === 0 || value.endsWith('.')) {
        return {
          success: false,
          errorMsg: '(0~10】，最多支持一位小数',
        };
      }

      const minCheckRes = checkNumberInvalid(value, {
        checkNumber: true,
        decimalNumber: 1,
        checkInRange: {
          min: PercentRange.min,
          max: PercentRange.max,
        },
      });
      if (!minCheckRes.success) {
        return {
          success: false,
          errorMsg: '(0~10】，最多支持一位小数',
        };
      }

      return { success: true };
    },
    when: {
      effectedKeys: ['poiType'],
      show({ effectedData }) {
        return effectedData['poiType'] !== PoiTypeEnum.Direct;
      },
    },
  },
);
