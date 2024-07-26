import React from 'react';

/** children 为 React children */
export const splitChildren = (children: any) => {
	const elementChildren: any = [];
	const textChildren: any = [];
	React.Children.forEach(children, (child) => {
		if (
			child.key &&
			typeof child.key === 'string' &&
			child.key.startsWith('provider-')
		) {
			elementChildren.push(child);
		} else {
			textChildren.push(child);
		}
	});
	return {
		elementChildren,
		textChildren,
	};
};
