import { nodeUtil } from "@easy-page/antd-ui";
import { SearchRuleId } from "../../../constants";
import { isEmptyStr } from "@/common/libs";

export const brandName = nodeUtil.createField(SearchRuleId.BrandName, '业务品牌名称', {
  value: '',
  postprocess({ value }) {
    if (isEmptyStr(value)) {
      return {}
    }
    return {
      [SearchRuleId.BrandName]: value
    }
  },
}, {
  input: {
    placeholder: '请输入',
    allowClear: true,
  }
})