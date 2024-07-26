export const isCut = (ev: KeyboardEvent) => {
	return ev.ctrlKey && ev.code === 'x';
};
