import { format } from "date-fns";
import { ExerciseInstance } from "interfaces/exerciseInstance.interface";
import { HttpResponse, http } from "msw";

import { Workout } from "../../interfaces/workout.interface";

const deepClone = (obj: Workout[]) => JSON.parse(JSON.stringify(obj));

// immutable, for each test to start
const initialWorkoutsForUser: Workout[] = [
  {
    id: "05fa8b17-08ee-41f1-b80e-5112c98c2c3e",
    creationDate: format(new Date(), "yyyy-MM-dd"),
    exerciseInstances: [
      {
        id: "3521346b-168d-4d05-8294-8db264bf54cc",
        exerciseTypeName: "Bench press",
        workingSets: [
          {
            id: "0c518544-89a2-4155-8968-1c78ec48bb2e",
            reps: 10,
            weight: 50.0,
            creationTimedate: "2024-07-15T20:30:38.647",
          },
          {
            id: "d1e91922-5e8a-4d14-a272-a4cba57581aa",
            reps: 10,
            weight: 50.0,
            creationTimedate: "2024-07-15T20:30:38.647",
          },
          {
            id: "491f8480-fd46-454a-82bc-6e7050d87ad8",
            reps: 9,
            weight: 50.0,
            creationTimedate: "2024-07-15T20:30:38.647",
          },
          {
            id: "501f8480-fd46-454a-82bc-6e7050d87ad8",
            reps: 9,
            weight: 50.0,
            creationTimedate: "2024-07-15T20:30:38.647",
          },
        ],
      },
      {
        id: "5fe33ee8-fcf2-49b5-b247-ff4a7aeda4b5b",
        exerciseTypeName: "Barbell rows",
        workingSets: [
          {
            id: "e0ab7b4f-3eef-4ecb-ac84-6b7a871f693d",
            reps: 12,
            weight: 25.0,
            creationTimedate: "2024-07-15T20:30:38.648",
          },
          {
            id: "ba224718-06c0-4955-8fa9-5c99e17ec5f3",
            reps: 12,
            weight: 30.0,
            creationTimedate: "2024-07-15T20:30:38.648",
          },
          {
            id: "4bb1b800-7501-4452-a379-bf9d845b9b9e",
            reps: 10,
            weight: 30.0,
            creationTimedate: "2024-07-15T20:30:38.649",
          },
        ],
      },
      {
        id: "5fe33ee8-fcf2-49b5-b247-b4fdfdD7aeda4b5b",
        exerciseTypeName: "Squats",
        workingSets: [
          {
            id: "e0ab7b4f-3eef-4ecb-ac84-6b7a871f693d",
            reps: 11,
            weight: 60.0,
            creationTimedate: "2024-07-15T20:30:38.648",
          },
          {
            id: "ba224718-06c0-4955-8fa9-5c99e17ec5f3",
            reps: 11,
            weight: 60.0,
            creationTimedate: "2024-07-15T20:30:38.648",
          },
          {
            id: "4bb1b800-7501-4452-a379-bf9d845b9b9e",
            reps: 11,
            weight: 60.0,
            creationTimedate: "2024-07-15T20:30:38.649",
          },
        ],
      },
      {
        id: "5fe33aaae8-fcf2-49b5-b247-b4a7aeda4b5b",
        exerciseTypeName: "Dumbbell pushes",
        workingSets: [
          {
            id: "e0ab7b4f-3eef-4ecb-ac84-6b7a871f693d",
            reps: 13,
            weight: 15.0,
            creationTimedate: "2024-07-15T20:30:38.648",
          },
          {
            id: "ba224718-06c0-4955-8fa9-5c99e17ec5f3",
            reps: 13,
            weight: 15.0,
            creationTimedate: "2024-07-15T20:30:38.648",
          },
          {
            id: "4bb1b800-7501-4452-a379-bf9d845b9b9e",
            reps: 10,
            weight: 15.0,
            creationTimedate: "2024-07-15T20:30:38.649",
          },
        ],
      },
    ],
    routineName: "Full Body Workout A",
  },
];

