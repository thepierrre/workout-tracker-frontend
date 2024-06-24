import { User } from "interfaces/user.interface";
import { Workout } from "interfaces/workout.interface";

export const mockUser: User = {
  id: "1",
  username: "testuser",
  password: "abc",
  routines: [],
  workoutSessions: [],
  exercises: [],
  email: "test@example.com",
};

export const mockWorkouts: Workout[] = [
  {
    id: "1",
    creationDate: "2024-03-30",
    exerciseInstances: [],
    routineName: "routine1",
  },
  {
    id: "2",
    creationDate: "2024-02-25",
    exerciseInstances: [],
    routineName: "routine1",
  },
  {
    id: "3",
    creationDate: "2024-03-15",
    exerciseInstances: [],
    routineName: "routine1",
  },
  {
    id: "4",
    creationDate: "2023-12-16",
    exerciseInstances: [],
    routineName: "routine1",
  },
];
