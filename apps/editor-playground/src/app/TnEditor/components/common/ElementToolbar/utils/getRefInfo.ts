import { ElementTypeEnum } from '../../../../constants';
import { TnElementRef } from '../../../../store';

export type ElementInfo = {
  x: number;
  y: number;
  id: string;
  elementType: ElementTypeEnum;
  isEmpty: boolean;
};

export const getElementInfo = (
  refInfo: TnElementRef | null
): ElementInfo | null => {
  if (!refInfo) {
    return null;
  }
  const element = refInfo.ref?.current;
  if (!element) {
    return null;
  }
  const rect = element.getBoundingClientRect();
  const id = refInfo.id;
  const elementType = element.dataset.blockType as ElementTypeEnum;
  const isEmpty = element.className?.includes('isEmpty');
  return {
    x: rect.x,
    y: rect.y,
    id,
    elementType,
    isEmpty,
  };
};
