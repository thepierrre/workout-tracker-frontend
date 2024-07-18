// import { User } from "interfaces/user.interface";
import { Routine } from "interfaces/routine.interface";
import { Workout } from "interfaces/workout.interface";
import { Exercise } from "interfaces/exercise.interface";
import { Category } from "interfaces/category.interface";
import { format } from "date-fns";
import { UserSettings } from "interfaces/userSettings.interface";

// export const mockUser: User = {
//   id: "1",
//   username: "testUser",
//   password: "",
//   routines: [],
//   workoutSessions: [],
//   exercises: [],
//   email: "testuser@example.com",
// };

export const mockCategories: Category[] = [
  { id: "1", name: "category1" },
  { id: "2", name: "category2" },
  { id: "3", name: "category3" },
  { id: "4", name: "category4" },
  { id: "5", name: "category5" },
  { id: "6", name: "category6" },
];

export const mockExerciseTypes: Exercise[] = [
  {
    id: "1",
    name: "exercise1",
    categories: [mockCategories[5], mockCategories[1]],
    userId: "1",
  },
  {
    id: "2",
    name: "exercise2",
    categories: [mockCategories[5], mockCategories[1], mockCategories[4]],
    userId: "1",
  },
  {
    id: "3",
    name: "exercise3",
    categories: [mockCategories[6], mockCategories[3], mockCategories[4]],
    userId: "1",
  },
  {
    id: "4",
    name: "exercise4",
    categories: [mockCategories[4], mockCategories[5], mockCategories[6]],
    userId: "1",
  },
  { id: "5", name: "exercise5", categories: [mockCategories[1]], userId: "1" },
];

