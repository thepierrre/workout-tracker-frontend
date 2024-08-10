import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Exercise } from "interfaces/exercise.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../../app/store";
import Container from "../../components/UI/Container";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import ThresholdForm from "../../components/forms/ThresholdForm";
import ExWorkingSet from "../../components/shared/ExWorkingSet";
import ThresholdHandler from "../../components/workouts/ThresholdHandler";
import { UserSettings } from "../../interfaces/userSettings.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import { fetchUserSettings } from "../../store/settings/userSettingsSlice";

const defaultUserSettings: UserSettings = {
  changeThreshold: 1,
  weightUnit: "kgs",
};

const EditExerciseForRoutinePage = () => {
  const [threshold, setThreshold] = useState<number | undefined>(undefined);
  const { exerciseName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeWorkingSet, setActiveWorkingSet] = useState<
    WorkingSet | undefined
  >(undefined);

  const { userSettings, loading: loadingUserSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );
  const { routineExercises } = useSelector(
    (state: RootState) => state.localRoutine,
  );
  const currentExercise = routineExercises.find(
    (ex) => ex.name === exerciseName,
  );

  const handleActiveWorkingSet = (workingSet: WorkingSet) => {
    if (activeWorkingSet && activeWorkingSet.id === workingSet.id) {
      setActiveWorkingSet(undefined);
    } else {
      setActiveWorkingSet(workingSet);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  useEffect(() => {
    if (userSettings) {
      const fetchedThreshold = userSettings.changeThreshold;
      setThreshold(fetchedThreshold);
    }
  }, [userSettings]);

  const handleGoBack = () => {
    location.state &&
      location.state.newRoutine === true &&
      navigate("/routines/new-routine", { state: { loadLocalRoutine: true } });
    location.state &&
      location.state.newRoutine === false &&
      location.state.routineId &&
      navigate(`/routines/${location.state.routineId}`, {
        state: { loadLocalRoutine: true },
      });
  };

  if (loadingUserSettings) {
    return <SpinnerComponent />;
  }

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
        <Text size="md">Customize exercise</Text>
        <Heading size="lg" mb={5}>
          {exerciseName?.toUpperCase()}
        </Heading>
        <Flex direction="column" gap={5}>
          <ThresholdHandler
            threshold={threshold}
            userSettings={userSettings || defaultUserSettings}
          />
          <ThresholdForm
            threshold={threshold}
            exerciseName={exerciseName}
            activeWorkingSet={activeWorkingSet}
            exBlueprintOrInstance="blueprint"
            userSettings={userSettings || defaultUserSettings}
            setActiveWorkingSet={setActiveWorkingSet}
          />
          <Flex direction="column" gap={2} mt={3} mb={3} align="center">
            {currentExercise?.workingSets?.length ? (
              currentExercise?.workingSets?.map((set, index) => (
                <ExWorkingSet
                  workingSet={set}
                  index={index}
                  key={index}
                  activeWorkingSet={activeWorkingSet}
                  handleActiveWorkingSet={handleActiveWorkingSet}
                  userSettings={userSettings || defaultUserSettings}
                />
              ))
            ) : (
              <Text>This exercise has no sets.</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default EditExerciseForRoutinePage;
