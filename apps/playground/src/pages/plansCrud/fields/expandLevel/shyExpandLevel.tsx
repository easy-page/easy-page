import { subsidyExpandLevelContainer } from '@/pages/plansCrud/fields/containers';
import { merchantMaxSubsidyForm } from './merchantMaxSubsidyFormContainer';
import { meituanLowestSubsidyForm } from './meituanLowestSubsidyFormContainer';

export const shyExpandLevel = subsidyExpandLevelContainer.appendChildren([
  merchantMaxSubsidyForm({}),
  meituanLowestSubsidyForm,
]);
