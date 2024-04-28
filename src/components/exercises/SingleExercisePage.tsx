import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import {
  Text,
  Input,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  Card,
  CardBody,
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";

import { Routine } from "../../interfaces/routine.interface";
import { Exercise } from "../../interfaces/exercise.interface";
import { editExercise } from "../../features/exercises/exercisesSlice";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type FormValues = {
  name: string;
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

const SingleExercisePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exercises: Exercise[] = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  const currentExercise: Exercise | undefined = exercises.find(
    (exercise) => exercise.id === exerciseId
  );
  // const [addExercisesIsActive, setAddExercisesIsActive] =
  //   useState<boolean>(false);
  // const [selectedExercises, setSelectedExercises] = useState<any>(
  //   currentRoutine?.exercises
  // );

  // const exercises = useSelector(
  //   (state: RootState) => state.exercises.exercises
  // );

  const onSubmit = (data: FormValues) => {
    // const routine: Routine = {
    //   id: currentRoutine?.id,
    //   name: data.name,
    //   exercises: selectedExercises,
    // };
    // if (currentRoutine) {
    //   const index = routines.findIndex((routine) => routine.id === routineId);
    //   // dispatch(editRoutine({ routine, index }));
    //   navigate("/routines");
  };

  // const handleAddExercisesDropdown = () => {
  //   setAddExercisesIsActive(!addExercisesIsActive);
  // };

  // const handleCheck = (exercise: Exercise) => {
  //   if (selectedExercises.includes(exercise)) {
  //     setSelectedExercises((exercises: any) =>
  //       exercises.filter((ex: any) => ex.id !== exercise.id)
  //     );
  //   } else {
  //     setSelectedExercises([...selectedExercises, exercise]);
  //   }
  // };

  // const handleDefaultChecked = (exercise: Exercise): boolean => {
  //   if (currentRoutine?.exercises.includes(exercise)) {
  //     return true;
  //   } else return false;
  // };

  console.log(exercises);

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={5}
      padding={2}
      marginTop={8}
    >
      <Heading fontSize="2xl">Edit exercise</Heading>
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
            defaultValue={currentExercise?.name}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <Flex gap={2} direction="column" w="95vw">
          <Heading fontSize="md" textAlign="center" mt={6} mb={3}>
            Categories
          </Heading>
          <Flex direction="column" w="100%" gap={2}>
            {currentExercise?.categories.map((category, index) => (
              <Card m={0} p={2} bg="#404040" key={index}>
                <CardBody p={0} ml={5} mr={5}>
                  <Flex gap={5}>
                    <Checkbox
                    // defaultChecked={handleDefaultChecked(exercise)}
                    // onChange={() => handleCheck(exercise)}
                    ></Checkbox>
                    <Text textColor="white">
                      {category.name.charAt(0).toLocaleUpperCase() +
                        category.name.slice(1)}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </Flex>
          <Flex>
            <Input
              // {...register("name")}
              w="95vw"
              bg="#404040"
              borderColor="transparent"
              _focusVisible={{
                borderWidth: "1px",
                borderColor: "lightblue",
              }}
              _placeholder={{ color: "#B3B3B3" }}
              placeholder="Add new category"
            />
          </Flex>
        </Flex>

        <Button
          w="95vw"
          bg="lightblue"
          textColor="#353935"
          type="submit"
          mt={6}
        >
          Update
        </Button>
      </form>
    </Flex>
  );
};

export default SingleExercisePage;
