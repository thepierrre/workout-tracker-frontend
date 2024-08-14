import { HttpResponse, http } from "msw";

import { Routine } from "../../interfaces/routine.interface";
import { baseURL } from "../../mockData/node";

const deepClone = (obj: Routine[]) => JSON.parse(JSON.stringify(obj));

const initialRoutinesForUser: Routine[] = [
  {
    userId: "12345",
    id: "916ee32a-728f-4eea-a3g6-d0e097b22b21",
    name: "Full Body Workout A",
    routineExercises: [
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
    ],
  },
  {
    userId: "12345",
    id: "916ee32a-728f-4ood-a3g6-d0e097b22c54",
    name: "Full Body Workout B",
    routineExercises: [
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
    ],
  },
];

export let routinesForUser = deepClone(initialRoutinesForUser);

export const routinesForUserHandler = [
  http.get("http://localhost:8080/api/user-routines", () => {
    return HttpResponse.json(routinesForUser);
  }),

  http.post("http://localhost:8080/api/routines", async ({ request }) => {
    const newRoutine = (await request.json()) as Routine;

    newRoutine.id = "05f000xyzxyz017-08ee-41f1-b80e-5112c98c43";
    routinesForUser = [...routinesForUser, newRoutine];
    return HttpResponse.json(newRoutine);
  }),
];
