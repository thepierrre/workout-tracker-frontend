import { FormControl, Input } from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
  reps?: string;
  weight?: string;
  type?: string;
  errors: {
    repsValue?: FieldError;
    weightValue?: FieldError;
  };
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setReps: React.Dispatch<React.SetStateAction<string>>;
}

const ThresholdInput: React.FC<Props> = ({
  register,
  reps,
  weight,
  errors,
  type,
  setWeight,
  setReps,
}) => {
  const handleWeightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (value === "") {
      setWeight("");
    } else {
      const regex = /^\d*\.?\d{0,2}$/;
      if (regex.test(value)) {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
          setWeight(parsedValue.toString());
        }
      }
    }
  };

  const handleRepsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (value === "") {
      setReps("");
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setReps(parsedValue.toString());
      }
    }
  };

  const handleRepsOrWeightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (reps) {
      handleRepsInputChange(event);
    } else if (weight) {
      handleWeightInputChange(event);
    }
  };

  const value = weight !== undefined ? weight : reps || "";
  const error = weight ? errors.weightValue : errors.repsValue;

  return (
    <FormControl isInvalid={!!error}>
      <Input
        {...register}
        w={16}
        p={1}
        type={type || undefined}
        value={value}
        textAlign="center"
        borderColor="#CBD5E0"
        _focus={{
          boxShadow: "none",
          borderWidth: "2px",
          borderColor: error ? "#E53E3E" : "#3182CE",
        }}
        onChange={handleRepsOrWeightInputChange}
      />
    </FormControl>
  );
};

export default ThresholdInput;
