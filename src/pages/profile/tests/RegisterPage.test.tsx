import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { routinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { userSettings } from "../../../mockData/handlers/userSettingsHandler";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import authenticatedUserReducer from "../../../store/auth/authenticatedUserSlice";
import categoriesReducer from "../../../store/exercises/categoriesSlice";
import exercisesReducer from "../../../store/exercises/exercisesSlice";
import routinesReducer from "../../../store/routines/routinesSlice";
import userSettingsReducer from "../../../store/settings/userSettingsSlice";
import activeExerciseInstanceReducer from "../../../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../../../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../../../store/workout/workoutSessionsSlice";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";

const store = configureStore({
  reducer: {
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesReducer,
    userSettings: userSettingsReducer,
  },
  preloadedState: {
    authenticatedUser: {
      user: initializedUser,
      loading: false,
      error: null,
    },
    workoutSessions: {
      workouts: workoutsForUser,
      loading: false,
      error: null,
    },
    routines: {
      routines: routinesForUser,
      loading: false,
      error: null,
    },
    exercises: {
      exercises: exerciseTypesForUser,
      loading: false,
      error: null,
    },
    userSettings: {
      userSettings: userSettings,
      loading: false,
      error: null,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/sign-up"]}>
          <Routes>
            <Route path="/sign-up" element={ui} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("RegisterPage", () => {
  test("renders the registration page", async () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByText("Hello there!")).toBeInTheDocument();
    expect(screen.getByText("Time for the gym?")).toBeInTheDocument();
    expect(
      screen.getByText("Log in or create an account and start your workout!"),
    ).toBeInTheDocument();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByText("Already a member?")).toBeInTheDocument();
    expect(screen.getByText("Sign in!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
  });

  test("renders the login page when the link to log in is clicked", async () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByText("Already a member?")).toBeInTheDocument();
    expect(screen.getByText("Sign in!")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Sign in!"));
    await waitFor(() => {
      expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    });
  });

  test("renders errors when the registration button is clicked with empty input values", async () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Create account"));
    await waitFor(() => {
      expect(screen.getByText("Enter a username.")).toBeInTheDocument();
      expect(screen.getByText("Enter an email.")).toBeInTheDocument();
      expect(screen.getByText("Enter a password.")).toBeInTheDocument();
    });
  });

  test("renders errors when the email is invalid and the password is too short", async () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "newUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalid" },
    });

    fireEvent.click(screen.getByText("Create account"));
    await waitFor(() => {
      expect(screen.getByText("Enter a valid email.")).toBeInTheDocument();
      expect(
        screen.getByText("Enter a password with at least 8 characters."),
      ).toBeInTheDocument();
    });
  });
});
