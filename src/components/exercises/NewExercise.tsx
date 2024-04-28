import { generateRandomString } from "../../util/DUMMY_DATA";
import { useForm, Resolver } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Exercise } from "../../interfaces/exercise.interface";
import { Category } from "../../interfaces/category.interface";
import { categories } from "../../util/DUMMY_DATA";
import { addExercise } from "../../features/exercises/exercisesSlice";
import React, { useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import {
  Flex,
  Button,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Text,
  Card,
  CardBody,
  Checkbox,
} from "@chakra-ui/react";

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
            message: "Exercise is required.",
          },
        }
      : {},
  };
};

const NewExercise = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [searchCategories, setSearchCategories] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const usr = useSelector((state: RootState) => state.authenticatedUser.user);
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
    console.log(searchCategories);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.startsWith(searchCategories.toLowerCase())
  );

  console.log(filteredCategories);

  return (
    <Flex direction="column" gap={4}>
      <Heading fontSize="lg" textAlign="center">
        New exercise
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
        <Heading fontSize="lg" textAlign="center" mt={4} mb={4}>
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
            placeholder="Type to filter"
            onChange={(event) => handleFilterCategories(event)}
          />
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
        <Heading fontSize="md" textAlign="center" m={4}>
          Add a new category
        </Heading>
        <Flex direction="column" gap={2}>
          {categoryInputs.map((input) => input)}
        </Flex>
        <Flex
          justify="center"
          gap={2}
          onClick={() => handleAddCategoryInput()}
          mt={4}
        >
          <AddCircleIcon />
          <Text>Category</Text>
        </Flex>
        <Button
          w="95vw"
          bg="lightblue"
          textColor="#353935"
          type="submit"
          mt={4}
        >
          Create
        </Button>
      </form>
    </Flex>
  );
};

export default NewExercise;
