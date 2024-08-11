import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./app/App.tsx";
import { store } from "./app/store.ts";
import ExercisesPage from "./pages/exercises/ExercisesPage.tsx";
import NewExercisePage from "./pages/exercises/NewExercisePage.tsx";
import SingleExercisePage from "./pages/exercises/SingleExercisePage.tsx";
import LoginPage from "./pages/profile/LoginPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import RegisterPage from "./pages/profile/RegisterPage.tsx";
import EditExerciseForRoutinePage from "./pages/routines/EditExerciseForRoutinePage.tsx";
import NewRoutinePage from "./pages/routines/NewRoutinePage.tsx";
import RoutinesPage from "./pages/routines/RoutinesPage.tsx";
import SingleRoutinePage from "./pages/routines/SingleRoutinePage.tsx";
import ExerciseInstancePage from "./pages/workouts/ExerciseInstancePage.tsx";
import WorkoutsPage from "./pages/workouts/WorkoutsPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LoginPage />} />
      <Route path="sign-up" element={<RegisterPage />} />

      <Route path="workouts/*">
        <Route
          path=":workoutId/exercise-instances/:exerciseInstanceId"
          element={<ExerciseInstancePage />}
        />
        <Route path="*" element={<WorkoutsPage />} />
      </Route>

      <Route path="routines/*">
        <Route path=":routineId" element={<SingleRoutinePage />} />
        <Route path="new-routine/*">
          <Route
            path="edit-exercise/:exerciseName"
            element={<EditExerciseForRoutinePage />}
          />
          <Route path="*" element={<NewRoutinePage />} />
        </Route>
        <Route path="*" element={<RoutinesPage />} />
      </Route>

      <Route path="exercises/*">
        <Route path=":exerciseId" element={<SingleExercisePage />} />
        <Route path="new-exercise" element={<NewExercisePage />} />
        <Route path="*" element={<ExercisesPage />} />
      </Route>

      <Route path="profile/*">
        <Route path="*" element={<ProfilePage />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ChakraProvider>
      {/* <React.StrictMode> */}
      <RouterProvider router={router} />
      {/* </React.StrictMode> */}
    </ChakraProvider>
  </Provider>,
);
