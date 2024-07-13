import { Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { UserSettings } from "interfaces/userSettings.interface";
import { WorkingSet } from "interfaces/workingSet.interface";

interface ExerciseWorkingSetProps {
  userSettings: UserSettings;
  workingSet: WorkingSet;
  activeWorkingSet?: WorkingSet;
  index: number;
  handleActiveExInstance: (workingSet: WorkingSet) => void;
}

const ExerciseWorkingSet: React.FC<ExerciseWorkingSetProps> = ({
  userSettings,
  workingSet,
  activeWorkingSet,
  index,
  handleActiveExInstance,
}) => {
  const handleWeightUnitText = () => {
    if (userSettings.weightUnit === "kgs") {
      return "kgs";
    }
    if (userSettings.weightUnit === "lbs") {
      return "lbs";
    }
  };

  const convertKgsToLbs = (kgs: number) => {
    const lbs = kgs * 2.20462;
    const integerPart = Math.floor(lbs);
    const decimalPart = lbs - integerPart;

    if (decimalPart < 0.5) {
      return integerPart;
    }
    if (decimalPart === 0.5) {
      return integerPart + 0.5;
    }
    if (decimalPart > 0.5) {
      return integerPart + 1;
    }
  };

  return (
    <Card
      bg={
        activeWorkingSet && activeWorkingSet.id === workingSet.id
          ? "lightblue"
          : "#404040"
      }
      w="95vw"
      key={index}
      onClick={() => workingSet && handleActiveExInstance(workingSet)}
    >
      <CardBody p={4}>
        <Flex
          key={index}
          gap={10}
          color={
            activeWorkingSet && activeWorkingSet.id === workingSet.id
              ? "#353935"
              : "white"
          }
        >
          <Text flex={0.1}>{index + 1}</Text>
          <Flex gap={3} flex={0.2}>
            <Text fontWeight="bold">{workingSet.reps}</Text>
            <Text>reps</Text>
          </Flex>
          <Flex gap={3} flex={0.2}>
            <Text fontWeight="bold">{workingSet.weight}</Text>
            <Text>{handleWeightUnitText()}</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ExerciseWorkingSet;
