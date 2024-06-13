import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import NarrowButton from "../../components/UI/NarrowButton";
import SmallButton from "../../components/UI/SmallButton";
import Container from "../../components/UI/Container";
import {
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Series } from "../../interfaces/series.interface";
import { generateRandomString } from "../../util/DUMMY_DATA";
import {
  addSeriesToWorkout,
  updateSeriesInWorkout,
  deleteSeriesFromWorkout,
} from "../../features/workout/workoutSessionsSlice";

const WorkoutExerciseInstancePage = () => {
  const [reps, setReps] = useState<number>(9);
  const [weight, setWeight] = useState<number>(42);
  const [activeSeries, setActiveSeries] = useState<Series | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const { workoutId, exerciseInstanceId } = useParams();

  const workoutSessions = useSelector(
    (state: RootState) => state.workoutSessions
  );

  const wrk = workoutSessions.workouts.find((w) => w.id === workoutId);
  const exerciseInstance = wrk?.exerciseInstances.find(
    (e) => e.id === exerciseInstanceId
  );

  const dispatch = useDispatch();

  const handleRepsAndWeight = (type: string, action: string) => {
    if (type === "reps") {
      if (action === "increase") {
        setReps(reps + 1);
      } else if (action === "decrease") {
        setReps(reps - 1);
      }
    } else if (type === "weight") {
      if (action === "increase") {
        setWeight(weight + 1);
      } else if (action === "decrease") {
        setWeight(weight - 1);
      }
    }
  };

  const handleActiveExInstance = (series: Series) => {
    activeSeries && activeSeries.id === series.id
      ? setActiveSeries(undefined)
      : setActiveSeries(series);
  };

  const handleButtonText = () => {
    return activeSeries ? "UPDATE" : "ADD NEW";
  };

  const handleDisableButton = () => {
    return activeSeries ? false : true;
  };

  const handleAdd = () => {
    if (activeSeries) {
      return;
    }
    const seriesToAdd: Series = {
      id: generateRandomString(5),
      reps,
      weight,
    };

    wrk &&
      exerciseInstanceId &&
      dispatch(
        addSeriesToWorkout({
          workoutId: wrk.id,
          exerciseInstanceId: exerciseInstanceId,
          series: seriesToAdd,
        })
      );
  };

  const handleUpdate = () => {
    if (activeSeries) {
      const seriesToUpdate: Series = {
        id: activeSeries.id,
        reps,
        weight,
      };

      wrk &&
        exerciseInstanceId &&
        dispatch(
          updateSeriesInWorkout({
            workoutId: wrk.id,
            exerciseInstanceId: exerciseInstanceId,
            series: seriesToUpdate,
          })
        );
    }
  };

  const handleAppOrUpdate = () => {
    if (activeSeries) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  const handleDelete = () => {
    if (activeSeries) {
      const seriesToUpdate: Series = {
        id: activeSeries.id,
        reps,
        weight,
      };

      wrk &&
        exerciseInstanceId &&
        dispatch(
          deleteSeriesFromWorkout({
            workoutId: wrk.id,
            exerciseInstanceId: exerciseInstanceId,
            series: seriesToUpdate,
          })
        );
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {exerciseInstance?.exerciseTypeName !== undefined && (
        <Flex direction="column" gap={5}>
          <Flex align="center" w="100%">
            <IconButton
              aria-label="Go back"
              variant="link"
              color="white"
              w="15%"
              icon={<ChevronLeftIcon boxSize={8} />}
              onClick={() => handleGoBack()}
            />

            <Heading fontSize="md" color="white" textAlign="center" w="70%">
              {exerciseInstance?.exerciseTypeName.toUpperCase()}
            </Heading>
            <Box w="15%" />
          </Flex>

          <Flex w="100%" direction="column" gap={5} mt={2}>
            <Flex>
              <Flex direction="column" w="50%" gap={1}>
                <Text textAlign="center" fontSize="sm">
                  REPS
                </Text>
                <Flex justify="center" gap={3} align="center">
                  <SmallButton
                    onClick={() => handleRepsAndWeight("reps", "decrease")}
                  >
                    –
                  </SmallButton>
                  <Text fontSize="3xl">{reps}</Text>
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <SmallButton
                      onClick={() => handleRepsAndWeight("reps", "increase")}
                    >
                      +
                    </SmallButton>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" w="50%" gap={1}>
                <Text textAlign="center" fontSize="sm">
                  KGS
                </Text>
                <Flex justify="center" gap={3} align="center">
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <SmallButton
                      onClick={() => handleRepsAndWeight("weight", "decrease")}
                    >
                      –
                    </SmallButton>
                  </Flex>
                  <Text fontSize="3xl">{weight}</Text>
                  <Flex
                    bg="#404040"
                    w={10}
                    h={10}
                    borderRadius={8}
                    justify="center"
                    align="center"
                  >
                    <SmallButton
                      onClick={() => handleRepsAndWeight("weight", "increase")}
                    >
                      +
                    </SmallButton>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex justify="center" gap={5}>
              <NarrowButton
                w={24}
                bg="lightblue"
                textColor="#353935"
                onClick={() => handleAppOrUpdate()}
              >
                {handleButtonText()}
              </NarrowButton>
              <NarrowButton
                w={24}
                bg="lightblue"
                textColor="#353935"
                isDisabled={handleDisableButton()}
                onClick={() => handleDelete()}
              >
                DELETE
              </NarrowButton>
            </Flex>
          </Flex>
          <Flex direction="column" gap={2} mt={3}>
            {exerciseInstance?.workingSets.map((set, index) => (
              <Card
                // bg="#404040"
                bg={
                  activeSeries && activeSeries.id === set.id
                    ? "lightblue"
                    : "#404040"
                }
                w="95vw"
                key={index}
                onClick={() => set && handleActiveExInstance(set)}
              >
                <CardBody p={4}>
                  <Flex
                    key={index}
                    gap={10}
                    color={
                      activeSeries && activeSeries.id === set.id
                        ? "#353935"
                        : "white"
                    }
                  >
                    <Text flex={0.1}>{index + 1}</Text>
                    <Flex gap={3} flex={0.2}>
                      <Text fontWeight="bold">{set.reps}</Text>
                      <Text>reps</Text>
                    </Flex>
                    <Flex gap={3} flex={0.2}>
                      <Text fontWeight="bold">{set.weight}</Text>
                      <Text>kgs</Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default WorkoutExerciseInstancePage;
