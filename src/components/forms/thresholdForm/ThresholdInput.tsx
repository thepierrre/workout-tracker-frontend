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
  handleRepsInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleWeightInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const ThresholdInput: React.FC<Props> = ({
  register,
  reps,
  weight,
  errors,
  type,
  handleRepsInputChange,
  handleWeightInputChange,
}) => {
  const handleRepsOrWeightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (handleRepsInputChange && reps !== undefined) {
      handleRepsInputChange(event);
    } else if (handleWeightInputChange && weight !== undefined) {
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
