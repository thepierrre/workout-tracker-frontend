import { useEffect, useState, useRef } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link } from "react-router-dom";
import { Exercise } from "../../interfaces/exercise.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchExercises } from "../../features/exercises/exercisesSlice";
import { SearchIcon } from "@chakra-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import WideButton from "../UI/WideButton";
import { UseFormSetError } from "react-hook-form";
import { List, arrayMove } from "react-movable";
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
  Heading,
  Card,
  Switch,
} from "@chakra-ui/react";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import CustomCard from "../../components/UI/CustomCard";

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
  const [exercisesReordering, setExercisesReordering] =
    useState<boolean>(false);
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

  const remainingExercises = exercises.filter(
    (ex) =>
      !initialSelectedExercises.some((selectedEx) => selectedEx.id == ex.id)
  );

  const handleExerciseFiltering = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchedExercises(value);
  };

  const filteredExercises = remainingExercises.filter((exercise) =>
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
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="exercise-order-switch" mb={0}>
            Changing order?
          </FormLabel>
          <Switch
            id="exercise-order-switch"
            onChange={() => setExercisesReordering(!exercisesReordering)}
          />
        </FormControl>

        {initialSelectedExercises.length > 0 && !exercisesReordering && (
          <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2} direction="column">
            {initialSelectedExercises.map((exercise) => (
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
        )}

        {initialSelectedExercises.length > 0 && exercisesReordering && (
          <List
            values={selectedExercises}
            onChange={({ oldIndex, newIndex }) =>
              setSelectedExercises(
                arrayMove(selectedExercises, oldIndex, newIndex)
              )
            }
            renderList={({ children, props }) => (
              <ul
                {...props}
                style={{
                  listStyleType: "none",
                  padding: 0,
                  marginTop: 8,
                  width: "95vw",
                }}
              >
                {children}
              </ul>
            )}
            renderItem={({ value, props }) => (
              <li {...props} key={value.id}>
                <Card mt={2} mb={2} bg="#404040" w="95vw">
                  <Flex
                    gap={5}
                    p={3}
                    onClick={() => handleToast(isExerciseSelected(value))}
                  >
                    <Text
                      fontWeight={isExerciseSelected(value) ? "bold" : ""}
                      color="white"
                    >
                      {value.name.charAt(0).toLocaleUpperCase() +
                        value.name.slice(1)}
                    </Text>
                  </Flex>
                </Card>
              </li>
            )}
          />
        )}

        {initialSelectedExercises.length === 0 && (
          <Flex direction="column">
            <Text textAlign="center" mt={4}>
              This routine has no exercises.
            </Text>
          </Flex>
        )}

        {!exercisesReordering && (
          <>
            <Flex direction="column" w="100%" mt={3}>
              <FormLabel textColor="white" fontSize="sm">
                Filter exercises to add
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
            </Flex>
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
          </>
        )}
      </Flex>

      <WideButton type="submit">{buttonText}</WideButton>
    </form>
  );
};

export default RoutineForm;
