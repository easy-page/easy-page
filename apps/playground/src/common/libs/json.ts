export const toJson = (str: string, options?: {
  defaultValue: any;
}) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.log('toJSON error:', str)
    return options?.defaultValue || undefined;
  }
}