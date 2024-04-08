import { NavLink } from "react-router-dom";

import WorkoutExerciseCard from "./WorkoutExerciseCard";

type Series = {
  reps: number;
  weight: number;
};

type Exercise = Series[];

type FormValues = Exercise[];

const Workout = () => {
  return (
    <>
      <NavLink to="/workouts/exercise">
        <WorkoutExerciseCard />
      </NavLink>
    </>
  );
};

export default Workout;
