import { setupServer } from "msw/node";
import { getCategoriesHandler } from "./handlers/categoriesHandler.ts";
import { getExerciseTypesForUserHandler } from "./handlers/exerciseTypesForUserHandler.ts";
import { getRoutinesForUserHandler } from "./handlers/routinesForUserHandler.ts";
import { getUserSettingsHandler } from "./handlers/userSettingsHandler.ts";
import { getWorkoutsForUserHandler } from "./handlers/workoutsForUserHandler.ts";

export const server = setupServer(
  ...getCategoriesHandler,
  ...getExerciseTypesForUserHandler,
  ...getRoutinesForUserHandler,
  ...getUserSettingsHandler,
  ...getWorkoutsForUserHandler
);
