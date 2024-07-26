export type DraggableProps = {
	children?: any;
};
export const Draggable = ({ children }: DraggableProps) => {
	return <div className="block">{children}</div>;
};
