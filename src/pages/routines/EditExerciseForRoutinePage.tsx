import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ThresholdHandler from "../../components/workouts/ThresholdHandler";
import Container from "../../components/UI/Container";
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import ThresholdForm from "../../components/forms/ThresholdForm";
import { UserSettings } from "../../interfaces/userSettings.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import ExWorkingSet from "components/shared/ExWorkingSet";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const defaultUserSettings: UserSettings = {
  changeThreshold: 1,
  weightUnit: "kgs",
};

const EditExerciseForRoutinePage = () => {
  const navigate = useNavigate();
  const [activeWorkingSet, setActiveWorkingSet] = useState<
    WorkingSet | undefined
  >(undefined);

  const { userSettings, loading: loadingUserSettings } = useSelector(
    (state: RootState) => state.userSettings
  );
  const { routineExercises } = useSelector(
    (state: RootState) => state.localRoutine
  );

  const handleGoBack = () => {
    navigate("/routines/new-routine");
  };

  console.log(routineExercises);

  return (
    <Container>
      <IconButton
        position="absolute"
        left={0}
        top={20}
        aria-label="Go back"
        variant="link"
        color="white"
        w="15%"
        icon={<ChevronLeftIcon boxSize={8} />}
        onClick={() => handleGoBack()}
      />
      <Flex direction="column" align="center" gap={3}>
        <Text size="md">Edit default settings</Text>
        <Heading size="lg" mb={5}>
          BARBELL BENCH PRESS
        </Heading>
        <Flex direction="column" gap={5}>
          <ThresholdHandler />
          <ThresholdForm
            userSettings={userSettings || defaultUserSettings}
            setActiveWorkingSet={setActiveWorkingSet}
          />
          {/* <ExWorkingSet userSettings={userSettings || defaultUserSettings} /> */}
        </Flex>
      </Flex>
    </Container>
  );
};

export default EditExerciseForRoutinePage;
