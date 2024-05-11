import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import WideButton from "../../components/UI/WideButton";
import CustomCard from "../../components/UI/CustomCard";
import Container from "../../components/UI/Container";
import {
  Text,
  Input,
  Flex,
  FormControl,
  FormErrorMessage,
  CardBody,
  Checkbox,
  Heading,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useForm, Resolver } from "react-hook-form";

import { Routine } from "../../interfaces/routine.interface";
import { Exercise } from "../../interfaces/exercise.interface";
import { editRoutine } from "../../features/routines/routinesSlice";

interface FormValues {
  name: string;
  category: string;
}

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

const SingleRoutinePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const { routineId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routines: Routine[] = useSelector(
    (state: RootState) => state.routines.routines
  );
  const currentRoutine: Routine | undefined = routines.find(
    (routine) => routine.id === routineId
  );
  const [addExercisesIsActive, setAddExercisesIsActive] =
    useState<boolean>(false);
  const [selectedExercises, setSelectedExercises] = useState<any>(
    currentRoutine?.exercises
  );

  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  const onSubmit = (data: FormValues) => {
    const routine: Routine = {
      id: currentRoutine?.id,
      name: data.name,
      exercises: selectedExercises,
    };
    if (currentRoutine) {
      const index = routines.findIndex((routine) => routine.id === routineId);
      dispatch(editRoutine({ routine, index }));
      navigate("/routines");
    }
  };

  const handleAddExercisesDropdown = () => {
    setAddExercisesIsActive(!addExercisesIsActive);
  };

  const handleCheck = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises((exercises: any) =>
        exercises.filter((ex: any) => ex.id !== exercise.id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleDefaultChecked = (exercise: Exercise): boolean => {
    if (currentRoutine?.exercises.includes(exercise)) {
      return true;
    } else return false;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
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
          Edit routine
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
            defaultValue={currentRoutine?.name}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <Flex gap={2} direction="column" w="95vw">
          <Flex
            justify="center"
            onClick={() => handleAddExercisesDropdown()}
            gap={1}
            mt={4}
          ></Flex>

          <Heading fontSize="md" textAlign="center" mb={2}>
            Exercises
          </Heading>
          <Flex direction="column" w="100%" gap={2}>
            {exercises.map((exercise, index) => (
              <CustomCard key={index}>
                <CardBody p={0} ml={5} mr={5}>
                  <Flex gap={5}>
                    <Checkbox
                      defaultChecked={handleDefaultChecked(exercise)}
                      onChange={() => handleCheck(exercise)}
                    ></Checkbox>
                    <Text textColor="white">{exercise.name}</Text>
                  </Flex>
                </CardBody>
              </CustomCard>
            ))}
          </Flex>
        </Flex>
        <WideButton type="submit">Update</WideButton>
      </form>
    </Container>
  );
};

export default SingleRoutinePage;
