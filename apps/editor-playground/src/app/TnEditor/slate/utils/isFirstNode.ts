import { Path } from 'slate';

export const isFirstNode = (nodePath: Path) => {
	return nodePath.length === 1 && nodePath[0] === 0;
};
