export const onlyNumbers = (str: string): number => {
  return Number(str.match(/\d+/)![0]);
};
