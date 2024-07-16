import { Exercise } from "interfaces/exercise.interface";
import { rest } from "msw";

export const exerciseTypesForUser: Exercise[] = [
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

export const getExerciseTypesForUserHandler = [
  rest.get("http://localhost:8080/api/users/me", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(exerciseTypesForUser));
  }),
];
