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
        await dispatch(removeExInstance(exInstanceToDelete.id)).unwrap();
        onExInstanceDeleted(exInstanceToDelete.id);
        setExInstanceToDelete(null);
        onClose();
      } catch (error) {
        console.error("Failed to delete exercise instance:", error);
      }
    }
  };

  return (
    <>
      <CustomCard>
        <CardBody>
          <Text color="white" fontWeight="bold" mb={2}>
            {exerciseInstance?.exerciseTypeName}
          </Text>

          <Flex color="white" direction="column">
            {exerciseInstance?.workingSets?.length > 0 ? (
              exerciseInstance.workingSets.map((workingSet, index) => (
                <Flex key={index} gap={10}>
                  <Text flex={0.1}>{index + 1}</Text>
                  <Flex gap={3} flex={0.2}>
                    <Text fontWeight="bold">{workingSet.reps}</Text>
                    <Text>reps</Text>
                  </Flex>
                  <Flex gap={3} flex={0.2}>
                    <Text fontWeight="bold">
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
              <Text textAlign="center">No sets.</Text>
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
