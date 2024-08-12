import { Flex, FormControl, FormLabel, Text, Textarea } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../app/store";
import { updateNotesForExInstance } from "../../store/workout/workoutSessionsSlice";

interface Props {
  exInstanceId: string;
  initialNotes: string;
}

interface FormValues {
  notes: string;
}

const NotesForm: React.FC<Props> = ({ exInstanceId, initialNotes }) => {
  const [usedCharacters, setUsedCharacters] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue("notes", initialNotes);
  }, []);

  const { register, setValue } = useForm<FormValues>();

  const debouncedUpdateNotes = useCallback(
    debounce((value: string) => {
      const trimmedValue = value.trim();
      dispatch(
        updateNotesForExInstance({
          id: exInstanceId,
          notes: trimmedValue,
        }),
      );
    }, 500),
    [dispatch, exInstanceId],
  );

  const handleNotesInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    const length = value.length;
    setUsedCharacters(length);
    setValue("notes", value);

    debouncedUpdateNotes(value);
  };

  return (
    <Flex>
      <form>
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="notes">
            Exercise notes
          </FormLabel>
          <Textarea
            {...register("notes")}
            id="notes"
            _placeholder={{ color: "#B3B3B3" }}
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            placeholder="How was this exercise?"
            p={2}
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
            maxLength={300}
            onChange={handleNotesInputChange}
          />
          <Flex justify="end" mt={1}>
            <Text fontSize="sm">{usedCharacters}/300</Text>
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

export default NotesForm;
