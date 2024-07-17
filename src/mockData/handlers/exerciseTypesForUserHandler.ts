import { Exercise } from "interfaces/exercise.interface";
import { http, HttpResponse } from "msw";

export let exerciseTypesForUser: Exercise[] = [
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfda",
    name: "squats",
    categories: [
      {
        id: "100e8400-e29b-41d4-a716-446655440001",
        name: "glutes",
      },
      {
        id: "200e8400-c29b-41d4-a716-446655440003",
        name: "quadriceps",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdb",
    name: "deadlifts",
    categories: [
      {
        id: "100e8400-e29b-41d4-a716-446655440001",
        name: "glutes",
      },
      {
        id: "350e8400-c29b-41d4-a716-446655440006",
        name: "lower back",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdc",
    name: "standing calf raises",
    categories: [
      {
        id: "250e8400-c29b-41d4-a716-446655440004",
        name: "calves",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfde",
    name: "bench press",
    categories: [
      {
        id: "300e8400-c29b-41d4-a716-446655440005",
        name: "chest",
      },
      {
        id: "450e8400-c29b-41d4-a716-446655440008",
        name: "triceps",
      },
    ],
  },
  {
    id: "20047d9c-a926-499e-9a5f-e9f16690bfde",
    name: "incline bench press",
    categories: [
      {
        id: "300e8400-c29b-41d4-a716-446655440005",
        name: "chest",
      },
      {
        id: "450e8400-c29b-41d4-a716-446655440008",
        name: "triceps",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
    name: "barbell rows",
    categories: [
      {
        id: "400e8400-c29b-41d4-a716-446655440007",
        name: "upper back",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdi",
    name: "pull-downs",
    categories: [
      {
        id: "400e8400-c29b-41d4-a716-446655440007",
        name: "upper back",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdj",
    name: "dumbbell pushes",
    categories: [
      {
        id: "600e8400-c29b-41d4-a716-446655440010",
        name: "front deltoids",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdk",
    name: "dumbbell lateral raises",
    categories: [
      {
        id: "650e8400-c29b-41d4-a716-446655440010",
        name: "middle deltoids",
      },
    ],
  },
  {
    id: "a6647d9c-a926-499e-9a5f-e9f16690bfdl",
    name: "biceps barbell curls",
    categories: [
      {
        id: "500e8400-c29b-41d4-a716-446655440009",
        name: "biceps",
      },
    ],
  },
];

export const exerciseTypesForUserHandler = [
  http.get("http://localhost:8080/api/user-exercise-types", () => {
    return HttpResponse.json(exerciseTypesForUser);
  }),

  http.put(
    "http://localhost:8080/api/exercise-types/a6647d9c-a926-499e-9a5f-e9f16690bfdk",
    async ({ request }) => {
      const updatedExercise = (await request.json()) as Exercise;

      const index = exerciseTypesForUser.findIndex(
        (ex) => ex.id === updatedExercise.id
      );

      const nameAlreadyTaken = exerciseTypesForUser.some(
        (ex) => ex.name === updatedExercise.name && ex.id !== updatedExercise.id
      );

      if (nameAlreadyTaken) {
        return new HttpResponse("Conflict", {
          status: 409,
          statusText: "An exercise with this name already exists!",
        });
      }

      if (index !== -1) {
        console.log("Updated exercise", updatedExercise);
        exerciseTypesForUser[index] = {
          ...exerciseTypesForUser[index],
          ...updatedExercise,
        };
        return HttpResponse.json(updatedExercise);
      }
    }
  ),

  http.put(
    "http://localhost:8080/api/exercise-types/a6647d9c-a926-499e-9a5f-e9f16690bfdi",
    async ({ request }) => {
      const updatedExercise = (await request.json()) as Exercise;

      exerciseTypesForUser = [...exerciseTypesForUser, updatedExercise];
      return HttpResponse.json(updatedExercise);
    }
  ),

  http.post("http://localhost:8080/api/exercise-types", async ({ request }) => {
    const newExercise = (await request.json()) as Exercise;

    const nameAlreadyTaken = "bench press";
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
