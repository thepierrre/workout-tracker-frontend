import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewExercisePage from "./NewExercisePage";
import { configureStore } from "@reduxjs/toolkit";
import workoutSessionsReducer from "../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../features/auth/authenticatedUserSlice";
import exercisesReducer from "../../features/exercises/exercisesSlice";
import routinesReducer from "../../features/routines/routinesSlice";
import categoriesReducer from "../../features/exercises/categoriesSlice";
import { mockUser, mockCategories } from "../../util/testData";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

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
    categories: {
      categories: mockCategories,
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

describe("NewExercisePage", () => {
  test("renders the heading, inputs and categories correctly", () => {
    renderWithProviders(<NewExercisePage />);

    expect(screen.getByText("Add a new exercise")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Exercise name")).toBeInTheDocument();
    expect(screen.getAllByText("Category1")).toHaveLength(1);
    expect(
      screen.getByPlaceholderText("Filter categories")
    ).toBeInTheDocument();
    mockCategories.forEach((category) => {
      expect(
        screen.getByText(
          category.name.charAt(0).toLocaleUpperCase() + category.name.slice(1)
        )
      ).toBeInTheDocument();
    });
  });

  test("adds a new exercise with categories and renders the exercises page when 'Create' is clicked", () => {
    renderWithProviders(<NewExercisePage />);

    fireEvent.change(screen.getByPlaceholderText("Exercise name"), {
      target: { value: "Newly created" },
    });
    expect(screen.getByDisplayValue("Newly created")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Filter categories"), {
      target: { value: "category1" },
    });
    expect(screen.getByText("Category1")).toBeInTheDocument();
    expect(screen.queryByText("Category2")).toBeNull();
    expect(screen.queryByText("Category3")).toBeNull();
    expect(screen.queryByText("Category4")).toBeNull();
    expect(screen.queryByText("Category5")).toBeNull();
    expect(screen.queryByText("Category6")).toBeNull();

    fireEvent.click(screen.getByText("Create"));
    waitFor(() => expect(screen.getByText("New exercise")).toBeInTheDocument());
    waitFor(() =>
      expect(screen.getByText("Newly created")).toBeInTheDocument()
    );
    waitFor(() => expect(screen.getAllByText("Category1")).toHaveLength(2));
  });
});
