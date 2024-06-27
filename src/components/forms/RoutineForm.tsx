import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Exercise } from "../../interfaces/exercise.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SearchIcon } from "@chakra-ui/icons";
import WideButton from "../UI/WideButton";
import {
  Flex,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";

interface FormValues {
  name: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  const trimmedName = values.name.trim();
  return {
    values: trimmedName ? { name: trimmedName } : {},
    errors: !trimmedName
      ? {
          name: {
            type: "required",
            message: "Routine name cannot be empty.",
          },
        }
      : {},
  };
};

interface RoutineFormProps {
  initialName?: string;
  initialSelectedExercises?: Exercise[];
  buttonText: string;
  onSubmit: (data: FormValues, selectedExercises: Exercise[]) => void;
}

const RoutineForm: React.FC<RoutineFormProps> = ({
  initialName = "",
  initialSelectedExercises = [],
  buttonText,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [searchedExercises, setSearchedExercises] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
    initialSelectedExercises
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const initialExercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  useEffect(() => {
    const filteredExercises = initialExercises.filter(
      (ex) => !initialSelectedExercises.some((selEx) => selEx.id === ex.id)
    );
    setExercises(filteredExercises);
  }, [initialExercises, initialSelectedExercises]);

  const handleCheck = (exercise: Exercise) => {
    if (selectedExercises.some((ex) => ex.id === exercise.id)) {
      setSelectedExercises((prevSelectedExercises) =>
        prevSelectedExercises.filter((ex) => ex.id !== exercise.id)
      );
      setExercises((prevExercises) => [...prevExercises, exercise]);
    } else {
      setSelectedExercises((prevSelectedExercises) => [
        ...prevSelectedExercises,
        exercise,
      ]);
      setExercises((prevExercises) =>
        prevExercises.filter((ex) => ex.id !== exercise.id)
      );
    }
  };

  const handleExerciseFiltering = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchedExercises(value);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchedExercises.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, selectedExercises))}>
      <FormControl isInvalid={!!errors.name}>
        <Input
          {...register("name")}
          w="95vw"
          bg="#404040"
          color="white"
          borderColor="transparent"
          _focusVisible={{
            borderWidth: "1px",
            borderColor: "lightblue",
          }}
          _placeholder={{ color: "#B3B3B3" }}
          placeholder="Routine name"
          defaultValue={initialName}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2}>
        {selectedExercises.map((exercise) => (
          <Flex gap={4} w="48%" key={exercise.id}>
            <Checkbox
              defaultChecked={true}
              onChange={() => handleCheck(exercise)}
            ></Checkbox>
            <Text textColor="white" data-testid="selected exercise">
              {exercise.name.charAt(0).toLocaleUpperCase() +
                exercise.name.slice(1)}
            </Text>
          </Flex>
        ))}
      </Wrap>

      <Flex direction="column" w="100%" gap={2}>
        <InputGroup>
          <Input
            w="95vw"
            bg="#404040"
            color="white"
            borderColor="transparent"
            _focusVisible={{
              borderWidth: "1px",
              borderColor: "lightblue",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Filter exercises"
            onChange={(event) => handleExerciseFiltering(event)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>

        {filteredExercises.length > 0 ? (
          <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2} direction="column">
            {filteredExercises.map((exercise) => (
              <Flex key={exercise.id}>
                <Flex gap={4} w="48%">
                  <Checkbox
                    onChange={() => handleCheck(exercise)}
                    data-testid="not selected checkbox"
                  ></Checkbox>
                  <Text textColor="white" data-testid="not selected exercise">
                    {exercise.name.charAt(0).toLocaleUpperCase() +
                      exercise.name.slice(1)}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Wrap>
        ) : (
          <Text textAlign="center" mt={4} mb={4}>
            There aren't any exercises to choose.
          </Text>
        )}
      </Flex>

      <WideButton type="submit">{buttonText}</WideButton>
    </form>
  );
};

export default RoutineForm;
