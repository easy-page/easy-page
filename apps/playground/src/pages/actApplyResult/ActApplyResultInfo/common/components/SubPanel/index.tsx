export type SubPanelProps = {
  title: string;
  children: any;
  rightOperations?: React.ReactNode;
};
export const SubPanel = ({
  title,
  children,
  rightOperations,
}: SubPanelProps) => {
  return (
    <div className="flex flex-col w-full p-2 mb-4">
      <div className="flex fle-row justify-between  pb-2">
        <div className="text-lg font-medium">{title}</div>
        <div>{rightOperations}</div>
      </div>
      {children}
    </div>
  );
};
