import { Box, Card, Checkbox, Heading, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";

import useCustomToast from "../../../hooks/useCustomToast";
import { Category } from "../../../interfaces/category.interface";

interface Props {
  filteredCategories: Category[];
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const Categories = ({
  filteredCategories,
  selectedCategories,
  setSelectedCategories,
}: Props) => {
  const { addToast, closeToast } = useCustomToast();

  useEffect(() => {
    return () => {
      closeToast();
    };
  }, [location.pathname]);

  const handleToast = (isCategorySelected: boolean) => {
    if (!isCategorySelected && selectedCategories.length >= 5) {
      addToast({
        message: "You can add up to 5 muscles per exercise!",
        bg: "#F56565",
      });
    }
  };

  const isCategorySelected = (category: Category) =>
    selectedCategories.some((cat) => cat.id === category.id);

  const isCheckboxDisabled = (category: Category) =>
    !isCategorySelected(category) && selectedCategories.length >= 5;

  const handleCheck = (category: Category) => {
    setSelectedCategories((prevSelectedCategories: Category[]) => {
      if (
        prevSelectedCategories.find((cat: Category) => cat.id === category.id)
      ) {
        return prevSelectedCategories.filter(
          (cat: Category) => cat.id !== category.id,
        );
      } else {
        if (prevSelectedCategories.length >= 5) {
          return prevSelectedCategories;
        }
        return [...prevSelectedCategories, category];
      }
    });
  };

  const muscleGroups = ["CORE", "CHEST", "BACK", "LEGS", "SHOULDERS", "ARMS"];

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

  return (
    <>
      {muscleGroups.map((muscleGrp, index) => (
        <Box key={index}>
          {hasCategoriesForMuscleGroups(filteredCategories, muscleGrp) && (
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
                  .filter((category) => category.muscleGroup === muscleGrp)
                  .map((category, _, arr) => {
                    const width = arr.length === 1 ? "100%" : "49%";
                    return (
                      <Card
                        direction="column"
                        p={[2, 1, 2, 1]}
                        bg={
                          isCategorySelected(category) ? "lightblue" : "#414141"
                        }
                        w={width}
                        textColor={
                          isCategorySelected(category) ? "#404040" : "white"
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
      ))}
    </>
  );
};

export default Categories;
