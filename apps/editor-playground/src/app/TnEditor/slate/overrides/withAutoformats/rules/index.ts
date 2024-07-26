import { AutoformatHandler } from '../interface';

export const autoformatRules: AutoformatHandler[] = [
  {
    match: '-',
    triggerChar: ' ',
    type: 'ul',
    properties: { level: 1 },
  },
];
