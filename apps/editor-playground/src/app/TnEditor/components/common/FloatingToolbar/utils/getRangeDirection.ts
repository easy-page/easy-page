export enum RangeDirection {
	None = 0,
	ForwardSelection = 1,
	BackWardSelection = -1,
}

/** 获取选择垂直 */
export const getDriectRangeDirection = (): RangeDirection => {
	const domSelection = window.getSelection();
	if (!domSelection || domSelection?.rangeCount <= 0) {
		return RangeDirection.None;
	}

	// 获取起始节点和结束节点
	const startNode = domSelection.anchorNode;
	const endNode = domSelection.focusNode;

	if (startNode === endNode || !startNode || !endNode) {
		return RangeDirection.ForwardSelection;
	}

	const position = endNode.compareDocumentPosition(startNode);

	// 判断节点的相对位置及偏移量
	if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
		// startNode 在 endNode 之前
		return RangeDirection.ForwardSelection;
	} else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
		// startNode 在 endNode 之后
		return RangeDirection.BackWardSelection;
	} else if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
		// startNode 被 endNode 包含，通过偏移量判断
		return RangeDirection.ForwardSelection;
	} else if (position & Node.DOCUMENT_POSITION_CONTAINS) {
		// startNode 包含 endNode，通过偏移量判断
		return RangeDirection.BackWardSelection;
	}

	return RangeDirection.None;
};
