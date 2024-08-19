import {
  CardBody,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../app/store";
import DeletionModal from "../../components/UI/DeletionModal";
import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";
import { UserSettings } from "../../interfaces/userSettings.interface";
import { removeExInstance } from "../../store/workout/workoutSessionsSlice";
import {
  convertKgsToLbs,
  handleWeightUnitText,
  roundKgs,
} from "../../util/weightUnitConverting";
import CustomCard from "../UI/CustomCard";

const defaultUserSettings: UserSettings = {
  changeThreshold: 1,
  weightUnit: "kgs",
};

interface Props {
  exerciseInstance: ExerciseInstance;
  userSettings: UserSettings;
  onExInstanceDeleted: (id: string) => void;
}

const WorkoutExerciseInstance: React.FC<Props> = ({
  exerciseInstance,
  userSettings,
  onExInstanceDeleted,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingExerciseInProgress, setDeletingExerciseInProgress] =
    useState<boolean>(false);

  const [exInstanceToDelete, setExInstanceToDelete] =
    useState<ExerciseInstance | null>(null);

  const handleOpenModal = (
    e: React.MouseEvent,
    exInstance: ExerciseInstance,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setExInstanceToDelete(exInstance);
    onOpen();
  };

  const handleRemoveExInstance = async () => {
    if (exInstanceToDelete) {
      try {
        setDeletingExerciseInProgress(true);
        await dispatch(removeExInstance(exInstanceToDelete.id)).unwrap();
        onExInstanceDeleted(exInstanceToDelete.id);
        setExInstanceToDelete(null);
        onClose();
      } catch (error) {
        console.error("Failed to delete exercise instance:", error);
      } finally {
        setDeletingExerciseInProgress(false);
      }
    }
  };

  return (
    <>
      <CustomCard>
        <CardBody>
          <Text color="white" fontWeight="bold" mb={4}>
            {exerciseInstance?.exerciseTypeName}
          </Text>

          <Flex color="white" direction="column">
            {exerciseInstance?.workingSets?.length > 0 ? (
              exerciseInstance.workingSets.map((workingSet, index) => (
                <Flex key={index} gap={10}>
                  <Text w={8}>{index + 1}</Text>
                  <Flex gap={2} w={20}>
                    <Text fontWeight="bold" w={8}>
                      {workingSet.reps}
                    </Text>
                    <Text>reps</Text>
                  </Flex>
                  <Flex gap={3} w={20}>
                    <Text fontWeight="bold" w={8}>
                      {userSettings?.weightUnit === "kgs"
                        ? roundKgs(workingSet.weight)
                        : convertKgsToLbs(workingSet.weight)}
                    </Text>
                    <Text>
                      {handleWeightUnitText(
                        userSettings?.weightUnit ||
                          defaultUserSettings.weightUnit,
                      )}
                    </Text>
                  </Flex>
                </Flex>
              ))
            ) : (
              <Text textAlign="center" mt={2}>
                No sets.
              </Text>
            )}
          </Flex>
          <Flex justify="end">
            <IconButton
              color="lightblue"
              aria-label="Delete exercise"
              variant="ghost"
              onClick={(e) => handleOpenModal(e, exerciseInstance)}
              _focus={{ bg: "transparent" }}
              icon={<RemoveCircleOutlineIcon />}
            />
          </Flex>
        </CardBody>
      </CustomCard>
      <DeletionModal
        deletionInProgress={deletingExerciseInProgress}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleRemoveExInstance}
        elementType="exercise"
        text="Delete the exercise from the workout?"
      />
    </>
  );
};

export default WorkoutExerciseInstance;
