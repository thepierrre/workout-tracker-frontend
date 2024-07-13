export const handleWeightUnitText = (weightUnit: string | undefined) => {
  if (weightUnit === "kgs") {
    return "kgs";
  } else if (weightUnit === "lbs") {
    return "lbs";
  } else {
    return "";
  }
};

export const convertKgsToLbs = (kgs: number) => {
  const lbs = kgs * 2.20462;
  const integerPart = Math.floor(lbs);
  const decimalPart = lbs - integerPart;

  if (decimalPart < 0.5) {
    return integerPart;
  }
  if (decimalPart === 0.5) {
    return integerPart + 0.5;
  }
  if (decimalPart > 0.5) {
    return integerPart + 1;
  }
};

export const convertLbsToKgs = (lbs: number) => {
  const kgs = lbs / 2.20462;
  const integerPart = Math.floor(kgs);
  const decimalPart = kgs - integerPart;

  if (decimalPart < 0.5) {
    return integerPart;
  }
  if (decimalPart === 0.5) {
    return integerPart + 0.5;
  }
  if (decimalPart > 0.5) {
    return integerPart + 1;
  }
};
