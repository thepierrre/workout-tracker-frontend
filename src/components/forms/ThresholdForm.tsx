import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Text,
  ToastId,
  useToast,
} from "@chakra-ui/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useMemo, useRef, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../app/store";
import NarrowButton from "../../components/UI/NarrowButton";
import Stopwatch from "../../components/workouts/Stopwatch";
import {
  addSetToExerciseLocally,
  removeSetFromExerciseLocally,
  updateSetInExerciseLocally,
} from "../../features/routines/localRoutineSlice";
import {
  addSet,
  deleteSet,
  updateSet,
} from "../../features/workout/workoutSessionsSlice";
import useCustomToast from "../../hooks/useCustomToast";
import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";
import { UserSettings } from "../../interfaces/userSettings.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import { convertLbsToKgs } from "../../util/weightUnitConverting";

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

interface Props {
  threshold: number | undefined;
  exerciseName?: string;
  exBlueprintOrInstance: "blueprint" | "instance";
  activeWorkingSet: WorkingSet | undefined;
  userSettings?: UserSettings;
  exerciseInstance?: ExerciseInstance | undefined;
  setActiveWorkingSet: React.Dispatch<
    React.SetStateAction<WorkingSet | undefined>
  >;
}

const ThresholdForm: React.FC<Props> = ({
  threshold,
  exerciseName,
  exBlueprintOrInstance,
  activeWorkingSet,
  userSettings,
  exerciseInstance,
  setActiveWorkingSet,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({ resolver });

  const { addToast, toastIdRef, closeToast } = useCustomToast();
  const [reps, setReps] = useState<string>("10");
  const [weight, setWeight] = useState<string>("30");

  const dispatch = useDispatch<AppDispatch>();

  const handleAddToast = () => {
    addToast({
      duration: null,
      bg: "white",
      render: () => (
        <Box
          w={["100vw", "85vw", "70vw", "50vw", "40vw"]}
          h={36}
          bg="white"
          position="absolute"
          bottom={0}
          left={0}
          borderTopRadius={10}
        >
          <IconButton
            size="sm"
            position="absolute"
            top={2}
            right={2}
            variant="ghost"
            aria-label="Close stopwatch"
            icon={<CloseIcon onClick={closeToast} />}
          />
          <Stopwatch />
        </Box>
      ),
    });
  };

  const handleToast = () => {
    if (!toastIdRef.current) {
      handleAddToast();
    } else {
      closeToast();
    }
  };

  const handleRepsAndWeight = (
    type: string,
    action: string,
    values?: FormValues,
  ) => {
    if (threshold) {
      if (type === "reps" && !values?.repsValue) {
        return;
      }
      if (type === "reps") {
        let increment;
        if (threshold === 0.25 || threshold === 0.5) {
          increment = action === "increase" ? 1 : -1;
        } else {
          increment = action === "increase" ? threshold : -threshold;
        }
        const newValue = parseInt(reps) + increment;
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

  const buttonText = useMemo(() => {
    return activeWorkingSet ? "UPDATE" : "ADD NEW";
  }, [activeWorkingSet]);

  const parseWeightInCorrectUnit = (w: string | number) => {
    const weight = typeof w === "string" ? parseFloat(w) : w;
    if (userSettings?.weightUnit === "kgs") {
      return weight;
    }
    if (userSettings?.weightUnit === "lbs") {
      return convertLbsToKgs(weight);
    }
    return weight;
  };

  const handleDeleteWorkingSet = async () => {
    let exerciseInstanceId = exerciseInstance?.id;
    let workingSetId = activeWorkingSet?.id;

    if (exBlueprintOrInstance === "instance") {
      if (exerciseInstanceId && workingSetId) {
        try {
          await dispatch(
            deleteSet({
              exerciseInstanceId,
              workingSetId: workingSetId,
            }),
          );
        } catch (error) {
          console.error("Failed to delete set: ", error);
        }
      } else {
        console.error("Exercise instance ID or set ID is missing");
      }
    } else {
      if (exerciseName) {
        try {
          if (workingSetId) {
            dispatch(
              removeSetFromExerciseLocally({
                id: workingSetId,
                exerciseName,
              }),
            );
          } else {
            console.error("Working set ID missing.");
          }
        } catch (error) {
          console.error("Failed to update set: ", error);
        }
      }
    }

    setActiveWorkingSet(undefined);
  };

  const handleAddWorkingSet = async (reps: string, weight: string) => {
    const workingSetToAdd: Omit<WorkingSet, "id"> = {
      reps: parseInt(reps),
      weight: parseWeightInCorrectUnit(weight),
    };

    let exerciseInstanceId = exerciseInstance?.id;

    if (exBlueprintOrInstance === "instance") {
      if (exerciseInstanceId) {
        try {
          await dispatch(
            addSet({ exerciseInstanceId, newSet: workingSetToAdd }),
          );
        } catch (error) {
          console.error("Failed to add set: ", error);
        }
      } else {
        console.error("Exercise instance ID is missing");
      }
    } else {
      if (exerciseName) {
        try {
          dispatch(
            addSetToExerciseLocally({
              workingSet: workingSetToAdd,
              exerciseName,
            }),
          );
        } catch (error) {
          console.error("Failed to add set: ", error);
        }
      }
    }
  };

  const handleUpdateWorkingSet = async (reps: string, weight: string) => {
    let exerciseInstanceId = exerciseInstance?.id;
    let workingSetId = activeWorkingSet?.id;

    const workingSetToUpdate: Omit<WorkingSet, "id"> = {
      reps: parseInt(reps),
      weight: parseWeightInCorrectUnit(weight),
    };

    if (exBlueprintOrInstance === "instance") {
      if (exerciseInstanceId && workingSetId) {
        try {
          await dispatch(
            updateSet({
              exerciseInstanceId,
              workingSetId: workingSetId,
              setToUpdate: workingSetToUpdate,
            }),
          );
        } catch (error) {
          console.error("Failed to update set: ", error);
        }
      } else {
        console.error("Exercise instance ID or set ID is missing");
      }
    } else {
      if (exerciseName) {
        try {
          if (workingSetId) {
            dispatch(
              updateSetInExerciseLocally({
                workingSet: {
                  ...workingSetToUpdate,
                  id: workingSetId,
                },
                exerciseName,
              }),
            );
          } else {
            console.error("Working set ID missing.");
          }
        } catch (error) {
          console.error("Failed to update set: ", error);
        }
      }
    }

    setActiveWorkingSet(undefined);
  };

  const onSubmit = async (data: FormValues) => {
    const { repsValue, weightValue } = data;

    if (repsValue && weightValue) {
      if (activeWorkingSet) {
        await handleUpdateWorkingSet(
          repsValue,
          parseFloat(weightValue).toFixed(2),
        );
      } else {
        await handleAddWorkingSet(
          repsValue,
          parseFloat(weightValue).toFixed(2),
        );
      }
    }
  };

  const handleRepsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
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
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (value === "") {
      setWeight("");
    } else {
      const regex = /^\d*\.?\d{0,2}$/;
      if (regex.test(value)) {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
          setWeight(parsedValue.toString());
        }
      }
    }
  };

  const handleWeightUnitText = () => {
    if (userSettings?.weightUnit === "kgs") {
      return "kgs";
    }
    if (userSettings?.weightUnit === "lbs") {
      return "lbs";
    }
  };

  return (
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
              onClick={() =>
                handleRepsAndWeight("reps", "decrease", getValues())
              }
              _focus={{ bg: "#404040" }}
              isDisabled={
                threshold !== undefined && parseInt(reps) - threshold < 0
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
                p={1}
                value={reps}
                padding={0}
                borderColor="#CBD5E0"
                _focus={{
                  boxShadow: "none",
                  borderWidth: "2px",
                  borderColor: errors.weightValue ? "#E53E3E" : "#3182CE",
                }}
                textAlign="center"
                onChange={(event) => handleRepsInputChange(event)}
              />
            </FormControl>

            <Button
              fontSize="xl"
              w={10}
              bg="#404040"
              color="white"
              onClick={() =>
                handleRepsAndWeight("reps", "increase", getValues())
              }
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
            {handleWeightUnitText()?.toUpperCase()}
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
                threshold !== undefined && parseFloat(weight) - threshold < 0
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
                p={1}
                type="number"
                value={weight}
                textAlign="center"
                borderColor="#CBD5E0"
                _focus={{
                  boxShadow: "none",
                  borderWidth: "2px",
                  borderColor: errors.weightValue ? "#E53E3E" : "#3182CE",
                }}
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
          <NarrowButton type="submit" w={24} bg="lightblue" textColor="#353935">
            {buttonText}
          </NarrowButton>
          <NarrowButton
            w={24}
            bg="lightblue"
            textColor="#353935"
            isDisabled={activeWorkingSet ? false : true}
            onClick={() => handleDeleteWorkingSet()}
          >
            DELETE
          </NarrowButton>
          <IconButton
            onClick={() => handleToast()}
            aria-label="stopwatch"
            textColor="white"
            _focus={{ bg: "#404040" }}
            css={{
              ":active": {
                background: "lightblue",
                color: "#404040",
              },
            }}
            icon={<AccessTimeIcon />}
            bg="#404040"
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default ThresholdForm;
