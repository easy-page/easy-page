export type InfoFieldProps = {
  label: string;
  content: string | React.ReactNode;
};

export const InfoField = ({ label, content }: InfoFieldProps) => {
  const contentInfo =
    typeof content === 'string' ? (
      <div className="max-w-[80%] break-all">{content || '-'}</div>
    ) : (
      content
    );
  return (
    <div className="flex flex-row my-2 items-start">
      <div className="text-sec min-w-[100px]">{label}：</div>
      {contentInfo}
    </div>
  );
};
