export const nearest = (value: number, array: number[]): number => {
  return array.reduce((prev, curr) => {
    return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
  });
};
