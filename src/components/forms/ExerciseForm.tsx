import { useEffect, useState, useRef } from "react";
import { Category } from "../../interfaces/category.interface";
import { useForm, Resolver } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WideButton from "../UI/WideButton";
import {
  Flex,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Checkbox,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Wrap,
  useToast,
  Box,
  ToastId,
  Radio,
  RadioGroup,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { UseFormSetError } from "react-hook-form";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

interface FormValues {
  name: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  const trimmedName = values.name.trim();
  return {
    values: trimmedName ? { name: trimmedName } : {},
    errors: !trimmedName
      ? {
          name: {
            type: "required",
            message: "Exercise name cannot be empty.",
          },
        }
      : {},
  };
};

interface ExerciseFormProps {
  initialName?: string;
  initialRepsOrTimed: string;
  initialSelectedCategories?: Category[];
  buttonText: string;
  onSubmit: (
    data: FormValues,
    selectedCategories: Category[],
    repsOrTimed: string,
    setError: UseFormSetError<FormValues>
  ) => void;
  serverError: string | null;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  initialName = "",
  initialRepsOrTimed = "",
  initialSelectedCategories = [],
  onSubmit,
  buttonText,
  serverError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ resolver });

  const [repsOrTimed, setRepsOrTimed] = useState<string>(initialRepsOrTimed);
  const [searchedCategories, setSearchedCategories] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialSelectedCategories
  );
  const { categories, loading: loadingCategories } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    setSelectedCategories(initialSelectedCategories);
  }, [initialSelectedCategories]);

  useEffect(() => {
    if (serverError) {
      setError("name", { type: "server", message: serverError });
    }
  }, [serverError, setError]);

  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const addToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
    toastIdRef.current = toast({
      position: "bottom",
      duration: 2500,
      render: () => (
        <Box
          color="white"
          bg="lightblue"
          background="#F56565"
          borderRadius={10}
          p={3}
          fontSize="lg"
          mb={10}
        >
          <Text>You cannot add more than 5 categories!</Text>
        </Box>
      ),
    });
  };

  const handleToast = (isCategorySelected: boolean) => {
    if (!isCategorySelected && selectedCategories.length >= 5) {
      addToast();
    }
  };

  const handleCheck = (category: Category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.find((cat) => cat.id === category.id)) {
        return prevSelectedCategories.filter((cat) => cat.id !== category.id);
      } else {
        if (selectedCategories.length >= 5) {
          return prevSelectedCategories;
        }
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleCategoryFiltering = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchedCategories(value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().startsWith(searchedCategories.toLowerCase())
  );

  const muscleGroups = ["CORE", "CHEST", "BACK", "LEGS", "SHOULDERS"];

  const isCategorySelected = (category: Category) =>
    selectedCategories.some((cat) => cat.id === category.id);

  const isCheckboxDisabled = (category: Category) =>
    !isCategorySelected(category) && selectedCategories.length >= 5;

  if (loadingCategories) {
    return <SpinnerComponent />;
  }

  return (
    <Flex direction="column">
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, selectedCategories, repsOrTimed, setError)
        )}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormControl
          isInvalid={!!errors.name}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        >
          <FormLabel fontSize="sm">Exercise name</FormLabel>
          <Input
            {...register("name")}
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            bg="#404040"
            borderWidth="2px"
            borderColor="#CBD5E0"
            _focus={{
              boxShadow: "none",
              borderWidth: "2px",
              borderColor: errors.name ? "#E53E3E" : "#3182CE",
            }}
            _placeholder={{ color: "#B3B3B3" }}
            placeholder="Enter a name"
            defaultValue={initialName}
          />

          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <Flex w="100%" direction="row" justify="start" gap={5} mt={5}>
          <Text fontSize="lg" fontWeight="bold">
            Type:
          </Text>
          <RadioGroup
            defaultValue={initialRepsOrTimed === "reps" ? "1" : "2"}
            value={repsOrTimed === "reps" ? "1" : "2"}
          >
            <Stack spacing={4} direction="row">
              <Radio
                value="1"
                size="lg"
                onChange={() => setRepsOrTimed("reps")}
              >
                Reps
              </Radio>
              <Radio
                value="2"
                size="lg"
                onChange={() => setRepsOrTimed("timed")}
              >
                Timed
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="center"
          w="100%"
          mt={5}
        >
          <Flex
            direction="column"
            align="flex-start"
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          >
            <FormLabel textColor="white" fontSize="sm">
              Filter categories
            </FormLabel>
            <InputGroup
              flexDirection="column"
              alignItems="flex-start"
              width={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            >
              <Input
                w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                bg="#404040"
                borderWidth="1px"
                borderColor="#CBD5E0"
                _focus={{
                  boxShadow: "none",
                  borderWidth: "2px",
                  borderColor: "#3182CE",
                }}
                _placeholder={{ color: "#B3B3B3" }}
                placeholder="Search"
                onChange={(event) => handleCategoryFiltering(event)}
              />
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
            </InputGroup>
          </Flex>

          {filteredCategories.length > 0 ? (
            muscleGroups.map((muscleGrp, index) => (
              <Box key={index}>
                <Heading fontSize="lg" mt={5}>
                  {muscleGrp}
                </Heading>
                <Wrap
                  mt={5}
                  mb={5}
                  w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                  spacing={2}
                  justify="left"
                >
                  {filteredCategories
                    .filter((category) => category.muscleGroup === muscleGrp)
                    .map((category) => (
                      <Flex
                        direction="column"
                        ml={2}
                        w="45%"
                        data-testid={`category-name-${category.name}`}
                        key={category.name}
                        onClick={() =>
                          handleToast(isCategorySelected(category))
                        }
                      >
                        <Checkbox
                          isChecked={isCategorySelected(category)}
                          isDisabled={isCheckboxDisabled(category)}
                          onChange={() => handleCheck(category)}
                          data-testid={`checkbox-category-name-${category.name}`}
                          fontWeight={
                            isCategorySelected(category) ? "bold" : ""
                          }
                        >
                          {category.name.charAt(0).toLocaleUpperCase() +
                            category.name.slice(1)}
                        </Checkbox>
                      </Flex>
                    ))}
                </Wrap>
              </Box>
            ))
          ) : (
            <Text textAlign="center" mt={4} mb={4}>
              No categories.
            </Text>
          )}
        </Flex>

        <Flex justify="center">
          <WideButton
            type="submit"
            data-testid={"submit-button"}
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          >
            {buttonText}
          </WideButton>
        </Flex>
      </form>
    </Flex>
  );
};

export default ExerciseForm;
