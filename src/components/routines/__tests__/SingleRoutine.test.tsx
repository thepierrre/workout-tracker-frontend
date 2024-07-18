import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import SingleRoutine from "../SingleRoutine";
import "@testing-library/jest-dom";
import { routinesForUser } from "../../../mockData/handlers/routinesForUserHandler";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ChakraProvider>
  );
};

describe("SingleRoutine", () => {
  test("renders a single routine", async () => {
    renderWithProviders(<SingleRoutine routine={routinesForUser[0]} />);

    expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
    expect(screen.getByText("4 EXERCISES")).toBeInTheDocument();
    expect(
      screen.getByText("bench press | barbell rows | squats | dumbbell pushes")
    ).toBeInTheDocument();
  });
});