// mutable list, reset before each test
export let workoutsForUser = deepClone(initialWorkoutsForUser);

const newWorkoutExercises: ExerciseInstance[] = [
  {
    id: "3521346b-168d-4d05-8294-8db264bf54cc",
    exerciseTypeName: "Incline bench press",
    workingSets: [
      {
        id: "0c518544-89a2-4155-8968-1c78ecdfae4ff",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.647",
      },
      {
        id: "d1e91922-5e8a-4d14-a272-a4cba57581aa",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.647",
      },
      {
        id: "491f8480-fd46-454a-82bc-6e7050d87ad8",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.647",
      },
    ],
  },
  {
    id: "3521346b-168d-4d05-4-8db264bf54cc",
    exerciseTypeName: "Pull-downs",
    workingSets: [
      {
        id: "0c518544-89a2-4155-8968-1c78ecdfae4ff",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.648",
      },
      {
        id: "d1e91922-5e8a-4d14-a272-a4cba57581aa",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.649",
      },
      {
        id: "491f8480-fd46-454a-82bc-6e7050d87ad8",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.655",
      },
    ],
  },
  {
    id: "3521346b-168d-4d05-4-8db26d4bf54cc",
    exerciseTypeName: "Deadlifts",
    workingSets: [
      {
        id: "0c518544-89a2-4155-8968-1c78ecdfae4ff",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.648",
      },
      {
        id: "d1e91922-5e8a-4d14-a272-a4cba57581aa",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.649",
      },
      {
        id: "491f8480-fd46-454a-82bc-6e7050d87ad8",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.655",
      },
    ],
  },
  {
    id: "3521346b-168d-4d05-4-8db26fff4bf54cc",
    exerciseTypeName: "Dumbbell lateral raises",
    workingSets: [
      {
        id: "0c518544-89a2-4155-8968-1c78ecdfae4ff",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.648",
      },
      {
        id: "d1e91922-5e8a-4d14-a272-a4cba57581aa",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.649",
      },
      {
        id: "491f8480-fd46-454a-82bc-6e7050d87ad8",
        reps: 10,
        weight: 30,
        creationTimedate: "2024-07-15T20:30:38.655",
      },
    ],
  },
];

export const workoutsForUserHandler = [
  http.get("http://localhost:8080/api/user-workouts", () => {
    return HttpResponse.json([...workoutsForUser]);
  }),

  http.post("http://localhost:8080/api/workouts", async ({ request }) => {
    const newWorkout = (await request.json()) as Workout;
    newWorkout.exerciseInstances = newWorkoutExercises.map((exercise) => ({
      ...exercise,
    }));
    newWorkout.id = "05f000017-08ee-41f1-b80e-5112c98c43";
    workoutsForUser = [...workoutsForUser, newWorkout];
    return HttpResponse.json(newWorkout);
  }),

  http.post("http://localhost:8080/api/workouts", async ({ request }) => {
    const newWorkout = (await request.json()) as Workout;
    newWorkout.exerciseInstances = newWorkoutExercises.map((exercise) => ({
      ...exercise,
    }));
    newWorkout.id = "05f000017-08ee-41f1-b80e-5112c98c43";
    workoutsForUser = [...workoutsForUser, newWorkout];
    return HttpResponse.json(newWorkout);
  }),

  http.delete(
    "http://localhost:8080/api/workouts/05fa8b17-08ee-41f1-b80e-5112c98c2c3e",
    async () => {
      workoutsForUser = [
        ...workoutsForUser.filter(
          (workout: Workout) =>
            workout.id !== "05fa8b17-08ee-41f1-b80e-5112c98c2c3e",
        ),
      ];

      return new HttpResponse(null, { status: 204 });
    },
  ),
];
