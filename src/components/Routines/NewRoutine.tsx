import { useForm, Resolver } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Exercise } from "../../interfaces/exercise.interface";
import { Routine } from "../../interfaces/routine.interface";
import { addRoutine } from "../../features/routines/routinesSlice";
import { generateRandomString } from "../../util/DUMMY_DATA";

import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

import {
  Flex,
  Button,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Heading,
  Card,
  CardBody,
  Checkbox,
} from "@chakra-ui/react";

type FormValues = {
  name: string;
  category: string;
};

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

const NewRoutine = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [addExercisesIsActive, setAddExercisesIsActive] =
    useState<boolean>(false);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const dispatch = useDispatch();

  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  const onSubmit = (data: FormValues) => {
    const routine: Routine = {
      id: generateRandomString(5),
      name: data.name,
      exercises: selectedExercises,
    };

    dispatch(addRoutine(routine));
  };

  const handleAddExercisesDropdown = () => {
    setAddExercisesIsActive(!addExercisesIsActive);
  };

  const handleCheck = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises((exercises) =>
        exercises.filter((ex) => ex.id !== exercise.id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <Heading fontSize="lg" textAlign="center">
        New routine
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <Flex gap={4} direction="column" w="95vw">
          <Flex
            justify="center"
            onClick={() => handleAddExercisesDropdown()}
            gap={1}
            mt={4}
          >
            {!addExercisesIsActive && <ArrowCircleDownOutlinedIcon />}
            {addExercisesIsActive && <ArrowCircleUpOutlinedIcon />}
            <Text>Add Exercises</Text>
          </Flex>
          {addExercisesIsActive && (
            <Flex direction="column" w="100%" gap={2}>
              {exercises.map((exercise, index) => (
                <Card m={0} p={2} bg="#404040" key={index}>
                  <CardBody p={0} ml={5} mr={5}>
                    <Flex gap={5}>
                      <Checkbox
                        onChange={() => handleCheck(exercise)}
                      ></Checkbox>
                      <Text textColor="white">{exercise.name}</Text>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Flex>
          )}
        </Flex>
        <Button
          w="95vw"
          bg="lightblue"
          textColor="#353935"
          type="submit"
          mt={3}
        >
          Create
        </Button>
      </form>
    </Flex>
  );
};

export default NewRoutine;
