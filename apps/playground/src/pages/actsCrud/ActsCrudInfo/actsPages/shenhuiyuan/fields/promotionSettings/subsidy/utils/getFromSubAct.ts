import { ISubActivity } from "@/common/apis/saveAct/interfaces/subAct";

export const getFromSubAct = <T>(id: keyof ISubActivity, defaultValues?: Record<string, any>) => {
  const subAct: ISubActivity[] = defaultValues?.['subActivity'] || [];

  return subAct?.[0]?.[id] as T
}