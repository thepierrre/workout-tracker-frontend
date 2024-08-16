import { Flex } from "@chakra-ui/react";
import React from "react";

import { Workout } from "../../../interfaces/workout.interface";
import { convertKgsToLbs, roundKgs } from "../../../util/weightUnitConverting";
import SecondaryHeading from "../../UI/text/SecondaryHeading";
import StatisticsUnit from "./StatisticsUnit";

interface Props {
  workouts: Workout[];
  weightUnit: string;
}

const Statistics: React.FC<Props> = ({ workouts, weightUnit }) => {
  const totalWeightRaised = (): number => {
    const weightsFromAllSets: number[] = [];
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
    const repsFromAllSets: number[] = [];
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

  const totalWeight =
    weightUnit === "kgs"
      ? `${roundKgs(totalWeightRaised())} kgs`
      : `${convertKgsToLbs(totalWeightRaised())} lbs`;

  const highestSingleWeight =
    weightUnit === "kgs"
      ? `${roundKgs(maxSingleWeightRaised())} kgs`
      : `${convertKgsToLbs(maxSingleWeightRaised())} lbs`;

  const statisticsContent = [
    { text: "Total workouts:", value: workouts.length },
    { text: "Total reps:", value: totalRepsDone() },
    { text: "Maximum reps in a set:", value: maxRepsInSingleSet() },
    {
      text: " Total weight:",
      value: totalWeight,
    },
    {
      text: " Highest single weight:",
      value: highestSingleWeight,
    },
  ];

  return (
    <Flex direction="column" align="center" gap={2} mb={3}>
      <SecondaryHeading text="Keep up the good work!" />

      {statisticsContent.map(({ text, value }, index) => (
        <StatisticsUnit key={index} text={text} value={value} />
      ))}
    </Flex>
  );
};

export default Statistics;
