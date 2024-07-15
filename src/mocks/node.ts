import { setupServer } from "msw/node";
import { getCategoriesHandler } from "./getHandlers/getCategoriesHandler.ts";
import { getUserExerciseTypesHandler } from "./getHandlers/getUserExerciseTypesHandler.ts";

export const server = setupServer(
  ...getCategoriesHandler,
  ...getUserExerciseTypesHandler
);
