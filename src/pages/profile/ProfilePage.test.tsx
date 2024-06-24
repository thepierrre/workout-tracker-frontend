import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import ProfilePage from "./ProfilePage";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import workoutSessionsReducer from "../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../features/auth/authenticatedUserSlice";
import exercisesReducer from "../../features/exercises/exercisesSlice";
import routinesReducer from "../../features/routines/routinesSlice";
import categoriesReducer from "../../features/exercises/categoriesSlice";
import { mockUser, mockWorkouts } from "../../util/testData";

const store = configureStore({
  reducer: {
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesReducer,
  },
  preloadedState: {
    authenticatedUser: {
      user: mockUser,
      loading: false,
      error: null,
    },
    workoutSessions: {
      workouts: mockWorkouts,
      loading: false,
      error: null,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("ProfilePage", () => {
  test("displays the heading", () => {
    renderWithProviders(<ProfilePage />);
    expect(screen.getByText("Hello, testuser")).toBeInTheDocument();
  });

  test("filter workouts by day", () => {
    renderWithProviders(<ProfilePage />);
    fireEvent.change(screen.getByTestId("day-select"), {
      target: { value: "15" },
    });
    const filteredWorkouts = screen.getAllByTestId("workout-item");
    expect(filteredWorkouts).toHaveLength(1);
  });

  test("filter workouts by month", () => {
    renderWithProviders(<ProfilePage />);
    fireEvent.change(screen.getByTestId("month-select"), {
      target: { value: "March" },
    });
    const filteredWorkouts = screen.getAllByTestId("workout-item");
    expect(filteredWorkouts).toHaveLength(2);
  });

  test("filter workouts by year", () => {
    renderWithProviders(<ProfilePage />);
    fireEvent.change(screen.getByTestId("year-select"), {
      target: { value: "2024" },
    });
    const filteredWorkouts = screen.getAllByTestId("workout-item");
    expect(filteredWorkouts).toHaveLength(3);
  });

  test("logout button triggers logout", async () => {
    renderWithProviders(<ProfilePage />);

    fireEvent.click(screen.getByText("Log out"));

    waitFor(() =>
      expect(screen.getByText("Sign in to your account")).toBeInTheDocument()
    );
  });
});
