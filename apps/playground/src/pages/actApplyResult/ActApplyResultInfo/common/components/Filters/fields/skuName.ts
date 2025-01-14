import { nodeUtil } from "@easy-page/antd-ui";
import { SearchRuleId } from "../../../constants";
import { isEmptyStr } from "@/common/libs";

export const skuName = nodeUtil.createField(SearchRuleId.SkuName, '商品名称', {
  value: '',
  postprocess({ value }) {
    if (isEmptyStr(value)) {
      return {}
    }
    return {
      [SearchRuleId.SkuName]: value
    }
  },
}, {
  input: {
    placeholder: '请输入',
    allowClear: true,
  }
})