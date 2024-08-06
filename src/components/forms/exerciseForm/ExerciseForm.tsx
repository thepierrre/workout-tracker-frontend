import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { UseFormSetError } from "react-hook-form";
import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import { Category } from "../../../interfaces/category.interface";
import SpinnerComponent from "../../UI/SpinnerComponent";
import Categories from "./Categories";

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
      setSelectedCategories(initialSelectedCategories);
    }, [initialSelectedCategories]);

    useEffect(() => {
      if (serverError) {
        setError("name", { type: "server", message: serverError });
      }
    }, [serverError, setError]);

    const handleCategoryFiltering = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event.target.value;
      setSearchedCategories(value);
    };

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().startsWith(searchedCategories.toLowerCase()),
    );

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
              <Flex justify="center" w="100%" mb={5}>
                <Heading fontSize="lg">{`Selected muscles (${selectedCategories.length}/5)`}</Heading>
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

            <Categories
              filteredCategories={filteredCategories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Flex>
        </form>
      </FormProvider>
    );
  },
);

export default ExerciseForm;
