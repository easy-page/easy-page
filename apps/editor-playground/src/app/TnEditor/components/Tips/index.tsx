export const Tips = ({ msg }: { msg: string }) => {
  return (
    <div
      contentEditable={false}
      className="font-light select-none text-xs rounded text-black absolute top-[-24px] left-0 p-1 bg-[#FAF4E1] border border-[#F6C846]"
    >
      {msg}
    </div>
  );
};
