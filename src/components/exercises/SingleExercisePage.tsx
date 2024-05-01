import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category } from "../../interfaces/category.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { categories } from "../../util/DUMMY_DATA";
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
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useForm, Resolver } from "react-hook-form";

import { Exercise } from "../../interfaces/exercise.interface";
import { editExercise } from "../../features/exercises/exercisesSlice";

type FormValues = {
  name: string;
  categories: string[];
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Exercise name is required.",
          },
        }
      : {},
  };
};

const SingleExercisePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [searchCategories, setSearchCategories] = useState<string>("");

  const usr = useSelector((state: RootState) => state.authenticatedUser.user);
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );
  const { exerciseId } = useParams();
  const currentExercise = exercises.find(
    (exercise) => exercise.id === exerciseId
  );

  if (!currentExercise) {
    return <Text>Exercise not found.</Text>;
  }

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    currentExercise.categories
  );
  const dispatch = useDispatch();

  const convertFormDataToExercise = (formData: FormValues): Exercise => {
    return {
      id: currentExercise.id,
      name: formData.name,
      categories: selectedCategories,
      userId: usr.id,
    };
  };

  const onSubmit = (data: FormValues) => {
    const exerciseToUpdate = {
      id: currentExercise.id,
      name: data.name,
      categories: selectedCategories,
      userId: usr.id,
    };

    const currentIndex = exercises.indexOf(currentExercise);

    if (currentIndex !== -1) {
      dispatch(
        editExercise({
          exercise: exerciseToUpdate,
          index: currentIndex,
        })
      );
    }
    console.log(data.categories);
    navigate("/exercises");
  };

  const handleCheck = (category: Category) => {
    if (selectedCategories) {
      if (selectedCategories.includes(category)) {
        setSelectedCategories((prevSelectedCategories) =>
          prevSelectedCategories.filter((cat) => cat.id !== category.id)
        );
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleFilterCategories = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchCategories(value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.startsWith(searchCategories.toLowerCase())
  );

  const categoryCheckedByDefault = (category: Category) => {
    if (selectedCategories.includes(category)) {
      return true;
    } else {
      return false;
    }
  };

  const handleGoBack = () => {
    navigate("/exercises");
  };

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={5}
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
          Edit exercise
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
            <Input
              w="95vw"
              bg="#404040"
              borderColor="transparent"
              _focusVisible={{
                borderWidth: "1px",
                borderColor: "lightblue",
              }}
              _placeholder={{ color: "#B3B3B3" }}
              placeholder="Type to filter categories"
              onChange={(event) => handleFilterCategories(event)}
            />
            {filteredCategories.map((category, index) => (
              <Card m={0} p={2} bg="#404040" key={index}>
                <CardBody p={0} ml={5} mr={5}>
                  <Flex gap={5}>
                    <Checkbox
                      onChange={() => handleCheck(category)}
                      defaultChecked={categoryCheckedByDefault(category)}
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
