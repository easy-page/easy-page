import { subsidyBaseLevelContainer } from '@/pages/plansCrud/fields/containers';
import { shyBaseLevelPrice } from './shyBaseLevelPrice';

export const shyBaseLevel = subsidyBaseLevelContainer.appendChildren([
  shyBaseLevelPrice(),
]);
