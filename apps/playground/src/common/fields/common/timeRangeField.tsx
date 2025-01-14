import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui';
import dayjs, { Dayjs } from 'dayjs';

export const timeRangeField = ({
  nodeId,
  submitFieldId,
  label,
}: {
  nodeId: string;
  label: string;
  submitFieldId?: string; // 不传默认为 nodeId
}) =>
  nodeUtil.createField<Dayjs[]>(
    nodeId,
    label,
    {
      value: [undefined, undefined],
      preprocess({ defaultValues }) {
        const startTime = defaultValues[nodeId]?.[0];
        const endTime = defaultValues[nodeId]?.[1];
        return [
          startTime ? dayjs(startTime * 1000) : undefined,
          endTime ? dayjs(endTime * 1000) : undefined,
        ];
      },
      postprocess: ({ value }) => {
        if (!value) {
          return {};
        }
        return {
          [submitFieldId || nodeId]: [
            value[0] ? dayjs(value[0]).startOf('D').unix() : undefined,
            value[1] ? dayjs(value[1]).endOf('D').unix() : undefined,
          ].filter((e) => Boolean(e)),
        };
      },
    },
    {
      ui: UI_COMPONENTS.DATE_PICKER_RANGE,
      datePickerRange: {
        picker: 'date',
        className: 'w-full',
      },
    },
  );
