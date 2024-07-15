import { http, HttpResponse } from "msw";

export const getCategoriesHandler = [
  http.get("localhost:8080/api/categories", () => {
    return HttpResponse.json([
      {
        id: "100e8400-e29b-41d4-a716-446655440001",
        name: "glutes",
      },
      {
        id: "150e8400-c29b-41d4-a716-446655440002",
        name: "hamstrings",
      },
      {
        id: "200e8400-c29b-41d4-a716-446655440003",
        name: "quadriceps",
      },
      {
        id: "250e8400-c29b-41d4-a716-446655440004",
        name: "calves",
      },
      {
        id: "300e8400-c29b-41d4-a716-446655440005",
        name: "chest",
      },
      {
        id: "350e8400-c29b-41d4-a716-446655440006",
        name: "lower back",
      },
      {
        id: "400e8400-c29b-41d4-a716-446655440007",
        name: "upper back",
      },
      {
        id: "450e8400-c29b-41d4-a716-446655440008",
        name: "triceps",
      },
      {
        id: "500e8400-c29b-41d4-a716-446655440009",
        name: "biceps",
      },
      {
        id: "550e8400-c29b-41d4-a716-446655440010",
        name: "abs",
      },
      {
        id: "600e8400-c29b-41d4-a716-446655440010",
        name: "front deltoids",
      },
      {
        id: "650e8400-c29b-41d4-a716-446655440010",
        name: "middle deltoids",
      },
    ]);
  }),
];
