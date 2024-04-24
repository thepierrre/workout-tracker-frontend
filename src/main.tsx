import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkoutsPage from "./pages/WorkoutsPage.tsx";
import RoutinesPage from "./pages/RoutinesPage.tsx";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SingleExercisePage from "./components/workouts/ExerciseInstancePage.tsx";
import ExerciseInstancePage from "./components/workouts/ExerciseInstancePage.tsx";
import SingleRoutinePage from "./components/routines/SingleRoutinePage.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
          { path: "*", element: <RoutinesPage /> },
        ],
      },
      {
        path: "exercises/*",
        children: [
          {
            path: "exercise",
            element: <SingleExercisePage />,
          },
          { path: "*", element: <ExercisesPage /> },
        ],
      },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ChakraProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ChakraProvider>
  </Provider>
);
