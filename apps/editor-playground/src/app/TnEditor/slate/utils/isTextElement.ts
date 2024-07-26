import { DEFAULT_ELEMENT_TYPE } from '../../constants';
import { CustomElement } from '../../interface';

export const isTextElement = (element: CustomElement) => {
  return element.type === DEFAULT_ELEMENT_TYPE;
};
