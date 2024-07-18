export const handleWeightUnitText = (
  weightUnit: string | undefined
): string => {
  return weightUnit === "kgs" ? "kgs" : weightUnit === "lbs" ? "lbs" : "";
};

export const convertKgsToLbs = (kgs: number): number => {
  const lbs = kgs * 2.20462;
  const integerPart = Math.floor(lbs);
  const decimalPart = lbs - integerPart;

  return decimalPart < 0.5
    ? integerPart
    : decimalPart === 0.5
    ? integerPart + 0.5
    : integerPart + 1;
};

export const convertLbsToKgs = (lbs: number): number => {
  return lbs / 2.20462;
};

export const roundKgs = (kgs: number): number => {
  return parseFloat(kgs.toFixed(2));
};
