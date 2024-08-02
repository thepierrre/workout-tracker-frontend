import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

import { UserSettings } from "../../interfaces/userSettings.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import {
    convertKgsToLbs,
    handleWeightUnitText,
    roundKgs,
} from "../../util/weightUnitConverting";

interface ExWorkingSetProps {
    userSettings: UserSettings;
    workingSet: WorkingSet;
    activeWorkingSet: WorkingSet | undefined;
    index: number;
    handleActiveWorkingSet: (workingSet: WorkingSet) => void;
}

const ExWorkingSet: React.FC<ExWorkingSetProps> = ({
    userSettings,
    workingSet,
    activeWorkingSet,
    index,
    handleActiveWorkingSet,
}) => {
    return (
        <Card
            bg={
                activeWorkingSet && activeWorkingSet.id === workingSet.id
                    ? "lightblue"
                    : "#404040"
            }
            w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            key={index}
            onClick={() => handleActiveWorkingSet(workingSet)}
        >
            <CardBody p={4}>
                <Flex
                    key={index}
                    gap={10}
                    color={
                        activeWorkingSet &&
                        activeWorkingSet.id === workingSet.id
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
                        <Text fontWeight="bold">
                            {userSettings?.weightUnit === "kgs"
                                ? roundKgs(workingSet.weight)
                                : convertKgsToLbs(workingSet.weight)}
                        </Text>
                        <Text>
                            {handleWeightUnitText(userSettings.weightUnit)}
                        </Text>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default ExWorkingSet;
