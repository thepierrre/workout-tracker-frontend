import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Workout } from "../../../interfaces/workout.interface";
import { convertKgsToLbs, roundKgs } from "../../../util/weightUnitConverting";
import SecondaryHeading from "../../UI/text/SecondaryHeading";
import StatisticsUnit from "./StatisticsUnit";

interface Props {
  workouts: Workout[];
  weightUnit: string;
}

const Statistics: React.FC<Props> = ({ workouts, weightUnit }) => {
  const [totalWeightRaised, setTotalWeightRaised] = useState<
    number | undefined
  >(undefined);
  const [maxSingleWeightRaised, setMaxSingleWeightRaised] = useState<
    number | undefined
  >(undefined);
  const [totalRepsDone, setTotalRepsDone] = useState<number | undefined>(
    undefined,
  );
  const [maxRepsInSingleSet, setMaxRepsInSingleSet] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    calculateTotalWeightRaised();
    calculateMaxSingleWeightRaised();
    calculateTotalRepsDone();
    calculateMaxRepsInSingleSet();
  }, [workouts]);

  const calculateTotalWeightRaised = () => {
    const weightsFromAllSets: number[] = [];
    workouts.map((wrk) =>
      wrk.exerciseInstances.map((ex) =>
        ex.workingSets.map((wrkSet) => weightsFromAllSets.push(wrkSet.weight)),
      ),
    );
    const sum = weightsFromAllSets.reduce((partialSum, a) => partialSum + a, 0);
    setTotalWeightRaised(sum);
  };

  const calculateMaxSingleWeightRaised = () => {
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

    setMaxSingleWeightRaised(maxValue);
  };

  const calculateTotalRepsDone = () => {
    const repsFromAllSets: number[] = [];
    workouts.map((wrk) =>
      wrk.exerciseInstances.map((ex) =>
        ex.workingSets.map((wrkSet) => repsFromAllSets.push(wrkSet.reps)),
      ),
    );
    const sum = repsFromAllSets.reduce((partialSum, a) => partialSum + a, 0);
    setTotalRepsDone(sum);
  };

  const calculateMaxRepsInSingleSet = () => {
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

    setMaxRepsInSingleSet(maxValue);
  };

  const totalWeight = totalWeightRaised
    ? weightUnit === "kgs"
      ? `${roundKgs(totalWeightRaised)} kgs`
      : `${convertKgsToLbs(totalWeightRaised)} lbs`
    : undefined;

  const highestSingleWeight = maxSingleWeightRaised
    ? weightUnit === "kgs"
      ? `${roundKgs(maxSingleWeightRaised)} kgs`
      : `${convertKgsToLbs(maxSingleWeightRaised)} lbs`
    : undefined;

  const statisticsContent = [
    { text: "Total workouts:", value: workouts.length },
    { text: "Total reps:", value: totalRepsDone },
    { text: "Maximum reps in a set:", value: maxRepsInSingleSet },
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
