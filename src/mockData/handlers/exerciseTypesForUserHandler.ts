import { Exercise } from "interfaces/exercise.interface";
import { HttpResponse, http } from "msw";

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

export const initialExerciseTypesForUser: Exercise[] = [
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfda",
    name: "Squats",
    equipment: "BARBELL",
    isDefault: true,
    categories: [
      {
        id: "100e8400-e29b-41d4-a716-446655440001",
        name: "Glutes",
        muscleGroup: "LEGS",
      },
      {
        id: "200e8400-c29b-41d4-a716-446655440003",
        name: "Quads",
        muscleGroup: "LEGS",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdb",
    name: "Deadlifts",
    equipment: "BARBELL",
    isDefault: true,
    categories: [
      {
        id: "100e8400-e29b-41d4-a716-446655440001",
        name: "Glutes",
        muscleGroup: "LEGS",
      },
      {
        id: "350e8400-c29b-41d4-a716-446655440006",
        name: "Lower back",
        muscleGroup: "BACK",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdc",
    name: "Standing calf raises",
    equipment: "MACHINE",
    isDefault: true,
    categories: [
      {
        id: "250e8400-c29b-41d4-a716-446655440004",
        name: "Calves",
        muscleGroup: "LEGS",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfde",
    name: "Bench press",
    equipment: "BARBELL",
    isDefault: true,
    categories: [
      {
        id: "300e8400-c29b-41d4-a716-446655440005",
        name: "Chest",
        muscleGroup: "CHEST",
      },
      {
        id: "450e8400-c29b-41d4-a716-446655440008",
        name: "Triceps",
        muscleGroup: "ARMS",
      },
    ],
  },
  {
    id: "20047d9c-a926-499e-9a5f-e9f16690bfde",
    name: "Incline bench press",
    equipment: "BARBELL",
    isDefault: true,
    categories: [
      {
        id: "300e8400-c29b-41d4-a716-446655440005",
        name: "Upper chest",
        muscleGroup: "CHEST",
      },
      {
        id: "450e8400-c29b-41d4-a716-446655440008",
        name: "Triceps",
        muscleGroup: "ARMS",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
    name: "Barbell rows",
    equipment: "BARBELL",
    isDefault: true,
    categories: [
      {
        id: "400e8400-c29b-41d4-a716-446655440007",
        name: "Upper back",
        muscleGroup: "BACK",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdi",
    name: "Pull-downs",
    equipment: "BAR",
    isDefault: true,
    categories: [
      {
        id: "400e8400-c29b-41d4-a716-446655440007",
        name: "Upper back",
        muscleGroup: "BACK",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdj",
    name: "Dumbbell pushes",
    equipment: "DUMBBELLS",
    isDefault: true,
    categories: [
      {
        id: "600e8400-c29b-41d4-a716-446655440010",
        name: "Anterior delts",
        muscleGroup: "SHOULDERS",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdk",
    name: "Dumbbell lateral raises",
    equipment: "DUMBBELLS",
    isDefault: true,
    categories: [
      {
        id: "650e8400-c29b-41d4-a716-446655440010",
        name: "Middle delts",
        muscleGroup: "SHOULDERS",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdl",
    name: "Biceps barbell curls",
    equipment: "BAR",
    isDefault: true,
    categories: [
      {
        id: "500e8400-c29b-41d4-a716-446655440009",
        name: "Biceps",
        muscleGroup: "ARMS",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdll",
    name: "Sit-ups",
    equipment: "BODYWEIGHT",
    isDefault: false,
    categories: [
      {
        id: "500e8400-c29b-41d4-a716-446655440301",
        name: "Abs",
        muscleGroup: "CORE",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdlll",
    name: "Pull-ups",
    equipment: "BAR",
    isDefault: false,
    categories: [
      {
        id: "400e8400-c29b-41d4-a716-446655440007",
        name: "Upper back",
        muscleGroup: "BACK",
      },
      {
        id: "450e8400-c29b-41d4-a716-446655440008",
        name: "Triceps",
        muscleGroup: "ARMS",
      },
    ],
  },
];

export let exerciseTypesForUser = deepClone(initialExerciseTypesForUser);

export const exerciseTypesForUserHandler = [
  http.get("http://localhost:8080/api/user-exercise-types", () => {
    return HttpResponse.json(exerciseTypesForUser);
  }),

  http.put(
    "http://localhost:8080/api/exercise-types/a6647d9c-a926-499e-9a5f-e9f16690bfdk",
    async ({ request }) => {
      const updatedExercise = (await request.json()) as Exercise;

      const index = exerciseTypesForUser.findIndex(
        (ex: Exercise) => ex.id === updatedExercise.id,
      );

      const nameAlreadyTaken = exerciseTypesForUser.some(
        (ex: Exercise) =>
          ex.name === updatedExercise.name && ex.id !== updatedExercise.id,
      );

      if (nameAlreadyTaken) {
        return new HttpResponse("Conflict", {
          status: 409,
          statusText: "An exercise with this name already exists!",
        });
      }

      if (index !== -1) {
        exerciseTypesForUser[index] = {
          ...exerciseTypesForUser[index],
          ...updatedExercise,
        };
        return HttpResponse.json(updatedExercise);
      }
    },
  ),

  http.put(
    "http://localhost:8080/api/exercise-types/a6647d9c-a926-499e-9a5f-e9f16690bfdi",
    async ({ request }) => {
      const updatedExercise = (await request.json()) as Exercise;

      exerciseTypesForUser = [...exerciseTypesForUser, updatedExercise];
      return HttpResponse.json(updatedExercise);
    },
  ),

  http.post("http://localhost:8080/api/exercise-types", async ({ request }) => {
    const newExercise = (await request.json()) as Exercise;

    const nameAlreadyTaken = "Bench press";
    if (newExercise.name === nameAlreadyTaken) {
      return new HttpResponse("Conflict", {
        status: 409,
        statusText: "An exercise with this name already exists!",
      });
    }

    exerciseTypesForUser = [...exerciseTypesForUser, newExercise];
    return HttpResponse.json(newExercise);
  }),
];
