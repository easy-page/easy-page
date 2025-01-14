export const WEEK_TIMES_OPTIONS = [
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周日',
].map((item, index) => {
  return {
    label: item,
    value: index + 1,
  };
});
