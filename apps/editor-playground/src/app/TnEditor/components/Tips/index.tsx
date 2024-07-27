export const Tips = ({ msg }: { msg: string }) => {
  return (
    <div className="font-light text-xs rounded text-black absolute top-[-24px] left-0 p-1 bg-[#FAF4E1] border border-[#F6C846]">
      {msg}
    </div>
  );
};
