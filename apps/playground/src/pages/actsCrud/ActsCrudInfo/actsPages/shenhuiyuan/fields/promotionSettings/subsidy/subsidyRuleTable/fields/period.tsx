import { FormItemEffectType, nodeUtil } from '@easy-page/antd-ui';
import {
  PeriodState,
  RuleTableFormProps,
  RuleTableFormState,
} from '../interface';
import { DatePicker } from 'antd';
import {
  SubsidyConditionKeyEnum,
  SubsidyOptEnum,
  transformStringToDayjs,
} from '@/common';
import { isBeforeOrEqPeriod } from '../utils/isBeforeOrEqPeriod';
import { isBeforePeriod } from '../utils/isBeforePeriod';
import classNames from 'classnames';

export const period = nodeUtil.createCustomField<
  PeriodState,
  RuleTableFormState,
  RuleTableFormProps,
  FormItemEffectType
>(
  'period',
  `时段`,
  ({ frameworkProps: { store }, value, onChange, disabled }) => {
    const { onRemove, formId, formIdx } =
      store.getPageProps() as RuleTableFormProps;

    return (
      <div className="flex flex-row items-center justify-end">
        <DatePicker.RangePicker
          picker="time"
          format={'HH:mm'}
          className="w-full"
          value={value}
          order={false}
          disabled={disabled}
          onChange={(dates) => onChange(dates)}
          showTime={{ hideDisabledOptions: true }}
          disabledTime={() => {
            return {
              disabledMinutes(hour) {
                return Array.from(
                  { length: 59 },
                  (_, index) => index + 1,
                ).filter((x) => {
                  if (hour !== 23) {
                    return ![30].includes(x);
                  }
                  return ![30, 59].includes(x);
                });
              },
            };
          }}
        />
        {formIdx !== 2 && !disabled && (
          <div
            className={classNames(
              'cursor-pointer ml-2 text-xs break-keep text-[#FF2437]',
            )}
            onClick={() => {
              onRemove(formId);
            }}
          >
            删除
          </div>
        )}
      </div>
    );
  },

  {
    actions: [
      {
        effectedKeys: ['formIdx'],
        initRun: true,
        action: ({ effectedData }) => {
          const formIdx = effectedData?.['formIdx'];
          return {
            effectResult: {
              formItem: {
                label: `时段${formIdx === undefined ? 1 : formIdx - 1}`,
                className: 'col-span-3  mb-0',
              },
            },
          };
        },
      },
    ],
    preprocess: ({ defaultValues }) => {
      const condition = defaultValues?.['condition'];
      const minVal: string = condition?.minValue;
      if (!minVal) {
        return [null, null];
      }
      const range = minVal.split('-');
      if (range.length < 2) {
        console.error('时间段有错：', range);
        return [null, null];
      }
      return [
        transformStringToDayjs(range[0]),
        transformStringToDayjs(range[1]),
      ];
    },
    postprocess: ({ value }) => {
      const hasNull = (value || []).some((x) => !x);
      if (!value || value.length !== 2 || hasNull) {
        console.log('所选时段有误');
        return {};
      }
      return {
        condition: {
          key: SubsidyConditionKeyEnum.ScPeriod,
          opt: SubsidyOptEnum.In,
          minValue: [value[0]?.format('HH:mm'), value[1]?.format('HH:mm')].join(
            '-',
          ),
        },
      };
    },
    validate: ({ value, pageProps }) => {
      const { lastFormUtil } = pageProps;
      const hasNull = (value || []).some((x) => !x);
      if (hasNull || !value) {
        return { success: false, errorMsg: '请选择时段' };
      }
      const lastVal = lastFormUtil?.getFieldValue?.('period');
      if (lastVal && lastVal[1] && !isBeforeOrEqPeriod(lastVal[1], value[0])) {
        return { success: false, errorMsg: '时段需大于等于上一行结束时间' };
      }
      if (value[0] && value[1] && !isBeforePeriod(value[0], value[1])) {
        return { success: false, errorMsg: '结束时段需大于开始时段' };
      }
      return { success: true };
    },
    value: [null, null],
    required: true,
  },
  {
    formItem: {
      className: 'col-span-3  mb-0',
    },
  },
);
