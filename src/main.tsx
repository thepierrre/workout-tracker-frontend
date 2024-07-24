import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkoutsPage from "./pages/workouts/WorkoutsPage.tsx";
import RoutinesPage from "./pages/routines/RoutinesPage.tsx";
import ExercisesPage from "./pages/exercises/ExercisesPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import LoginPage from "./pages/profile/LoginPage.tsx";
import SingleExercisePage from "./pages/exercises/SingleExercisePage.tsx";
import ExerciseInstancePage from "./pages/workouts/ExerciseInstancePage.tsx";
import SingleRoutinePage from "./pages/routines/SingleRoutinePage.tsx";
import NewExercise from "./pages/exercises/NewExercisePage.tsx";
import NewRoutine from "./pages/routines/NewRoutinePage.tsx";
import RegisterPage from "./pages/profile/RegisterPage.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      { path: "sign-up", element: <RegisterPage /> },
      {
        path: "workouts/*",
        children: [
          {
            path: ":workoutId/exercise-instances/:exerciseInstanceId",
            element: <ExerciseInstancePage />,
          },
          { path: "*", element: <WorkoutsPage /> },
        ],
      },
      {
        path: "routines/*",
        children: [
          { path: ":routineId", element: <SingleRoutinePage /> },
          { path: "new-routine", element: <NewRoutine /> },
          { path: "*", element: <RoutinesPage /> },
        ],
      },
      {
        path: "exercises/*",
        children: [
          {
            path: ":exerciseId",
            element: <SingleExercisePage />,
          },
          { path: "new-exercise", element: <NewExercise /> },
          { path: "*", element: <ExercisesPage /> },
        ],
      },
      {
        path: "profile/*",
        children: [{ path: "*", element: <ProfilePage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ChakraProvider>
      {/* <React.StrictMode> */}
      <RouterProvider router={router} />
      {/* </React.StrictMode> */}
    </ChakraProvider>
  </Provider>
);
