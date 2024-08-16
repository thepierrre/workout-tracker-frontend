import { format } from "date-fns";
import { HttpResponse, http } from "msw";

import { User } from "../../interfaces/user.interface";

export const initializedUser: User = {
  id: "12345",
  username: "testUser",
  password: "",
  routines: [],
  workoutSessions: [],
  exercises: [],
  email: "testuser@example.com",
};

export const fetchedUser = {
  username: "testUser",
  id: "12345",
  email: "testuser@example.com",
  routines: [
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
  ],
  workouts: [
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
  ],
  exerciseTypes: [
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
  ],
};

export const userHandler = [
  http.get("http://localhost:8080/api/users/me", () => {
    return HttpResponse.json(initializedUser);
  }),
];