export const mockRoutines: Routine[] = [
  {
    id: "1",
    name: "routine1",
    exerciseTypes: [],
    userId: "1",
  },
  {
    id: "2",
    name: "routine2",
    exerciseTypes: [mockExerciseTypes[1]],
    userId: "1",
  },
  {
    id: "3",
    name: "routine3",
    exerciseTypes: [mockExerciseTypes[2]],
    userId: "1",
  },
  {
    id: "4",
    name: "routine4",
    exerciseTypes: [mockExerciseTypes[3], mockExerciseTypes[4]],
    userId: "1",
  },
  {
    id: "5",
    name: "routine5",
    exerciseTypes: [mockExerciseTypes[4], mockExerciseTypes[3]],
    userId: "1",
  },
  {
    id: "6",
    name: "routine6",
    exerciseTypes: [mockExerciseTypes[5]],
    userId: "1",
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: "1",
    creationDate: "2024-03-30",
    exerciseInstances: [
      {
        id: "1",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "1", reps: 10, weight: 30 },
          { id: "2", reps: 10, weight: 30 },
          { id: "3", reps: 10, weight: 30 },
        ],
      },
      {
        id: "2",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "4", reps: 10, weight: 30 },
          { id: "5", reps: 10, weight: 30 },
          { id: "6", reps: 10, weight: 30 },
        ],
      },
      {
        id: "3",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "7", reps: 10, weight: 30 },
          { id: "8", reps: 10, weight: 30 },
          { id: "9", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine1",
  },
  {
    id: "2",
    creationDate: "2024-02-25",
    exerciseInstances: [
      {
        id: "4",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "10", reps: 10, weight: 30 },
          { id: "11", reps: 10, weight: 30 },
          { id: "12", reps: 10, weight: 30 },
        ],
      },
      {
        id: "5",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "13", reps: 10, weight: 30 },
          { id: "14", reps: 10, weight: 30 },
          { id: "15", reps: 10, weight: 30 },
        ],
      },
      {
        id: "6",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "16", reps: 10, weight: 30 },
          { id: "17", reps: 10, weight: 30 },
          { id: "18", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine2",
  },
  {
    id: "3",
    creationDate: "2024-03-15",
    exerciseInstances: [
      {
        id: "7",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "19", reps: 10, weight: 30 },
          { id: "20", reps: 10, weight: 30 },
          { id: "21", reps: 10, weight: 30 },
        ],
      },
      {
        id: "8",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "22", reps: 10, weight: 30 },
          { id: "23", reps: 10, weight: 30 },
          { id: "24", reps: 10, weight: 30 },
        ],
      },
      {
        id: "9",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "25", reps: 10, weight: 30 },
          { id: "26", reps: 10, weight: 30 },
          { id: "27", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine3",
  },
  {
    id: "4",
    creationDate: "2023-12-16",
    exerciseInstances: [
      {
        id: "10",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "28", reps: 10, weight: 30 },
          { id: "29", reps: 10, weight: 30 },
          { id: "30", reps: 10, weight: 30 },
        ],
      },
      {
        id: "11",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "31", reps: 10, weight: 30 },
          { id: "32", reps: 10, weight: 30 },
          { id: "33", reps: 10, weight: 30 },
        ],
      },
      {
        id: "12",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "34", reps: 10, weight: 30 },
          { id: "35", reps: 10, weight: 30 },
          { id: "36", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine4",
  },
  {
    id: "5",
    creationDate: format(new Date(), "yyyy-MM-dd"),
    exerciseInstances: [
      {
        id: "13",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "37", reps: 10, weight: 30 },
          { id: "38", reps: 10, weight: 30 },
          { id: "39", reps: 10, weight: 30 },
        ],
      },
      {
        id: "14",
        exerciseTypeName: "exercise2",
        workingSets: [
          { id: "40", reps: 10, weight: 30 },
          { id: "41", reps: 10, weight: 30 },
          { id: "42", reps: 10, weight: 30 },
        ],
      },
      {
        id: "15",
        exerciseTypeName: "exercise3",
        workingSets: [
          { id: "43", reps: 10, weight: 30 },
          { id: "44", reps: 10, weight: 30 },
          { id: "45", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine1",
  },
  {
    id: "6",
    creationDate: format(new Date(), "yyyy-MM-dd"),
    exerciseInstances: [
      {
        id: "16",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "46", reps: 10, weight: 30 },
          { id: "47", reps: 10, weight: 30 },
          { id: "48", reps: 10, weight: 30 },
        ],
      },
      {
        id: "17",
        exerciseTypeName: "exercise2",
        workingSets: [
          { id: "49", reps: 10, weight: 30 },
          { id: "50", reps: 10, weight: 30 },
          { id: "51", reps: 10, weight: 30 },
        ],
      },
      {
        id: "18",
        exerciseTypeName: "exercise3",
        workingSets: [
          { id: "52", reps: 10, weight: 30 },
          { id: "53", reps: 10, weight: 30 },
          { id: "54", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine2",
  },
  {
    id: "7",
    creationDate: format(new Date(), "yyyy-MM-dd"),
    exerciseInstances: [
      {
        id: "19",
        exerciseTypeName: "exercise1",
        workingSets: [
          { id: "55", reps: 10, weight: 30 },
          { id: "56", reps: 10, weight: 30 },
          { id: "57", reps: 10, weight: 30 },
        ],
      },
      {
        id: "20",
        exerciseTypeName: "exercise2",
        workingSets: [
          { id: "58", reps: 10, weight: 30 },
          { id: "59", reps: 10, weight: 30 },
          { id: "60", reps: 10, weight: 30 },
        ],
      },
      {
        id: "21",
        exerciseTypeName: "exercise3",
        workingSets: [
          { id: "61", reps: 10, weight: 30 },
          { id: "62", reps: 10, weight: 30 },
          { id: "63", reps: 10, weight: 30 },
        ],
      },
      {
        id: "22",
        exerciseTypeName: "exercise4",
        workingSets: [
          { id: "64", reps: 10, weight: 30 },
          { id: "65", reps: 10, weight: 30 },
          { id: "66", reps: 10, weight: 30 },
        ],
      },
      {
        id: "23",
        exerciseTypeName: "exercise5",
        workingSets: [
          { id: "67", reps: 10, weight: 30 },
          { id: "68", reps: 10, weight: 30 },
          { id: "69", reps: 10, weight: 30 },
        ],
      },
      {
        id: "24",
        exerciseTypeName: "exercise6",
        workingSets: [
          { id: "70", reps: 10, weight: 30 },
          { id: "71", reps: 10, weight: 30 },
          { id: "72", reps: 10, weight: 30 },
        ],
      },
    ],
    routineName: "routine3",
  },
];

export const mockUserSettings: UserSettings = {
  changeThreshold: 1,
  weightUnit: "kgs",
};
