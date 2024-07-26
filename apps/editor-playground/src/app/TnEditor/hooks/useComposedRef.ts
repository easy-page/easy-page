import React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and React.RefObject(s)
 */
const setRef = <T>(ref: PossibleRef<T>, value: T) => {
	if (typeof ref === 'function') {
		ref(value);
	} else if (ref !== null && ref !== undefined) {
		(ref as React.MutableRefObject<T>).current = value;
	}
};

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and React.RefObject(s)
 */
export const composeRefs =
	<T>(...refs: PossibleRef<T>[]) =>
	(node: T) =>
		refs.forEach((ref) => setRef(ref, node));

/** 方便合并 refs */
export const useComposedRef = <T>(...refs: PossibleRef<T>[]) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return React.useCallback(composeRefs(...refs), refs);
};
