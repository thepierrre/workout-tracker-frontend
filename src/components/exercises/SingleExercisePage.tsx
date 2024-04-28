import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category } from "../../interfaces/category.interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { generateRandomString } from "../../util/DUMMY_DATA";
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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";

import { Exercise } from "../../interfaces/exercise.interface";
import { addExercise } from "../../features/exercises/exercisesSlice";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

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

  const [searchCategories, setSearchCategories] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const usr = useSelector((state: RootState) => state.authenticatedUser.user);
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );
  const { exerciseId } = useParams();
  const currentExercise = exercises.filter(
    (exercise) => exercise.id === exerciseId
  );
  const dispatch = useDispatch();

  const convertFormDataToExercise = (formData: FormValues): Exercise => {
    return {
      id: generateRandomString(5),
      name: formData.name,
      categories: selectedCategories,
      userId: usr.id,
    };
  };

  const onSubmit = (data: FormValues) => {
    const notEmptyCategories = data.categories.filter(
      (category) => category.trim() !== ""
    );
    const updatedData = {
      ...data,
      categories: notEmptyCategories,
    };

    const exerciseToAdd = convertFormDataToExercise(updatedData);
    dispatch(addExercise(exerciseToAdd));
  };

  const inputs = [
    <InputGroup key={0}>
      <Input
        {...register(`categories.${0}`)}
        w="95vw"
        bg="#404040"
        borderColor="transparent"
        _focusVisible={{
          borderWidth: "1px",
          borderColor: "lightblue",
        }}
        _placeholder={{ color: "#B3B3B3" }}
        placeholder={`Category ${1} (optional)`}
      />
      <InputRightElement>
        <RemoveCircleOutlineIcon />
      </InputRightElement>
    </InputGroup>,
  ];

  const [categoryInputs, setCategoryInputs] =
    useState<React.ReactElement[]>(inputs);

  const handleAddCategoryInput = () => {
    const input = (
      <InputGroup key={categoryInputs.length}>
        <Input
          {...register(`categories.${categoryInputs.length}`)}
          w="95vw"
          bg="#404040"
          borderColor="transparent"
          _focusVisible={{
            borderWidth: "1px",
            borderColor: "lightblue",
          }}
          _placeholder={{ color: "#B3B3B3" }}
          placeholder={`Category ${categoryInputs.length + 1} (optional)`}
        />
        <InputRightElement>
          <RemoveCircleOutlineIcon
            onClick={() => handleRemoveCategoryInput()}
          />
        </InputRightElement>
      </InputGroup>
    );
    setCategoryInputs((prevInputs) => [...prevInputs, input]);
  };

  const handleRemoveCategoryInput = () => {
    setCategoryInputs(categoryInputs.slice(0, -1));
  };

  const handleCheck = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter((cat) => cat.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
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

  console.log(filteredCategories);

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
            {filteredCategories.map((category, index) => (
              <Card m={0} p={2} bg="#404040" key={index}>
                <CardBody p={0} ml={5} mr={5}>
                  <Flex gap={5}>
                    <Checkbox onChange={() => handleCheck(category)}></Checkbox>
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
