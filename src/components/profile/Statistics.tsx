import { Card, Flex, Text } from "@chakra-ui/react";
import React from "react";

import SecondaryHeading from "../../components/UI/text/SecondaryHeading";
import { Workout } from "../../interfaces/workout.interface";
import { convertKgsToLbs, roundKgs } from "../../util/weightUnitConverting";

interface Props {
  workouts: Workout[];
  weightUnit: string;
}

const Statistics: React.FC<Props> = ({ workouts, weightUnit }) => {
  const totalWeightRaised = (): number => {
    let weightsFromAllSets: number[] = [];
    workouts.map((wrk) =>
      wrk.exerciseInstances.map((ex) =>
        ex.workingSets.map((wrkSet) => weightsFromAllSets.push(wrkSet.weight)),
      ),
    );
    const sum = weightsFromAllSets.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  };

  const maxSingleWeightRaised = (): number => {
    let maxValue = 0;

    workouts.map((wrk) =>
      wrk.exerciseInstances.map((ex) =>
        ex.workingSets.map((wrkSet) => {
          if (wrkSet.weight > maxValue) {
            maxValue = wrkSet.weight;
          }
        }),
      ),
    );

    return maxValue;
  };

  const totalRepsDone = (): number => {
    let repsFromAllSets: number[] = [];
    workouts.map((wrk) =>
      wrk.exerciseInstances.map((ex) =>
        ex.workingSets.map((wrkSet) => repsFromAllSets.push(wrkSet.reps)),
      ),
    );
    const sum = repsFromAllSets.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  };

  const maxRepsInSingleSet = (): number => {
    let maxValue = 0;

    workouts.map((wrk) =>
      wrk.exerciseInstances.map((ex) =>
        ex.workingSets.map((wrkSet) => {
          if (wrkSet.reps > maxValue) {
            maxValue = wrkSet.reps;
          }
        }),
      ),
    );

    return maxValue;
  };

  return (
    <Flex direction="column" align="center" gap={2} mb={3}>
      <SecondaryHeading text="Keep up the good work!" />

      <Card
        bg="#404040"
        color="white"
        padding={4}
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        gap={2}
      >
        <Flex gap={2}>
          <Text fontWeight="bold" w="60%" color="lightblue">
            Number of workouts:
          </Text>
          <Text fontWeight="bold">{workouts.length}</Text>
        </Flex>
      </Card>

      <Card
        bg="#404040"
        color="white"
        padding={4}
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        gap={2}
      >
        <Flex gap={2}>
          <Text fontWeight="bold" w="60%" color="lightblue">
            Total weight:
          </Text>
          <Text fontWeight="bold">
            {weightUnit === "kgs"
              ? `${roundKgs(totalWeightRaised())} kgs`
              : `${convertKgsToLbs(totalWeightRaised())} lbs`}
          </Text>
        </Flex>
      </Card>

      <Card
        bg="#404040"
        color="white"
        padding={4}
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        gap={2}
      >
        <Flex gap={2}>
          <Text fontWeight="bold" w="60%" color="lightblue">
            Highest single weight:
          </Text>
          <Text fontWeight="bold">
            {weightUnit === "kgs"
              ? `${roundKgs(maxSingleWeightRaised())} kgs`
              : `${convertKgsToLbs(maxSingleWeightRaised())} lbs`}
          </Text>
        </Flex>
      </Card>

      <Card
        bg="#404040"
        color="white"
        padding={4}
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        gap={2}
      >
        <Flex gap={2}>
          <Text fontWeight="bold" w="60%" color="lightblue">
            Total reps:
          </Text>
          <Text fontWeight="bold">{totalRepsDone()}</Text>
        </Flex>
      </Card>

      <Card
        bg="#404040"
        color="white"
        padding={4}
        w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
        gap={2}
      >
        <Flex gap={2}>
          <Text fontWeight="bold" w="60%" color="lightblue">
            Maximum reps in a set:
          </Text>
          <Text fontWeight="bold">{maxRepsInSingleSet()}</Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Statistics;

{
  /* <Text fontWeight="bold">
{userSettings?.weightUnit === "kgs"
  ? roundKgs(workingSet.weight)
  : convertKgsToLbs(workingSet.weight)}
</Text> */
}
