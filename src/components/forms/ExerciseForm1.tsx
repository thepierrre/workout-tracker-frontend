// import { useEffect, useState } from "react";
// import { Category } from "../../interfaces/category.interface";
// import { useForm, Resolver } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// import WideButton from "../UI/WideButton";
// import {
//   Flex,
//   FormControl,
//   Input,
//   FormErrorMessage,
//   Text,
//   Checkbox,
//   InputGroup,
//   InputLeftElement,
//   Wrap,
// } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";

// interface FormValues {
//   name: string;
// }

// const resolver: Resolver<FormValues> = async (values) => {
//   const trimmedName = values.name.trim();
//   return {
//     values: trimmedName ? { name: trimmedName } : {},
//     errors: !trimmedName
//       ? {
//           name: {
//             type: "required",
//             message: "Exercise name cannot be empty.",
//           },
//         }
//       : {},
//   };
// };

// interface ExerciseFormProps {
//   initialName?: string;
//   initialSelectedCategories?: Category[];
//   buttonText: string;
//   onSubmit: (data: FormValues, selectedCategories: Category[]) => void;
// }

// const ExerciseForm: React.FC<ExerciseFormProps> = ({
//   initialName = "",
//   initialSelectedCategories = [],
//   onSubmit,
//   buttonText,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({ resolver });

//   const [searchedCategories, setSearchedCategories] = useState<string>("");
//   const [selectedCategories, setSelectedCategories] = useState<Category[]>(
//     initialSelectedCategories
//   );
//   const [categories, setCategories] = useState<Category[]>([]);

//   const initialCategories = useSelector(
//     (state: RootState) => state.categories.categories
//   );

//   useEffect(() => {
//     const filteredCategories = initialCategories.filter(
//       (ex) => !initialSelectedCategories.some((selCat) => selCat.id === ex.id)
//     );
//     setCategories(filteredCategories);
//   }, [initialCategories, initialSelectedCategories]);

//   const handleCheck = (category: Category) => {
//     if (selectedCategories.includes(category)) {
//       setTimeout(() => {
//         setSelectedCategories((prevSelectedCategories) =>
//           prevSelectedCategories.filter((cat) => cat.id !== category.id)
//         );
//         setCategories([...categories, category]);
//       }, 250);
//     } else {
//       setTimeout(() => {
//         setSelectedCategories([...selectedCategories, category]);
//         setCategories((prevCategories) =>
//           prevCategories.filter((cat) => cat.id !== category.id)
//         );
//       }, 250);
//     }
//   };

//   const handleCategoryFiltering = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = event.target.value;
//     setSearchedCategories(value);
//   };

//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().startsWith(searchedCategories.toLowerCase())
//   );

//   return (
//     <form onSubmit={handleSubmit((data) => onSubmit(data, selectedCategories))}>
//       <FormControl isInvalid={!!errors.name}>
//         <Input
//           {...register("name")}
//           w="95vw"
//           bg="#404040"
//           borderColor="transparent"
//           _focusVisible={{
//             borderWidth: "1px",
//             borderColor: "lightblue",
//           }}
//           _placeholder={{ color: "#B3B3B3" }}
//           placeholder="Exercise name"
//           defaultValue={initialName}
//         />
//         <FormErrorMessage>
//           {errors.name && errors.name.message}
//         </FormErrorMessage>
//       </FormControl>

//       <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2}>
//         {selectedCategories.map((category) => (
//           <Flex gap={5} w="48%" key={category.name}>
//             <Checkbox
//               defaultChecked={true}
//               onChange={() => handleCheck(category)}
//             ></Checkbox>
//             <Text textColor="white" data-testid="selected category">
//               {category.name.charAt(0).toLocaleUpperCase() +
//                 category.name.slice(1)}
//             </Text>
//           </Flex>
//         ))}
//       </Wrap>

//       <Flex direction="column" w="100%" gap={2}>
//         <InputGroup>
//           <Input
//             w="95vw"
//             bg="#404040"
//             borderColor="transparent"
//             _focusVisible={{
//               borderWidth: "1px",
//               borderColor: "lightblue",
//             }}
//             _placeholder={{ color: "#B3B3B3" }}
//             placeholder="Filter categories"
//             onChange={(event) => handleCategoryFiltering(event)}
//           />
//           <InputLeftElement>
//             <SearchIcon />
//           </InputLeftElement>
//         </InputGroup>

//         {filteredCategories.length > 0 ? (
//           <Wrap w="90vw" mt={4} mb={4} ml={2} mr={2}>
//             {filteredCategories.map((category) => (
//               <Flex gap={5} w="48%" key={category.name}>
//                 <Checkbox
//                   onChange={() => handleCheck(category)}
//                   data-testid="not selected checkbox"
//                 ></Checkbox>
//                 <Text textColor="white" data-testid="not selected category">
//                   {category.name.charAt(0).toLocaleUpperCase() +
//                     category.name.slice(1)}
//                 </Text>
//               </Flex>
//             ))}
//           </Wrap>
//         ) : (
//           <Text textAlign="center" mt={4} mb={4}>
//             There aren't any categories to choose.
//           </Text>
//         )}
//       </Flex>

//       <WideButton type="submit">{buttonText}</WideButton>
//     </form>
//   );
// };

// export default ExerciseForm;
