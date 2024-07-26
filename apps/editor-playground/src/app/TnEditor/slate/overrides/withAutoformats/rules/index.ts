import { AutoformatHandler } from '../interface';

export const autoformatRules: AutoformatHandler[] = [
  {
    match: '-',
    triggerChar: ' ',
    type: 'ul',
    properties: { level: 1 },
  },
  {
    match: '#',
    triggerChar: ' ',
    properties: {
      size: 1,
    },
    type: 'heading',
  },
  {
    match: '##',
    triggerChar: ' ',
    properties: {
      size: 2,
    },
    type: 'heading',
  },
  {
    match: '###',
    triggerChar: ' ',
    properties: {
      size: 3,
    },
    type: 'heading',
  },
];
