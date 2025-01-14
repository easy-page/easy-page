import { ISubActivity } from "@/common/apis/saveAct/interfaces/subAct";
import { generateId } from "@easy-page/antd-ui";

export const appendToSubAct = (processedFormData: Record<string, any>, data: Partial<ISubActivity>) => {
  const subAct: ISubActivity[] = processedFormData?.['subActivity'] || [
    {
      name: generateId('sub-act-name'),
    },
  ];
  subAct[0] = {
    ...subAct[0],
    ...data
  }
  return subAct;
}