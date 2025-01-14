import { Validate } from "@easy-page/antd-ui";
import { checkNumberInvalid } from "@/common";

export const validateExpandLevelPrice: Validate<string> = ({ value, pageProps }) => {
  const errMsg = '必填，小数需以0.5结束。';
  if (!value) {
    return { success: false, errorMsg: errMsg };
  }
  const res = checkNumberInvalid(value, {
    checkNumber: true,
    decimalNumber: 1,
    endWith: [
      {
        sence(val) {
          return val.includes('.');
        },
        endWith: ['.0', '.5'],
      },
    ],
  });
  if (!res.success) {
    return { success: false, errorMsg: errMsg };
  }

  return { success: true };
}