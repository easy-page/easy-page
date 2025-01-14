import { checkNumberInvalid } from "@/common/libs";
import { nodeUtil } from "@easy-page/antd-ui";

export const planId = nodeUtil.createField<string>(
  'planId',
  '方案 ID',
  {
    value: '',
    postprocess: ({ value }) => ({
      planId: value ? Number(value) : undefined,
    }),
  },
  {
    input: {
      placeholder: '仅支持输入数字',
      handleChange: ({ onChange, value }) => {
        if (!value) {
          onChange({ target: { value: value } } as any);
        }
        const res = checkNumberInvalid(value as string, {
          checkNumber: true,
          checkInteger: true
        });
        if (res.success) {
          onChange({ target: { value: value } } as any);
        }
      },
    },
  },
);