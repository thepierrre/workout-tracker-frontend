import { HttpResponse, http } from "msw";

import { Category } from "../../interfaces/category.interface";

export const categories: Category[] = [
  {
    id: "100e8400-e29b-41d4-a716-446655440001",
    name: "Glutes",
    muscleGroup: "LEGS",
  },
  {
    id: "150e8400-c29b-41d4-a716-446655440002",
    name: "Hamstrings",
    muscleGroup: "LEGS",
  },
  {
    id: "200e8400-c29b-41d4-a716-446655440003",
    name: "Quads",
    muscleGroup: "LEGS",
  },
  {
    id: "250e8400-c29b-41d4-a716-446655440004",
    name: "Calves",
    muscleGroup: "LEGS",
  },
  {
    id: "300e8400-c29b-41d4-a716-446655440005",
    name: "Chest",
    muscleGroup: "CHEST",
  },
  {
    id: "350e8400-c29b-41d4-a716-446655440006",
    name: "Lower back",
    muscleGroup: "BACK",
  },
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
  {
    id: "500e8400-c29b-41d4-a716-446655440009",
    name: "Biceps",
    muscleGroup: "ARMS",
  },
  {
    id: "550e8400-c29b-41d4-a716-446655440010",
    name: "Abs",
    muscleGroup: "CORE",
  },
  {
    id: "600e8400-c29b-41d4-a716-446655440010",
    name: "Anterior delts",
    muscleGroup: "SHOULDERS",
  },
  {
    id: "650e8400-c29b-41d4-a716-446655440010",
    name: "Middle delts",
    muscleGroup: "SHOULDERS",
  },
  {
    id: "100e8400-c29c-41d4-a716-446655440010",
    name: "Test category",
    muscleGroup: "BACK",
  },
];

export const categoriesHandler = [
  http.get("http://localhost:8080/api/categories", () => {
    return HttpResponse.json(categories);
  }),
];
