import { FormUtil } from '@easy-page/antd-ui';
import { MeituanLowestSubsidyFormState } from '../../subPlan';

export type MeituanLowestSubsidyFormProps = {
  formId: string;
  formIndex: number;
  total: number;
  onRemove: (id: string) => void;
  lastFormUtil: FormUtil<MeituanLowestSubsidyFormState>;
};
