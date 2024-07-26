import { Range } from 'slate';

/**
 * 判断是否有选中
 * @param range
 * @returns
 */
export const isCollapsed = (range?: Range | null) =>
	!!range && Range.isCollapsed(range);
