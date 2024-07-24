import {
  Flex,
  FormControl,
  Textarea,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";

interface FormValues {
  content: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  const trimmedName = values.content.trim();
  return {
    values: trimmedName ? { name: trimmedName } : {},
    errors: !trimmedName
      ? {
          content: {
            type: "required",
            message: "Exercise name cannot be empty.",
          },
        }
      : {},
  };
};

const NotesForm = () => {
  const [usedCharacters, setUsedCharacters] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormValues>({ resolver });

  const handleNotesInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const length = value.length;
    setUsedCharacters(length);
    setValue("content", value);
  };

  return (
    <Flex>
      <form>
        <FormControl>
          <Textarea
            {...register("content")}
            _placeholder={{ color: "#B3B3B3" }}
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            placeholder="Add notes for this exercise..."
            size="md"
            bg="#404040"
            color="white"
            borderWidth="1px"
            borderColor="#CBD5E0"
            _focus={{
              boxShadow: "none",
              borderWidth: "2px",
              borderColor: "#3182CE",
            }}
            resize="vertical"
            maxLength={400}
            onChange={handleNotesInputChange}
          />
          <Flex justify="end" mt={1}>
            <Text fontSize="sm">{usedCharacters}/400</Text>
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

export default NotesForm;
