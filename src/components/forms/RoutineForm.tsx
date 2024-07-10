import { useEffect, useState, useRef } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link } from "react-router-dom";
import { Exercise } from "../../interfaces/exercise.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchExercises } from "../../features/exercises/exercisesSlice";
import { SearchIcon } from "@chakra-ui/icons";
import WideButton from "../UI/WideButton";
import { UseFormSetError } from "react-hook-form";
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
  FormLabel,
  useToast,
  Box,
  ToastId,
  Container,
  Spinner,
} from "@chakra-ui/react";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

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
  onSubmit: (
    data: FormValues,
    selectedExercises: Exercise[],
    setError: UseFormSetError<FormValues>
  ) => void;
  serverError: string | null;
}

const RoutineForm: React.FC<RoutineFormProps> = ({
  initialName = "",
  initialSelectedExercises = [],
  buttonText,
  onSubmit,
  serverError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ resolver });

  const dispatch = useDispatch<AppDispatch>();
  const [searchedExercises, setSearchedExercises] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
    initialSelectedExercises
  );
  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises
  );

  useEffect(() => {
    setSelectedExercises(initialSelectedExercises);
  }, [initialSelectedExercises]);

  useEffect(() => {
    if (serverError) {
      setError("name", { type: "server", message: serverError });
    }
  }, [serverError, setError]);

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const addToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast({
      position: "bottom",
      duration: 2500,
      render: () => (
        <Box
          color="white"
          bg="lightblue"
          background="#F56565"
          borderRadius={10}
          p={3}
          fontSize="lg"
          mb={10}
        >
          <Text>You cannot add more than 15 exercises!</Text>
        </Box>
      ),
    });
  };

  const handleToast = (isExerciseSelected: boolean) => {
    if (!isExerciseSelected && selectedExercises.length >= 15) {
      addToast();
    }
  };

  const handleCheck = (exercise: Exercise) => {
    setSelectedExercises((prevSelectedExercises) => {
      if (prevSelectedExercises.find((ex) => ex.id === exercise.id)) {
        return prevSelectedExercises.filter((ex) => ex.id !== exercise.id);
      } else {
        if (selectedExercises.length >= 15) {
          return prevSelectedExercises;
        }
        return [...prevSelectedExercises, exercise];
      }
    });
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

  const isExerciseSelected = (exercise: Exercise) =>
    selectedExercises.some((ex) => ex.id === exercise.id);

  const isCheckboxDisabled = (exercise: Exercise) =>
    !isExerciseSelected(exercise) && selectedExercises.length >= 15;

  if (loadingExercises) {
    return <SpinnerComponent />;
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(data, selectedExercises, setError)
      )}
    >
      <FormControl isInvalid={!!errors.name}>
        <FormLabel fontSize="sm">Routine name</FormLabel>
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
          placeholder="Enter a name"
          defaultValue={initialName}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Flex direction="column" w="100%" mt={5}>
        <FormLabel textColor="white" fontSize="sm">
          Filter exercises
        </FormLabel>
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
            placeholder="Search"
            onChange={(event) => handleExerciseFiltering(event)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>

        {filteredExercises.length > 0 ? (
          <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2} direction="column">
            {filteredExercises.map((exercise) => (
              <Flex
                key={exercise.id}
                gap={5}
                w="48%"
                onClick={() => handleToast(isExerciseSelected(exercise))}
              >
                <Checkbox
                  isChecked={isExerciseSelected(exercise)}
                  isDisabled={isCheckboxDisabled(exercise)}
                  onChange={() => handleCheck(exercise)}
                  data-testid="not selected checkbox"
                  fontWeight={isExerciseSelected(exercise) ? "bold" : ""}
                >
                  {exercise.name.charAt(0).toLocaleUpperCase() +
                    exercise.name.slice(1)}
                </Checkbox>
              </Flex>
            ))}
          </Wrap>
        ) : (
          <Flex direction="column">
            <Text textAlign="center" mt={4}>
              You don't have any exercises.
            </Text>
            <Link to="/exercises">
              <Text
                textAlign="center"
                mb={4}
                color="lightblue"
                fontWeight="bold"
              >
                Create some now!
              </Text>
            </Link>
          </Flex>
        )}
      </Flex>

      <WideButton type="submit">{buttonText}</WideButton>
    </form>
  );
};

export default RoutineForm;
