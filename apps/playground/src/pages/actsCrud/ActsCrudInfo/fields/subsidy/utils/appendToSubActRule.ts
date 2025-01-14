import { Content4Shy } from "@/common/apis/saveAct/interfaces";
import { ISubActivity } from "@/common/apis/saveAct/interfaces/subAct";
import { generateId } from "@easy-page/antd-ui";

export const appendToContent4Shy = (processedFormData: Record<string, any>, content4Shy: Partial<Content4Shy>) => {
  const subAct: ISubActivity[] = processedFormData?.['subActivity'] || [
    {
      name: generateId('sub-act-name'),
    },
  ];
  subAct[0].content4Shy = subAct[0].content4Shy || ({} as Content4Shy);
  subAct[0].content4Shy = {
    ...subAct[0].content4Shy,
    ...content4Shy
  }
  return subAct;
}