import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { UseFormSetError } from "react-hook-form";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import useCustomToast from "../../hooks/useCustomToast";
import { Category } from "../../interfaces/category.interface";

export interface FormValues {
  name: string;
  equipment: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  const trimmedName = values.name.trim();
  return {
    values: trimmedName
      ? { name: trimmedName, equipment: values.equipment }
      : {},
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
  initialName: string;
  initialEquipment: string;
  initialSelectedCategories: Category[];
  buttonText: string;
  onSubmit: (
    data: FormValues,
    selectedCategories: Category[],
    setError: UseFormSetError<FormValues>,
  ) => void;
  serverError: string | null;
}

const ExerciseForm = forwardRef<{ submit: () => void }, ExerciseFormProps>(
  (
    {
      initialName,
      initialEquipment,
      initialSelectedCategories,
      onSubmit,
      serverError,
    },
    ref,
  ) => {
    const methods = useForm<FormValues>({
      resolver,
      defaultValues: {
        name: initialName,
        equipment: initialEquipment,
      },
    });
    const {
      formState: { errors },
      setError,
      register,
    } = methods;

    const { addToast, closeToast } = useCustomToast();
    const [searchedCategories, setSearchedCategories] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
      initialSelectedCategories,
    );
    const { categories, loading: loadingCategories } = useSelector(
      (state: RootState) => state.categories,
    );

    useImperativeHandle(ref, () => ({
      submit: () =>
        methods.handleSubmit((data) =>
          onSubmit(data, selectedCategories, setError),
        )(),
    }));

    useEffect(() => {
      return () => {
        closeToast();
      };
    }, [location.pathname]);

    useEffect(() => {
      setSelectedCategories(initialSelectedCategories);
    }, [initialSelectedCategories]);

    useEffect(() => {
      if (serverError) {
        setError("name", { type: "server", message: serverError });
      }
    }, [serverError, setError]);

    const handleToast = (isCategorySelected: boolean) => {
      if (!isCategorySelected && selectedCategories.length >= 5) {
        addToast({
          message: "You can add up to 5 muscles per exercise!",
          bg: "#F56565",
        });
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

    const muscleGroups = ["CORE", "CHEST", "BACK", "LEGS", "SHOULDERS", "ARMS"];

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
            onSubmit(data, selectedCategories, setError),
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
              borderWidth="1px"
              borderColor="#CBD5E0"
              placeholder="Enter a name"
              _placeholder={{ color: "#B3B3B3" }}
              _focus={{
                boxShadow: "none",
                borderWidth: "2px",
                borderColor: errors.name ? "#E53E3E" : "#3182CE",
              }}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <FormLabel fontSize="sm" mt={4}>
              Equipment
            </FormLabel>
            <Select {...register("equipment")} bg="#404040">
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
                <Heading fontSize="lg">{`Muscles worked (${selectedCategories.length}/5)`}</Heading>
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
                      <Heading
                        fontSize="lg"
                        mt={8}
                        ml={2}
                        color="lightblue"
                        textAlign="center"
                      >
                        {muscleGrp}
                      </Heading>
                      <Wrap
                        mt={5}
                        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
                        spacing={2}
                        justify="left"
                      >
                        {filteredCategories
                          .filter(
                            (category) => category.muscleGroup === muscleGrp,
                          )
                          .map((category, _, arr) => {
                            const width = arr.length === 1 ? "100%" : "49%";
                            return (
                              <Card
                                direction="column"
                                p={[2, 1, 2, 1]}
                                bg={
                                  isCategorySelected(category)
                                    ? "lightblue"
                                    : "#414141"
                                }
                                w={width}
                                textColor={
                                  isCategorySelected(category)
                                    ? "#404040"
                                    : "white"
                                }
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
                                  colorScheme="green"
                                  data-testid={`checkbox-category-name-${category.name}`}
                                  fontWeight={
                                    isCategorySelected(category) ? "bold" : ""
                                  }
                                >
                                  {category.name.charAt(0).toLocaleUpperCase() +
                                    category.name.slice(1)}
                                </Checkbox>
                              </Card>
                            );
                          })}
                      </Wrap>
                    </>
                  )}
                </Box>
              ))
            ) : (
              <Text textAlign="center" mt={4} mb={4}>
                No categories found.
              </Text>
            )}
          </Flex>
        </form>
      </FormProvider>
    );
  },
);

export default ExerciseForm;
