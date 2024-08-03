import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  ToastId,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  FormProvider,
  Resolver,
  useForm,
  useFormContext,
} from "react-hook-form";
import { UseFormSetError } from "react-hook-form";
import { useSelector } from "react-redux";
import { filter } from "underscore";

import { RootState } from "../../app/store";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import { Category } from "../../interfaces/category.interface";
import WideButton from "../UI/WideButton";

export interface FormValues {
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
    setError: UseFormSetError<FormValues>,
  ) => void;
  serverError: string | null;
}

const ExerciseForm = forwardRef<{ submit: () => void }, ExerciseFormProps>(
  (
    {
      initialName = "",
      initialRepsOrTimed = "",
      initialSelectedCategories = [],
      onSubmit,
      serverError,
    },
    ref,
  ) => {
    const methods = useForm<FormValues>({ resolver });
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = methods;

    const [repsOrTimed, setRepsOrTimed] = useState<string>(initialRepsOrTimed);
    const [searchedCategories, setSearchedCategories] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
      initialSelectedCategories,
    );
    const { categories, loading: loadingCategories } = useSelector(
      (state: RootState) => state.categories,
    );

    const NestedInput = () => {
      const { register } = useFormContext();
      return (
        <Input
          {...register("name")}
          w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          bg="#404040"
          borderWidth="1px"
          borderColor="#CBD5E0"
          placeholder="Enter a name"
          _placeholder={{ color: "#B3B3B3" }}
          _focus={{
            boxShadow: "none",
            borderWidth: "2px",
            borderColor: errors.name ? "#E53E3E" : "#3182CE",
          }}
          defaultValue={initialName}
        />
      );
    };

    useImperativeHandle(ref, () => ({
      submit: () =>
        methods.handleSubmit((data) =>
          onSubmit(data, selectedCategories, repsOrTimed, setError),
        )(),
    }));

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
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      setSearchedCategories(value);
    };

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().startsWith(searchedCategories.toLowerCase()),
    );

    const muscleGroups = ["CORE", "CHEST", "BACK", "LEGS", "SHOULDERS"];

    const isCategorySelected = (category: Category) =>
      selectedCategories.some((cat) => cat.id === category.id);

    const isCheckboxDisabled = (category: Category) =>
      !isCategorySelected(category) && selectedCategories.length >= 5;

    const hasCategoriesForMuscleGroups = (
      filteredCategories: Category[],
      muscleGroup: string,
    ): boolean => {
      const categories = filteredCategories.filter(
        (cat: Category) => cat.muscleGroup === muscleGroup,
      );
      if (categories.length) {
        return true;
      } else {
        return false;
      }
    };

    if (loadingCategories) {
      return <SpinnerComponent />;
    }

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            onSubmit(data, selectedCategories, repsOrTimed, setError),
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
            <FormLabel fontSize="sm">Name</FormLabel>
            <NestedInput />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          {/* <Flex w="100%" direction="column" align="center" gap={2} mt={8}>
            <Text fontSize="lg" fontWeight="bold">
              Exercise type
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
          </Flex> */}

          <FormControl
            mt={5}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width={["95vw", "85vw", "70vw", "50vw", "40vw"]}
          >
            <FormLabel fontSize="sm">Equipment</FormLabel>
            <Select bg="#404040">
              <option value="BODYWEIGHT">Bodyweight</option>
              <option value="BARBELL">Barbell</option>
              <option value="DUMBBELLS">Dumbbells</option>
              <option value="WEIGHT_PLATES">Weight plates</option>
              <option value="KETTLEBELLS">Kettlebells</option>
              <option value="MACHINE">Machine</option>
              <option value="BAR">Bar</option>
            </Select>
          </FormControl>

          <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            mt={8}
          >
            <Flex
              direction="column"
              align="flex-start"
              w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            >
              <Flex justify="center" w="100%" mb={3}>
                <Heading fontSize="lg">Categories</Heading>
              </Flex>

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
                  placeholder="Search by name"
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
                  {hasCategoriesForMuscleGroups(
                    filteredCategories,
                    muscleGrp,
                  ) && (
                    <>
                      <Heading fontSize="lg" mt={5} ml={2}>
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
                          .filter(
                            (category) => category.muscleGroup === muscleGrp,
                          )
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
                    </>
                  )}
                </Box>
              ))
            ) : (
              <Text textAlign="center" mt={4} mb={4}>
                No categories.
              </Text>
            )}
          </Flex>
        </form>
      </FormProvider>
    );
  },
);

export default ExerciseForm;
