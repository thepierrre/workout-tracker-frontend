import { useState } from "react";
import { Category } from "../../interfaces/category.interface";
import { useForm, Resolver } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  Flex,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Checkbox,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

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
            message: "Exercise name is required.",
          },
        }
      : {},
  };
};

interface ExerciseFormProps {
  initialName?: string;
  initialSelectedCategories?: Category[];
  onSubmit: (data: FormValues, selectedCategories: Category[]) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  initialName = "",
  initialSelectedCategories = [],
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [searchedCategories, setSearchedCategories] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialSelectedCategories
  );

  const initialCategories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const notSelectedCategories = initialCategories.filter(
    (cat) => !selectedCategories.includes(cat)
  );
  const [categories, setCategories] = useState<Category[]>(
    notSelectedCategories
  );

  const handleCheck = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setTimeout(() => {
        setSelectedCategories((prevSelectedCategories) =>
          prevSelectedCategories.filter((cat) => cat.id !== category.id)
        );
        setCategories([...categories, category]);
      }, 250);
    } else {
      setTimeout(() => {
        setSelectedCategories([...selectedCategories, category]);
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== category.id)
        );
      }, 250);
    }
  };

  const handleCategoryFiltering = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchedCategories(value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.startsWith(searchedCategories.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, selectedCategories))}>
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
          placeholder="Exercise name"
          defaultValue={initialName}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2}>
        {selectedCategories.map((category) => (
          <Flex gap={5} w="48%" key={category.name}>
            <Checkbox
              defaultChecked={true}
              onChange={() => handleCheck(category)}
            ></Checkbox>
            <Text textColor="white">
              {category.name.charAt(0).toLocaleUpperCase() +
                category.name.slice(1)}
            </Text>
          </Flex>
        ))}
      </Wrap>

      <Flex direction="column" w="100%" gap={2}>
        <InputGroup>
          <Input
            w="95vw"
            bg="#404040"
            borderColor="transparent"
            _focusVisible={{
              borderWidth: "1px",
              borderColor: "lightblue",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Filter categories"
            onChange={(event) => handleCategoryFiltering(event)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>

        <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2}>
          {filteredCategories.map((category) => (
            <Flex gap={5} w="48%" key={category.name}>
              <Checkbox onChange={() => handleCheck(category)}></Checkbox>
              <Text textColor="white">
                {category.name.charAt(0).toLocaleUpperCase() +
                  category.name.slice(1)}
              </Text>
            </Flex>
          ))}
        </Wrap>
      </Flex>

      <Button w="95vw" bg="lightblue" textColor="#353935" type="submit" mt={4}>
        Submit
      </Button>
    </form>
  );
};

export default ExerciseForm;
