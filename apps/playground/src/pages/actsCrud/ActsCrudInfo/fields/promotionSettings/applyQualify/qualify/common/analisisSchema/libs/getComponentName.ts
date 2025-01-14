export const getComponentName = (name: string): string => {
  return name.replace(/\b\w/g, function (match) {
    return match.toLowerCase();
  });
};
