import { ElementTypeEnum } from '../../../../constants';
import { AutoformatHandler } from '../interface';

export const autoformatRules: AutoformatHandler[] = [
  {
    match: '-',
    triggerChar: ' ',
    type: ElementTypeEnum.Ul,
    properties: { level: 1 },
  },

  {
    match: '[]',
    triggerChar: ' ',
    properties: {
      extraDom: 'checkbox',
    },
    type: ElementTypeEnum.TODO,
  },
  {
    match: '【】',
    triggerChar: ' ',
    properties: {
      extraDom: 'checkbox',
    },
    type: ElementTypeEnum.TODO,
  },
  {
    match: '###',
    triggerChar: ' ',
    properties: {
      size: 3,
    },
    type: ElementTypeEnum.Heading,
  },
  {
    match: '##',
    triggerChar: ' ',
    properties: {
      size: 2,
    },
    type: ElementTypeEnum.Heading,
  },
  {
    match: '#',
    triggerChar: ' ',
    properties: {
      size: 1,
    },
    type: ElementTypeEnum.Heading,
  },
];
