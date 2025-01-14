import { nodeUtil } from "@easy-page/antd-ui";

export const poiBrandId = nodeUtil.createField(
  'poiBrandId',
  '业务品牌 ID',
  {
    value: '',
    postprocess: ({ value }) => {
      return {
        poiBrandId: value ? Number(value) : undefined,
      }
    },
  },
  {
    input: {
      placeholder: `请输入业务品牌 ID`,
      allowClear: true,
    },
  },
);

