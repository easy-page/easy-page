import { Content4Shy } from "@/common/apis/saveAct/interfaces";
import { ISubActivity } from "@/common/apis/saveAct/interfaces/subAct";

export const getFromContent4Shy = <T>(id: keyof Content4Shy, defaultValues?: Record<string, any>) => {
  const subAct: ISubActivity[] = defaultValues?.['subActivity'] || [];
  const content4Shy = subAct?.[0]?.content4Shy;
  const result = content4Shy?.[id];
  return result as T
}