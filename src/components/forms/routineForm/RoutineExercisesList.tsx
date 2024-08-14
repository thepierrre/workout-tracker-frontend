import { Box, Card, Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import { Exercise } from "interfaces/exercise.interface";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { AppDispatch } from "../../../app/store";
import {
  handleRoutineName,
  updateExercisesInRoutine,
} from "../../../store/routines/localRoutineSlice";

interface Props {
  selectedExercises: Exercise[];
  localRoutineExercises: Exercise[];
  routineName: string;
  newRoutine: boolean;
  routineId: string | undefined;
  handleCheck: (exercise: Exercise) => void;
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  isExerciseSelected: (exercise: Exercise) => boolean;
  isCheckboxDisabled: (exercise: Exercise) => boolean;
}

const RoutineExercisesList: React.FC<Props> = ({
  selectedExercises,
  localRoutineExercises,
  routineName,
  newRoutine,
  routineId,
  handleCheck,
  setSelectedExercises,
  isExerciseSelected,
  isCheckboxDisabled,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const moveArray = (arr: Exercise[], fromIndex: number, toIndex: number) => {
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
    const reorderedItems = moveArray(
      selectedExercises,
      source.index,
      destination.index,
    );
    setSelectedExercises(reorderedItems);
    dispatch(updateExercisesInRoutine(reorderedItems));
  };

  const goToEditExercise = (exerciseName: string) => {
    dispatch(handleRoutineName(routineName));
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

  return selectedExercises.length ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyleType: "none" }}
          >
            {selectedExercises.map((exercise, index) => {
              const id = exercise.id || exercise.temporaryId || uuidv4();
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
                        color: snapshot.isDragging ? "#414141" : "white",
                        backgroundColor: snapshot.isDragging
                          ? "lightblue"
                          : "#404040",
                        transform: provided?.draggableProps?.style?.transform
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
                        color={snapshot.isDragging ? "#414141" : "white"}
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
                                isExerciseSelected(exercise) ? "bold" : ""
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
                              onClick={() => goToEditExercise(exercise.name)}
                              color={snapshot.isDragging ? "#414141" : "white"}
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
  ) : (
    <Box>
      <Text textAlign="center">No exercises selected.</Text>
    </Box>
  );
};

export default RoutineExercisesList;
