import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  ToastId,
  useToast,
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import React, { forwardRef, useImperativeHandle } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  FormProvider,
  Resolver,
  UseFormSetError,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import WideButton from "../../components/UI/WideButton";
import { fetchExercises } from "../../features/exercises/exercisesSlice";
import {
  addExerciseLocally,
  handleRoutineName,
  removeExerciseLocally,
} from "../../features/routines/localRoutineSlice";
import { Exercise } from "../../interfaces/exercise.interface";

export interface FormValues {
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
  onSubmit: (data: FormValues, setError: UseFormSetError<FormValues>) => void;
  serverError: string | null;
}

const RoutineForm = forwardRef<{ submit: () => void }, RoutineFormProps>(
  (
    { initialName = "", initialSelectedExercises = [], onSubmit, serverError },
    ref,
  ) => {
    const methods = useForm<FormValues>({ resolver });
    const {
      setError,
      setValue,
      formState: { errors },
    } = methods;

    const NestedInput = () => {
      const { register } = useFormContext();
      return (
        <Input
          {...register("name")}
          w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          bg="#404040"
          borderWidth="2px"
          borderColor="#CBD5E0"
          placeholder="Enter a name"
          _placeholder={{ color: "#B3B3B3" }}
          _focus={{
            boxShadow: "none",
            borderWidth: "2px",
            borderColor: errors.name ? "#E53E3E" : "#3182CE",
          }}
          defaultValue={initialName}
        />
      );
    };

    useImperativeHandle(ref, () => ({
      submit: () => methods.handleSubmit((data) => onSubmit(data, setError))(),
    }));

    const dispatch = useDispatch<AppDispatch>();
    const [searchedExercises, setSearchedExercises] =
      React.useState<string>("");
    const [selectedExercises, setSelectedExercises] = React.useState<
      Exercise[]
    >(initialSelectedExercises);
    const { exercises, loading: loadingExercises } = useSelector(
      (state: RootState) => state.exercises,
    );
    const { name: routineName, routineExercises } = useSelector(
      (state: RootState) => state.localRoutine,
    );

    useEffect(() => {
      if (routineName) {
        setValue("name", routineName);
      }
      if (routineExercises.length && exercises.length) {
        const exercisesFromRoutineExercises: Exercise[] = routineExercises
          .map((re) => exercises.find((ex) => ex.name === re.name))
          .filter((ex): ex is Exercise => ex !== undefined)
          .map((ex) => ({
            ...ex,
            id: ex.id,
            name: ex.name,
            categories: ex.categories,
            isDefault: ex.isDefault,
            repsOrTimed: ex.repsOrTimed,
          }));
        setSelectedExercises(exercisesFromRoutineExercises);
      } else {
        setSelectedExercises(initialSelectedExercises);
      }
    }, [routineExercises, routineName, exercises, setValue]);

    React.useEffect(() => {
      if (serverError) {
        setError("name", { type: "server", message: serverError });
      }
    }, [serverError, setError]);

    const toast = useToast();
    const toastIdRef = React.useRef<ToastId | undefined>(undefined);

    React.useEffect(() => {
      dispatch(fetchExercises());
    }, [dispatch]);

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
          removeExerciseFromRoutineLocally(exercise);
          return prevSelectedExercises.filter((ex) => ex.id !== exercise.id);
        } else {
          if (selectedExercises.length >= 15) {
            return prevSelectedExercises;
          }
          addExerciseToRoutineLocally(exercise);
          return [...prevSelectedExercises, exercise];
        }
      });
    };

    const remainingExercises = exercises.filter(
      (ex) => !selectedExercises.some((selectedEx) => selectedEx.id === ex.id),
    );

    const handleExerciseFiltering = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      setSearchedExercises(value);
    };

    const filteredExercises = remainingExercises.filter((exercise) =>
      exercise.name.toLowerCase().startsWith(searchedExercises.toLowerCase()),
    );

    const remainingFilteredExercises = filteredExercises.filter(
      (exercise) => !selectedExercises.some((ex) => ex.id === exercise.id),
    );

    const isExerciseSelected = (exercise: Exercise) =>
      selectedExercises.some((ex) => ex.id === exercise.id);

    const isCheckboxDisabled = (exercise: Exercise) =>
      !isExerciseSelected(exercise) && selectedExercises.length >= 15;

    const arrayMove = (arr: any[], fromIndex: number, toIndex: number) => {
      const newArr = [...arr];
      const element = newArr.splice(fromIndex, 1)[0];
      newArr.splice(toIndex, 0, element);
      return newArr;
    };

    const onDragEnd = (result: any) => {
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      const reorderedItems = arrayMove(
        selectedExercises,
        source.index,
        destination.index,
      );
      setSelectedExercises(reorderedItems);
    };

    const saveRoutineNameLocally = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      dispatch(handleRoutineName(value));
    };

    const addExerciseToRoutineLocally = (exercise: Exercise) => {
      const routineExerciseToAdd = {
        name: exercise.name,
        workingSets: [],
      };
      dispatch(addExerciseLocally(routineExerciseToAdd));
    };

    const removeExerciseFromRoutineLocally = (exercise: Exercise) => {
      dispatch(removeExerciseLocally(exercise.name));
    };

    if (loadingExercises) {
      return <SpinnerComponent />;
    }

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data, setError))}
        >
          <FormControl
            isInvalid={!!errors.name}
            width={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          >
            <FormLabel fontSize="sm">Routine name</FormLabel>
            <NestedInput />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <Flex direction="column" w="100%" mt={5}>
            <Heading fontSize="lg" textAlign="center" mb={1}>
              Selected exercises
            </Heading>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ listStyleType: "none", padding: 0 }}
                  >
                    {selectedExercises.map((exercise, index) => (
                      <Flex key={exercise.id}>
                        <Draggable draggableId={exercise.id} index={index}>
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                borderRadius: "5px",
                                marginTop: "8px",
                                backgroundColor: snapshot.isDragging
                                  ? "transparent"
                                  : "#404040",
                              }}
                            >
                              <Card
                                bg="#404040"
                                w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                                borderRadius={5}
                              >
                                <Flex gap={2} p={3} direction="row">
                                  <Flex direction="column" gap={2} w="50%">
                                    <Checkbox
                                      color="white"
                                      isChecked={isExerciseSelected(exercise)}
                                      isDisabled={isCheckboxDisabled(exercise)}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleCheck(exercise);
                                      }}
                                      data-testid="not selected checkbox"
                                      fontWeight={
                                        isExerciseSelected(exercise)
                                          ? "bold"
                                          : ""
                                      }
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {exercise.name
                                        .charAt(0)
                                        .toLocaleUpperCase() +
                                        exercise.name.slice(1)}
                                    </Checkbox>
                                    <Flex ml={6}>
                                      <Text textColor="#E2E8F0" fontSize="sm">
                                        SETS
                                      </Text>
                                    </Flex>
                                  </Flex>

                                  <Flex justify="end" align="center" w="50%">
                                    <Link
                                      to={`/routines/new-routine/edit-exercise/${exercise.name}`}
                                    >
                                      <IconButton
                                        variant="ghost"
                                        color="#E2E8F0"
                                        sx={{
                                          _focus: {
                                            boxShadow: "none",
                                            bg: "transparent",
                                          },
                                          _hover: { bg: "transparent" },
                                        }}
                                        aria-label="toggle exercise details"
                                        icon={<EditIcon />}
                                      />
                                    </Link>
                                  </Flex>
                                </Flex>
                              </Card>
                            </li>
                          )}
                        </Draggable>
                      </Flex>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            {!selectedExercises.length && (
              <Box mt={2} mb={2}>
                <Text textAlign="center">
                  Add some exercises to your routine!
                </Text>
              </Box>
            )}

            <Flex direction="column" w="100%" mt={3}>
              <Heading fontSize="lg" textAlign="center" mb={3}>
                Add exercises
              </Heading>
              <InputGroup
                flexDirection="column"
                alignItems="flex-start"
                width={["95vw", "85vw", "70vw", "50vw", "40vw"]}
              >
                <Input
                  w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                  bg="#404040"
                  color="white"
                  borderWidth="2px"
                  borderColor="#CBD5E0"
                  _focus={{
                    boxShadow: "none",
                    borderWidth: "2px",
                    borderColor: "#3182CE",
                  }}
                  _placeholder={{ color: "#B3B3B3" }}
                  placeholder="Filter"
                  onChange={(event) => handleExerciseFiltering(event)}
                />
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
              </InputGroup>
            </Flex>
            <Flex direction="column" gap={2} mt={5} mb={2}>
              {remainingFilteredExercises.map((exercise) => (
                <Flex
                  key={exercise.id}
                  onClick={() => handleToast(isExerciseSelected(exercise))}
                  m={0}
                >
                  <Card
                    bg="#404040"
                    w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                    borderRadius={5}
                    p={[6, 2, 6, 2]}
                    color="white"
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
                  </Card>
                </Flex>
              ))}
            </Flex>

            {!remainingFilteredExercises.length && (
              <Flex direction="column">
                <Text textAlign="center" mt={0} mb={2}>
                  No exercises.
                </Text>
              </Flex>
            )}
          </Flex>
        </form>
      </FormProvider>
    );
  },
);

export default RoutineForm;
