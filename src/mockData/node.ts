import { setupServer } from "msw/node";
import { getCategoriesHandler } from "./getHandlers/getCategoriesHandler.ts";
import { getExerciseTypesForUserHandler } from "./getHandlers/getExerciseTypesForUserHandler.ts";
import { getRoutinesForUserHandler } from "./getHandlers/getRoutinesForUserHandler.ts";
import { getUserSettingsHandler } from "./getHandlers/getUserSettingsHandler.ts";
import { getWorkoutsForUserHandler } from "./getHandlers/getWorkoutsForUserHandler.ts";

export const server = setupServer(
  ...getCategoriesHandler,
  ...getExerciseTypesForUserHandler,
  ...getRoutinesForUserHandler,
  ...getUserSettingsHandler,
  ...getWorkoutsForUserHandler
);
