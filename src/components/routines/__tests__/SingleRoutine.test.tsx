import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { routinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import SingleRoutine from "../SingleRoutine";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ChakraProvider>,
  );
};

describe("SingleRoutine", () => {
  test("renders a single routine", async () => {
    renderWithProviders(<SingleRoutine routine={routinesForUser[0]} />);

    expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
    expect(screen.getByText("4 EXERCISES")).toBeInTheDocument();
    expect(
      screen.getByText("Bench press | Barbell rows | Squats | Dumbbell pushes"),
    ).toBeInTheDocument();
  });
});
