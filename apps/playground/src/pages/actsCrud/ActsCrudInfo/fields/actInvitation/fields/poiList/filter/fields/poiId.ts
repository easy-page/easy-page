import { nodeUtil } from "@easy-page/antd-ui";

export const poiId = nodeUtil.createField(
  'poiId',
  '门店 ID',
  {
    value: '',
    postprocess: ({ value }) => {
      return {
        poiId: value ? Number(value) : undefined,
      }
    },
  },
  {
    input: {
      placeholder: `请输入门店 ID`,
      allowClear: true,
    },
  },
);