import { Button } from "@chakra-ui/react";

import { FormValues } from "./ThresholdForm";

interface Props {
  handleRepsAndWeight: (
    type: string,
    action: string,
    values?: FormValues,
  ) => void;
  threshold: number;
  repsAndWeightValues: FormValues;
  reps?: string;
  weight?: string;
  increaseOrDecrease: "increase" | "decrease";
  repsOrWeight: "reps" | "weight";
}

const PlusMinusButton: React.FC<Props> = ({
  handleRepsAndWeight,
  threshold,
  repsAndWeightValues,
  reps,
  weight,
  increaseOrDecrease,
  repsOrWeight,
}) => {
  const handleButtonText = (): string => {
    return increaseOrDecrease === "increase" ? "+" : "–";
  };

  const handleParsing = (reps?: string, weight?: string) => {
    if (reps) {
      return parseInt(reps);
    } else if (weight) {
      return parseFloat(weight);
    }
    return NaN;
  };

  const isButtonDisabled = (): boolean => {
    if (increaseOrDecrease === "decrease") {
      return (
        threshold !== undefined && handleParsing(reps, weight) - threshold < 0
      );
    }
    return false;
  };

  return (
    <Button
      fontSize="xl"
      w={10}
      bg="#404040"
      color="white"
      onClick={() =>
        handleRepsAndWeight(
          repsOrWeight,
          increaseOrDecrease,
          repsAndWeightValues,
        )
      }
      _focus={{ bg: "#404040" }}
      isDisabled={isButtonDisabled()}
      css={{
        ":active": {
          background: "lightblue",
          color: "#404040",
        },
      }}
    >
      {handleButtonText()}
    </Button>
  );
};

export default PlusMinusButton;
