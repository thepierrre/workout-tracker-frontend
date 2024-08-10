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
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import _ from "lodash";
import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import {
  FormProvider,
  Resolver,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { AppDispatch, RootState } from "../../app/store";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import useCustomToast from "../../hooks/useCustomToast";
import { Exercise } from "../../interfaces/exercise.interface";
import { fetchExercises } from "../../store/exercises/exercisesSlice";
import {
  addExerciseLocally,
  clearLocalRoutine,
  handleRoutineName,
  removeExerciseLocally,
  updateExercisesInRoutine,
} from "../../store/routines/localRoutineSlice";

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
  routineId?: string;
  newRoutine: boolean;
  initialName: string;
  initialSelectedExercises?: Exercise[];
  buttonText: string;
  onSubmit: (data: FormValues, setError: UseFormSetError<FormValues>) => void;
  serverError: string | null;
}

const RoutineForm = forwardRef<{ submit: () => void }, RoutineFormProps>(
  (
    {
      newRoutine,
      routineId,
      initialName,
      initialSelectedExercises = [],
      onSubmit,
      serverError,
    },
    ref,
  ) => {
    const methods = useForm<FormValues>({
      resolver,
      defaultValues: {
        name: initialName,
      },
    });
    const {
      setError,
      setValue,
      getValues,
      register,
      formState: { errors },
    } = methods;

    useImperativeHandle(ref, () => ({
      submit: () => methods.handleSubmit((data) => onSubmit(data, setError))(),
    }));

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast, closeToast } = useCustomToast();
    const initialRemainingExercises = useRef<Exercise[]>([]);
    const [exerciseSearchValue, setExerciseSearchValue] = useState<string>("");
    const [remainingExercises, setRemainingExercises] = useState<Exercise[]>(
      [],
    );
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
      initialSelectedExercises,
    );
    const { exercises, loading: loadingExercises } = useSelector(
      (state: RootState) => state.exercises,
    );
    const { name: localRoutineName, routineExercises: localRoutineExercises } =
      useSelector((state: RootState) => state.localRoutine);

    useEffect(() => {
      dispatch(fetchExercises());
    }, [dispatch]);

    useEffect(() => {
      return () => {
        closeToast();
      };
    }, [location.pathname]);

    useEffect(() => {
      if (!location.state) {
        dispatch(clearLocalRoutine());
        initialSelectedExercises.forEach((ex) => {
          dispatch(addExerciseLocally(ex));
        });
        setValue("name", initialName);
        setSelectedExercises(initialSelectedExercises);
      }
    }, [location.state]);

    useEffect(() => {
      if (location.state && location.state.loadLocalRoutine === true) {
        setValue("name", localRoutineName);
        setSelectedExercises(localRoutineExercises);
      }
    }, [location.pathname]);

    useEffect(() => {
      setRemainingExercises(
        exercises.filter(
          (ex) =>
            !selectedExercises.some(
              (selectedEx) => selectedEx.name === ex.name,
            ),
        ),
      );
      initialRemainingExercises.current = exercises.filter(
        (ex) =>
          !selectedExercises.some((selectedEx) => selectedEx.name === ex.name),
      );
    }, [exercises, selectedExercises]);

    useEffect(() => {
      if (serverError) {
        setError("name", { type: "server", message: serverError });
      }
    }, [serverError, setError]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      setValue("name", name);
    };

    const handleToast = (isExerciseSelected: boolean) => {
      if (!isExerciseSelected && selectedExercises.length >= 15) {
        addToast({
          message: "You can add up to 15 exercises per routine!",
          bg: "#F56565",
        });
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
          exercise = { ...exercise, workingSets: [] };
          addExerciseToRoutineLocally(exercise);
          return [...prevSelectedExercises, exercise];
        }
      });
    };

    const doesSequenceExistInExerciseName = (
      name: string,
      searchValue: string,
    ): boolean => {
      const searchWords = searchValue.toLowerCase().trim().split(" ");
      const exerciseWords = name.toLowerCase().trim().split(" ");

      let searchIndex = 0;

      for (const exerciseWord of exerciseWords) {
        if (exerciseWord.startsWith(searchWords[searchIndex])) {
          searchIndex++;
        }

        if (searchIndex === searchWords.length) {
          return true;
        }
      }

      return false;
    };

    const handleExerciseFiltering = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      setExerciseSearchValue(value);

      const filteredExercises = initialRemainingExercises.current.filter(
        (ex: Exercise) => doesSequenceExistInExerciseName(ex.name, value),
      );

      setRemainingExercises(filteredExercises);
    };

    function highlightMatchedText(exerciseName: string): JSX.Element {
      const searchValue = exerciseSearchValue.toLowerCase().trim();

      if (!searchValue) {
        // If the search term is empty, return the exercise name with the first letter capitalized.
        return (
          <>{exerciseName.charAt(0).toUpperCase() + exerciseName.slice(1)}</>
        );
      }

      const words = exerciseName.split(" ");
      const lowerCaseExerciseName = exerciseName.toLowerCase();
      const lowerCaseWords = lowerCaseExerciseName.split(" ");
      const highlightedWords: JSX.Element[] = [];

      let remainingSearchValue = searchValue;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const lowerCaseWord = lowerCaseWords[i];

        if (
          remainingSearchValue.length > 0 &&
          lowerCaseWord.startsWith(remainingSearchValue)
        ) {
          // If the remaining search value matches the start of this word.
          highlightedWords.push(
            <Fragment key={i}>
              <span style={{ color: "#90cdf4" }}>
                {i === 0
                  ? word.charAt(0).toUpperCase() +
                    word.slice(1, remainingSearchValue.length)
                  : word.slice(0, remainingSearchValue.length)}
              </span>
              {word.slice(remainingSearchValue.length)}{" "}
            </Fragment>,
          );
          // Clear remaining search value after full match.
          remainingSearchValue = "";
        } else if (
          remainingSearchValue.length > 0 &&
          lowerCaseWord.startsWith(remainingSearchValue.slice(0, word.length))
        ) {
          // If the search term spans multiple words, match the start of the word.
          const matchingPart = remainingSearchValue.slice(0, word.length);
          highlightedWords.push(
            <Fragment key={i}>
              <span style={{ color: "#90cdf4" }}>
                {i === 0
                  ? word.charAt(0).toUpperCase() +
                    word.slice(1, matchingPart.length)
                  : word.slice(0, matchingPart.length)}
              </span>
              {word.slice(matchingPart.length)}{" "}
            </Fragment>,
          );
          remainingSearchValue = remainingSearchValue
            .slice(matchingPart.length)
            .trim();
        } else {
          // If there's no match, return the word as it is (capitalized).
          highlightedWords.push(
            <Fragment key={i}>
              {i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word}{" "}
            </Fragment>,
          );
        }
      }

      return <>{highlightedWords}</>;
    }

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

    const onDragEnd = (result: DropResult) => {
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
      dispatch(updateExercisesInRoutine(reorderedItems));
    };

    const addExerciseToRoutineLocally = (exercise: Exercise) => {
      const routineExerciseToAdd: Omit<Exercise, "id"> = {
        name: exercise.name,
        temporaryId: uuidv4(),
        categories: [],
        equipment: "BODYWEIGHT",
        isDefault: false,
        workingSets: [],
      };
      dispatch(addExerciseLocally(routineExerciseToAdd));
    };

    const removeExerciseFromRoutineLocally = (exercise: Exercise) => {
      dispatch(removeExerciseLocally(exercise.name));
    };

    const goToEditExercise = (exerciseName: string) => {
      dispatch(handleRoutineName(getValues("name")));
      navigate(`/routines/new-routine/edit-exercise/${exerciseName}`, {
        state: { newRoutine, routineId },
      });
    };

    const showExerciseSets = (exercise: Exercise): string => {
      const routineExercise = localRoutineExercises.find(
        (re) => re.name === exercise.name,
      );
      const workingSetsLength = routineExercise?.workingSets?.length;
      return workingSetsLength === 1 ? "1 SET" : `${workingSetsLength} SETS`;
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
            <FormLabel htmlFor="routine-name" fontSize="sm">
              Routine name
            </FormLabel>
            <Input
              id="routine-name"
              {...register("name")}
              w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
              bg="#404040"
              borderWidth="1px"
              borderColor="#CBD5E0"
              placeholder="Enter a name"
              onChange={(e) => handleChange(e)}
              _placeholder={{ color: "#B3B3B3" }}
              _focus={{
                boxShadow: "none",
                borderWidth: "2px",
                borderColor: errors.name ? "#E53E3E" : "#3182CE",
              }}
              defaultValue={initialName}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <Flex direction="column" w="100%" mt={8}>
            <Heading fontSize="lg" textAlign="center" mb={3}>
              {`Selected exercises (${selectedExercises.length})`}
            </Heading>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ listStyleType: "none", padding: 0 }}
                  >
                    {selectedExercises.map((exercise, index) => {
                      const id =
                        exercise.id || exercise.temporaryId || uuidv4();
                      return (
                        <Draggable draggableId={id} index={index} key={id}>
                          {(provided, snapshot) => (
                            <li
                              key={id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                borderRadius: "5px",
                                marginTop: "8px",
                                color: snapshot.isDragging
                                  ? "#414141"
                                  : "white",
                                backgroundColor: snapshot.isDragging
                                  ? "lightblue"
                                  : "#404040",
                                transform: provided?.draggableProps?.style
                                  ?.transform
                                  ? `translate(0px, ${provided.draggableProps.style.transform
                                      .split(",")[1]
                                      .trim()
                                      .replace(")", "")})`
                                  : "none",
                              }}
                            >
                              <Card
                                w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                                borderRadius={5}
                                bg="transparent"
                                color={
                                  snapshot.isDragging ? "#414141" : "white"
                                }
                              >
                                <Flex gap={2} p={3} direction="row">
                                  <Flex direction="column" gap={2} w="80%">
                                    <Checkbox
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
                                      {exercise.name.charAt(0).toUpperCase() +
                                        exercise.name.slice(1)}
                                    </Checkbox>
                                    <Flex ml={6}>
                                      <Text fontSize="sm">
                                        {showExerciseSets(exercise)}
                                      </Text>
                                    </Flex>
                                  </Flex>

                                  <Flex justify="end" align="center" w="20%">
                                    <IconButton
                                      onClick={() =>
                                        goToEditExercise(exercise.name)
                                      }
                                      color={
                                        snapshot.isDragging
                                          ? "#414141"
                                          : "white"
                                      }
                                      variant="ghost"
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
                                  </Flex>
                                </Flex>
                              </Card>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            {!selectedExercises.length && (
              <Box mt={2} mb={2}>
                <Text textAlign="center">No exercises selected.</Text>
              </Box>
            )}

            <Flex direction="column" w="100%" mt={8}>
              <Heading fontSize="lg" textAlign="center" mb={3}>
                Add exercises
              </Heading>
              <InputGroup
                flexDirection="column"
                alignItems="flex-start"
                width={["95vw", "85vw", "70vw", "50vw", "40vw"]}
              >
                <Input
                  id="search-exercises"
                  w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                  bg="#404040"
                  color="white"
                  borderWidth="1px"
                  borderColor="#CBD5E0"
                  _focus={{
                    boxShadow: "none",
                    borderWidth: "2px",
                    borderColor: "#3182CE",
                  }}
                  _placeholder={{ color: "#B3B3B3" }}
                  placeholder="Search by name"
                  onChange={handleExerciseFiltering}
                />
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
              </InputGroup>
            </Flex>
            <Flex direction="column" gap={2} mt={5} mb={2}>
              {remainingExercises.map((exercise) => (
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
                      fontWeight="bold"
                      fontSize="md"
                    >
                      {highlightMatchedText(exercise.name)}
                    </Checkbox>
                    <Text fontWeight="bold" fontSize="xs" mt={2} ml={6}>
                      {exercise.categories.length > 0
                        ? exercise.categories
                            .map((category) => category?.name)
                            .join(" | ")
                            .toUpperCase()
                        : `0 categories`.toUpperCase()}
                    </Text>
                  </Card>
                </Flex>
              ))}
            </Flex>

            {!remainingExercises.length && (
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
