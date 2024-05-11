import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Exercise } from "../../interfaces/exercise.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SearchIcon } from "@chakra-ui/icons";
import WideButton from "../UI/WideButton";
import CustomCard from "../UI/CustomCard";
import {
  Flex,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Checkbox,
  InputGroup,
  Wrap,
  InputLeftElement,
} from "@chakra-ui/react";

interface FormValues {
  name: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Name is required.",
          },
        }
      : {},
  };
};

interface RoutineFormProps {
  initialName?: string;
  initialSelectedExercises?: Exercise[];
  onSubmit: (data: FormValues, selectedExercises: Exercise[]) => void;
}

const RoutineForm: React.FC<RoutineFormProps> = ({
  initialName = "",
  initialSelectedExercises = [],
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

  const initialExercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );
  const notSelectedExercses = initialExercises.filter(
    (ex) => !selectedExercises.includes(ex)
  );
  const [exercises, setExercises] = useState<Exercise[]>(notSelectedExercses);

  const handleCheck = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      setTimeout(() => {
        setSelectedExercises((prevSelectedExercises) =>
          prevSelectedExercises.filter((ex) => ex.id !== exercise.id)
        );
        setExercises([...exercises, exercise]);
      }, 250);
    } else {
      setTimeout(() => {
        setSelectedExercises([...selectedExercises, exercise]);
        setExercises((prevExercises) =>
          prevExercises.filter((ex) => ex.id !== exercise.id)
        );
      }, 250);
    }
  };

  const handleExerciseFiltering = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchedExercises(value);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().startsWith(searchedExercises.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, selectedExercises))}>
      <FormControl isInvalid={!!errors.name}>
        <Input
          {...register("name")}
          w="95vw"
          bg="#404040"
          borderColor="transparent"
          _focusVisible={{
            borderWidth: "1px",
            borderColor: "lightblue",
          }}
          _placeholder={{ color: "#B3B3B3" }}
          placeholder="Name"
          defaultValue={initialName}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Wrap w="95vw" mt={4} mb={4} ml={2} mr={2}>
        {selectedExercises.map((exercise) => (
          <Flex gap={5} w="48%" key={exercise.name}>
            <Checkbox
              defaultChecked={true}
              onChange={() => handleCheck(exercise)}
            ></Checkbox>
            <Text textColor="white">
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

        <Flex w="95vw" mt={4} mb={4} ml={2} mr={2} direction="column" gap={2}>
          {filteredExercises.map((exercise) => (
            <CustomCard key={exercise.name}>
              <Flex gap={4} p={2}>
                <Checkbox onChange={() => handleCheck(exercise)}></Checkbox>
                <Text textColor="white">
                  {exercise.name.charAt(0).toLocaleUpperCase() +
                    exercise.name.slice(1)}
                </Text>
              </Flex>
            </CustomCard>
          ))}
        </Flex>
      </Flex>

      <WideButton type="submit">Submit</WideButton>
    </form>
  );
};

export default RoutineForm;
