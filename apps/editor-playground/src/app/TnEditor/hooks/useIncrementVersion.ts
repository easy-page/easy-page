import React from 'react';
import { useTnStore } from '../store';

/**
 * - 用于记录选中区域的变化版本号，每次改变 + 1
 */
export enum TnStoreVersionChangeKey {
	VersionSelection = 'versionSelection',
	VersionEditor = 'versionEditor',
}

export const useIncrementVersion = (
	key: TnStoreVersionChangeKey,
	id?: string
) => {
	const previousVersionRef = React.useRef(1);
	const set = useTnStore(id).set[key]?.();
	return React.useCallback(() => {
		const nextVersion = previousVersionRef.current + 1;
		set(nextVersion);
		previousVersionRef.current = nextVersion;
	}, [set]);
};
