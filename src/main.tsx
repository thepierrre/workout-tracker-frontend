import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkoutsPage from "./components/Workouts/WorkoutsPage.tsx";
import RoutinesPage from "./components/Routines/RoutinesPage.tsx";
import ExercisesPage from "./components/Exercises/ExercisesPage.tsx";
import ProfilePage from "./components/Profile/ProfilePage.tsx";
import SingleExercisePage from "./components/Workouts/SingleExercisePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "workouts/*",
        children: [
          { path: "exercise", element: <SingleExercisePage /> },
          { path: "*", element: <WorkoutsPage /> },
        ],
      },
      { path: "routines", element: <RoutinesPage /> },
      { path: "exercises", element: <ExercisesPage /> },
      { path: "profile", element: <ProfilePage /> },
      // { path: "/workouts/exercise", element: <SingleExercisePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
);
