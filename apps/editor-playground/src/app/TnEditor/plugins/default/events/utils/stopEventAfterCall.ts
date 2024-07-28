export const stopEventAfterCallback = (
  e: React.KeyboardEvent<HTMLDivElement>,
  callback: () => void
) => {
  callback();
  console.log('阻止事件冒泡');
  e.preventDefault();
  e.stopPropagation();
};
