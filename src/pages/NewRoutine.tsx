import { useNavigate } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { Exercise } from "../interfaces/exercise.interface";
import { Routine } from "../interfaces/routine.interface";
import { addRoutine } from "../features/routines/routinesSlice";
import { generateRandomString } from "../util/DUMMY_DATA";

import WideButton from "../components/UI/WideButton";

import { ChevronLeftIcon } from "@chakra-ui/icons";

import {
  Flex,
  Box,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Heading,
  Card,
  CardBody,
  Checkbox,
  IconButton,
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

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
    navigate("/routines");
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

  const handleGoBack = () => {
    navigate("/routines");
  };

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={7}
      padding={2}
      marginTop={6}
    >
      <Flex align="center" w="100%">
        <IconButton
          aria-label="Go back"
          variant="link"
          color="white"
          w="15%"
          icon={<ChevronLeftIcon boxSize={8} />}
          onClick={() => handleGoBack()}
        />

        <Heading w="70%" fontSize="lg" textAlign="center">
          New routine
        </Heading>
        <Box w="16%" />
      </Flex>
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
          <Flex justify="center" gap={1} mt={4}>
            <Text>Add Exercises</Text>
          </Flex>

          <Flex direction="column" w="100%" gap={2}>
            {exercises.map((exercise, index) => (
              <Card m={0} p={2} bg="#404040" key={index}>
                <CardBody p={0} ml={5} mr={5}>
                  <Flex gap={5}>
                    <Checkbox onChange={() => handleCheck(exercise)}></Checkbox>
                    <Text textColor="white">{exercise.name}</Text>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Flex>
        <WideButton>Add</WideButton>
      </form>
    </Flex>
  );
};

export default NewRoutine;
