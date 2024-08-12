import { HttpResponse, http } from "msw";

import { Category } from "../../interfaces/category.interface";
import { baseURL } from "../../mockData/node";

export const categories: Category[] = [
  {
    id: "100e8400-e29b-41d4-a716-446655440001",
    name: "Glutes",
    muscleGroup: "Legs",
  },
  {
    id: "150e8400-c29b-41d4-a716-446655440002",
    name: "Hamstrings",
    muscleGroup: "Legs",
  },
  {
    id: "200e8400-c29b-41d4-a716-446655440003",
    name: "Quads",
    muscleGroup: "Legs",
  },
  {
    id: "250e8400-c29b-41d4-a716-446655440004",
    name: "Calves",
    muscleGroup: "Legs",
  },
  {
    id: "300e8400-c29b-41d4-a716-446655440005",
    name: "Chest",
    muscleGroup: "Chest",
  },
  {
    id: "350e8400-c29b-41d4-a716-446655440006",
    name: "Lower back",
    muscleGroup: "Back",
  },
  {
    id: "400e8400-c29b-41d4-a716-446655440007",
    name: "Upper back",
    muscleGroup: "Back",
  },
  {
    id: "450e8400-c29b-41d4-a716-446655440008",
    name: "Triceps",
    muscleGroup: "Arms",
  },
  {
    id: "500e8400-c29b-41d4-a716-446655440009",
    name: "Biceps",
    muscleGroup: "Arms",
  },
  {
    id: "550e8400-c29b-41d4-a716-446655440010",
    name: "Abs",
    muscleGroup: "Core",
  },
  {
    id: "600e8400-c29b-41d4-a716-446655440010",
    name: "Anterior delts",
    muscleGroup: "Shoulders",
  },
  {
    id: "650e8400-c29b-41d4-a716-446655440010",
    name: "Middle delts",
    muscleGroup: "Shoulders",
  },
  {
    id: "100e8400-c29c-41d4-a716-446655440010",
    name: "Test category",
    muscleGroup: "Back",
  },
];

export const categoriesHandler = [
  http.get(`${baseURL}categories`, () => {
    return HttpResponse.json(categories);
  }),
];
