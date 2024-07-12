import { useEffect, useState, useMemo } from "react";
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
  FormControl,
  Input,
  Spinner,
  FormErrorMessage,
  Button,
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
import {
  fetchUserSettings,
  updateChangeThreshold,
} from "../../features/settings/userSettingsSlice";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import { values } from "underscore";

interface FormValues {
  repsValue: string | null;
  weightValue: string | null;
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.repsValue) {
    errors.repsValue = {
      type: "required",
      message: "Reps cannot be empty.",
    };
  } else if (parseInt(values.repsValue) <= 0) {
    errors.repsValue = {
      type: "min",
      message: "Reps must be bigger than 0.",
    };
  }

  if (!values.weightValue) {
    errors.weightValue = {
      type: "required",
      message: "Weight cannot be empty.",
    };
  }

  return {
    values: values.repsValue && values.weightValue ? values : {},
    errors: errors,
  };
};

const WorkoutExerciseInstancePage = () => {
  const [reps, setReps] = useState<string>("10");
  const [threshold, setThreshold] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<string>("30");
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
  const { userSettings, loading: loadingUserSettings } = useSelector(
    (state: RootState) => state.userSettings
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
    }
  }, [userSettings]);

  useEffect(() => {
    if (exerciseInstance?.workingSets?.length === 0) {
      setActiveworkingSet(undefined);
    }
  }, [exerciseInstance]);

  const handleRepsAndWeight = (type: string, action: string) => {
    if (threshold) {
      if (type === "reps") {
        const newValue =
          action === "increase"
            ? parseInt(reps) + threshold
            : parseInt(reps) - threshold;
        setReps(newValue.toString());
        setValue("repsValue", newValue.toString());
      } else if (type === "weight") {
        const newValue =
          action === "increase"
            ? parseFloat(weight) + threshold
            : parseFloat(weight) - threshold;
        setWeight(newValue.toString());
        setValue("weightValue", newValue.toString());
      }
    }
  };

  const handleActiveExInstance = (workingSet: WorkingSet) => {
    activeworkingSet && activeworkingSet.id === workingSet.id
      ? setActiveworkingSet(undefined)
      : setActiveworkingSet(workingSet);
  };

  const buttonText = useMemo(() => {
    return activeworkingSet ? "UPDATE" : "ADD NEW";
  }, [activeworkingSet]);

  const handleAdd = async (reps: string, weight: string) => {
    const workingSetToAdd: Omit<WorkingSet, "id"> = {
      reps: parseInt(reps),
      weight: parseFloat(weight),
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

  const handleUpdate = async (reps: string, weight: string) => {
    let exerciseInstanceId = exerciseInstance?.id;
    let workingSetId = activeworkingSet?.id;

    const workingSetToUpdate: Omit<WorkingSet, "id"> = {
      reps: parseInt(reps),
      weight: parseFloat(weight),
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
    setActiveworkingSet(undefined);
  };

  const onSubmit = async (data: FormValues) => {
    const { repsValue, weightValue } = data;

    if (repsValue && weightValue) {
      if (activeworkingSet) {
        await handleUpdate(repsValue, weightValue);
      } else {
        await handleAdd(repsValue, weightValue);
      }
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
    setActiveworkingSet(undefined);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleThresholdButtonClick = async (value: number) => {
    const userSettingsToUpdate: Omit<UserSettings, "id" | "username"> = {
      changeThreshold: value,
    };
    try {
      await dispatch(updateChangeThreshold(userSettingsToUpdate));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "") {
      setReps("");
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setReps(parsedValue.toString());
      }
    }
  };

  const handleWeightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "") {
      setWeight("");
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setWeight(parsedValue.toString());
      }
    }
  };

  if (loadingUserSettings) {
    return <SpinnerComponent />;
  }

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
                <SmallButton
                  bg={threshold === 50 ? "lightblue" : "#404040"}
                  textColor={threshold === 50 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(50)}
                >
                  50
                </SmallButton>
                <SmallButton
                  bg={threshold === 100 ? "lightblue" : "#404040"}
                  textColor={threshold === 100 ? "#404040" : "white"}
                  fontSize="lg"
                  _focus={{ bg: "lightblue" }}
                  onClick={() => handleThresholdButtonClick(100)}
                >
                  100
                </SmallButton>
              </Flex>
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex justify="center" gap={8}>
                <Flex direction="column" gap={1}>
                  <Text textAlign="center" fontSize="sm">
                    REPS
                  </Text>
                  <Flex justify="start" align="center" gap={2}>
                    <Button
                      fontSize="xl"
                      w={10}
                      bg="#404040"
                      color="white"
                      onClick={() => handleRepsAndWeight("reps", "decrease")}
                      _focus={{ bg: "#404040" }}
                      isDisabled={
                        threshold !== undefined &&
                        parseInt(reps) - threshold < 0
                      }
                      css={{
                        ":active": {
                          background: "lightblue",
                          color: "#404040",
                        },
                      }}
                    >
                      –
                    </Button>

                    <FormControl isInvalid={!!errors.repsValue}>
                      <Input
                        {...register("repsValue")}
                        w={16}
                        value={reps}
                        textAlign="center"
                        onChange={(event) => handleRepsInputChange(event)}
                      />
                    </FormControl>

                    <Button
                      fontSize="xl"
                      w={10}
                      bg="#404040"
                      color="white"
                      onClick={() => handleRepsAndWeight("reps", "increase")}
                      _focus={{ bg: "#404040" }}
                      css={{
                        ":active": {
                          background: "lightblue",
                          color: "#404040",
                        },
                      }}
                    >
                      +
                    </Button>
                  </Flex>
                </Flex>

                <Flex direction="column" gap={1}>
                  <Text textAlign="center" fontSize="sm">
                    KGS
                  </Text>
                  <Flex justify="center" gap={2} align="center">
                    <Button
                      fontSize="xl"
                      w={10}
                      bg="#404040"
                      color="white"
                      onClick={() => handleRepsAndWeight("weight", "decrease")}
                      _focus={{ bg: "#404040" }}
                      isDisabled={
                        threshold !== undefined &&
                        parseFloat(weight) - threshold < 0
                      }
                      css={{
                        ":active": {
                          background: "lightblue",
                          color: "#404040",
                        },
                      }}
                    >
                      –
                    </Button>

                    <FormControl isInvalid={!!errors.weightValue}>
                      <Input
                        {...register("weightValue")}
                        w={16}
                        value={weight}
                        textAlign="center"
                        onChange={(event) => handleWeightInputChange(event)}
                      />
                    </FormControl>

                    <Button
                      fontSize="xl"
                      w={10}
                      bg="#404040"
                      color="white"
                      onClick={() => handleRepsAndWeight("weight", "increase")}
                      _focus={{ bg: "#404040" }}
                      css={{
                        ":active": {
                          background: "lightblue",
                          color: "#404040",
                        },
                      }}
                    >
                      +
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" justify="center" mt={4}>
                {errors && (
                  <Flex
                    direction="column"
                    align="center"
                    gap={0}
                    mb={3}
                    color="#E53E3E"
                  >
                    {errors.repsValue?.message && (
                      <Text>{errors.repsValue?.message}</Text>
                    )}
                    {errors.weightValue?.message && (
                      <Text>{errors.weightValue?.message}</Text>
                    )}
                  </Flex>
                )}
                <Flex justify="center" gap={4}>
                  <NarrowButton
                    type="submit"
                    w={24}
                    bg="lightblue"
                    textColor="#353935"
                  >
                    {buttonText}
                  </NarrowButton>
                  <NarrowButton
                    w={24}
                    bg="lightblue"
                    textColor="#353935"
                    isDisabled={activeworkingSet ? false : true}
                    onClick={() => handleDelete()}
                  >
                    DELETE
                  </NarrowButton>
                </Flex>
              </Flex>
            </form>
          </Flex>
          <Flex direction="column" gap={2} mt={3} align="center">
            {exerciseInstance?.workingSets?.length > 0 ? (
              exerciseInstance?.workingSets?.map((set, index) => (
                <ExerciseWorkingSet
                  workingSet={set}
                  index={index}
                  key={index}
                  activeWorkingSet={activeworkingSet}
                  handleActiveExInstance={handleActiveExInstance}
                />
              ))
            ) : (
              <Text>This exercise has no sets.</Text>
            )}
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default WorkoutExerciseInstancePage;
