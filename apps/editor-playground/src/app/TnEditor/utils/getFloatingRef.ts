import { TnElementRef } from '../store';

/**
 *
 * @param e
 * @param editorElementRefs
 * - 二分法寻找对应坐标，判断条件
 *  - 如果悬浮在节点中，则符合
 *  - 如果悬浮在节点左侧：50px - 100px 内，则符合
 *  - 不符合继续二分查找
 */
export const getFloatingRef = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  editorElementRefs: TnElementRef[],
  options?: {
    leftOffset?: number;
  }
): TnElementRef | null => {
  const { pageX, pageY } = e;

  const isMouseWithinElement = (
    x: number,
    y: number,
    element: HTMLElement
  ): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  };

  const isMouseNearLeftEdge = (
    x: number,
    y: number,
    element: HTMLElement
  ): boolean => {
    const rect = element.getBoundingClientRect();
    const offset = options?.leftOffset || 100;
    return (
      y >= rect.top &&
      y <= rect.bottom &&
      x >= rect.left - offset &&
      x <= rect.left
    );
  };

  let left = 0;
  let right = editorElementRefs.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midElement = editorElementRefs[mid].ref.current as HTMLElement;

    if (isMouseWithinElement(pageX, pageY, midElement)) {
      return editorElementRefs[mid];
    } else if (isMouseNearLeftEdge(pageX, pageY, midElement)) {
      return editorElementRefs[mid];
    } else if (pageY < midElement.getBoundingClientRect().top) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return null; // 如果没有找到符合条件的元素，返回 null
};
