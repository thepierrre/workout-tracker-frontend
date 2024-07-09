import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useForm, Resolver } from "react-hook-form";
import NarrowButton from "../../components/UI/NarrowButton";
import SmallButton from "../../components/UI/SmallButton";
import Container from "../../components/UI/Container";
import {
  Flex,
  Heading,
  Text,
  Box,
  IconButton,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import {
  addSet,
  updateSet,
  deleteSet,
  fetchWorkouts,
} from "../../features/workout/workoutSessionsSlice";
import ExerciseWorkingSet from "./ExerciseWorkingSet";
import { UserSettings } from "interfaces/userSettings.interface";
import { fetchUserSettings } from "../../features/settings/userSettingsSlice";

interface FormValues {
  thresholdValue: number | null;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.thresholdValue ? values : {},
    errors: {},
  };
};

const WorkoutExerciseInstancePage = () => {
  const [reps, setReps] = useState<number>(10);
  const [threshold, setThreshold] = useState<number>(1);
  const [weight, setWeight] = useState<number>(30);
  const [activeworkingSet, setActiveworkingSet] = useState<
    WorkingSet | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormValues>({ resolver });

  const navigate = useNavigate();

  const { workoutId, exerciseInstanceId } = useParams();

  const workoutSessions = useSelector(
    (state: RootState) => state.workoutSessions
  );
  const userSettings: UserSettings | undefined = useSelector(
    (state: RootState) => state.userSettings.userSettings
  );

  const wrk = workoutSessions.workouts.find((w) => w.id === workoutId);
  const exerciseInstance = wrk?.exerciseInstances.find(
    (e) => e.id === exerciseInstanceId
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWorkouts);
  }, [wrk]);

  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  useEffect(() => {
    if (userSettings) {
      const fetchedThreshold = userSettings.changeThreshold;
      setThreshold(fetchedThreshold);
      if (![0.25, 0.5, 1, 5, 10].includes(fetchedThreshold)) {
        setValue("thresholdValue", fetchedThreshold);
      } else {
        setValue("thresholdValue", null);
      }
    }
  }, [userSettings, setValue]);

  const handleRepsAndWeight = (type: string, action: string) => {
    if (threshold) {
      if (type === "reps") {
        if (action === "increase") {
          setReps(reps + threshold);
        } else if (action === "decrease") {
          setReps(reps - threshold);
        }
      } else if (type === "weight") {
        if (action === "increase") {
          setWeight(weight + threshold);
        } else if (action === "decrease") {
          setWeight(weight - threshold);
        }
      }
    }
  };

  const handleActiveExInstance = (workingSet: WorkingSet) => {
    activeworkingSet && activeworkingSet.id === workingSet.id
      ? setActiveworkingSet(undefined)
      : setActiveworkingSet(workingSet);
  };

  const handleButtonText = () => {
    return activeworkingSet ? "UPDATE" : "ADD NEW";
  };

  const handleAdd = async () => {
    const workingSetToAdd: Omit<WorkingSet, "id"> = {
      reps,
      weight,
    };

    let exerciseInstanceId = exerciseInstance?.id;

    if (exerciseInstanceId) {
      try {
        await dispatch(addSet({ exerciseInstanceId, newSet: workingSetToAdd }));
      } catch (error) {
        console.error("Failed to add set: ", error);
      }
    } else {
      console.error("Exercise instance ID is missing");
    }
  };

  const handleUpdate = async () => {
    let exerciseInstanceId = exerciseInstance?.id;
    let workingSetId = activeworkingSet?.id;

    const workingSetToUpdate: Omit<WorkingSet, "id"> = {
      reps,
      weight,
    };

    if (exerciseInstanceId && workingSetId) {
      try {
        await dispatch(
          updateSet({
            exerciseInstanceId,
            workingSetId: workingSetId,
            setToUpdate: workingSetToUpdate,
          })
        );
      } catch (error) {
        console.error("Failed to update set: ", error);
      }
    } else {
      console.error("Exercise instance ID or set ID is missing");
    }
  };

  const handleAppOrUpdate = () => {
    if (activeworkingSet) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  const handleDelete = async () => {
    let exerciseInstanceId = exerciseInstance?.id;
    let workingSetId = activeworkingSet?.id;

    if (exerciseInstanceId && workingSetId) {
      try {
        await dispatch(
          deleteSet({
            exerciseInstanceId,
            workingSetId: workingSetId,
          })
        );
      } catch (error) {
        console.error("Failed to delete set: ", error);
      }
    } else {
      console.error("Exercise instance ID or set ID is missing");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleThresholdInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setThreshold(value);
      console.log(threshold);
    }
  };

  const handleThresholdButtonClick = (value: number) => {
    setThreshold(value);
    console.log(threshold);
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
            <Flex gap={3} align="center" direction="column">
              <Text fontSize="sm">THRESHOLD</Text>
              <Flex gap={3}>
                <SmallButton
                  bg={threshold === 0.25 ? "lightblue" : "#404040"}
                  textColor={threshold === 0.25 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(0.25)}
                >
                  .25
                </SmallButton>
                <SmallButton
                  bg={threshold === 0.5 ? "lightblue" : "#404040"}
                  textColor={threshold === 0.5 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(0.5)}
                >
                  .5
                </SmallButton>
                <SmallButton
                  bg={threshold === 1 ? "lightblue" : "#404040"}
                  textColor={threshold === 1 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(1)}
                >
                  1
                </SmallButton>
                <SmallButton
                  bg={threshold === 5 ? "lightblue" : "#404040"}
                  textColor={threshold === 5 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(5)}
                >
                  5
                </SmallButton>
                <SmallButton
                  bg={threshold === 10 ? "lightblue" : "#404040"}
                  textColor={threshold === 10 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(10)}
                >
                  10
                </SmallButton>

                <Input
                  {...register("thresholdValue")}
                  w={16}
                  borderColor="transparent"
                  // borderColor={
                  //   threshold && ![0.25, 0.5, 1, 5, 10].includes(threshold)
                  //     ? "lightblue"
                  //     : "transparent"
                  // }
                  bg="#404040"
                  _placeholder={{ color: "#B3B3B3" }}
                  placeholder="own"
                  onChange={handleThresholdInputChange}
                  defaultValue={
                    ![0.25, 0.5, 1, 5, 10].includes(threshold) ? threshold : 56
                  }
                />
              </Flex>
            </Flex>
            <Flex>
              <Flex direction="column" w="50%" gap={0}>
                <Text textAlign="center" fontSize="sm">
                  REPS
                </Text>
                <Flex justify="start" align="center">
                  <SmallButton
                    fontSize="xl"
                    onClick={() => handleRepsAndWeight("reps", "decrease")}
                    isDisabled={reps - threshold < 0}
                    _focus={{ bg: "transparent" }}
                  >
                    –
                  </SmallButton>
                  <Text fontSize="2xl" w={20} textAlign="center">
                    {reps}
                  </Text>

                  <SmallButton
                    fontSize="xl"
                    onClick={() => handleRepsAndWeight("reps", "increase")}
                  >
                    +
                  </SmallButton>
                </Flex>
              </Flex>

              <Flex direction="column" w="50%">
                <Text textAlign="center" fontSize="sm">
                  KGS
                </Text>
                <Flex justify="center" gap={3} align="center">
                  <SmallButton
                    fontSize="xl"
                    onClick={() => handleRepsAndWeight("weight", "decrease")}
                    isDisabled={weight - threshold < 0}
                  >
                    –
                  </SmallButton>

                  <Text fontSize="2xl" w={20} textAlign="center">
                    {weight.toFixed(2)}
                  </Text>

                  <SmallButton
                    fontSize="xl"
                    onClick={() => handleRepsAndWeight("weight", "increase")}
                  >
                    +
                  </SmallButton>
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
                onClick={() => handleDelete()}
              >
                DELETE
              </NarrowButton>
            </Flex>
          </Flex>
          <Flex direction="column" gap={2} mt={3}>
            {exerciseInstance?.workingSets?.map((set, index) => (
              <ExerciseWorkingSet
                workingSet={set}
                index={index}
                key={index}
                activeWorkingSet={activeworkingSet}
                handleActiveExInstance={handleActiveExInstance}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default WorkoutExerciseInstancePage;
