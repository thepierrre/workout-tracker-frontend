import { configureStore } from "@reduxjs/toolkit";

import alertReducer, { displayAlert } from "../store/alerts/alertSlice";
import authenticatedUserReducer, {
  clearUser,
} from "../store/auth/authenticatedUserSlice";
import categoriesReducer from "../store/exercises/categoriesSlice";
import exercisesReducer from "../store/exercises/exercisesSlice";
import localRoutineReducer from "../store/routines/localRoutineSlice";
import routinesReducer from "../store/routines/routinesSlice";
import userSettingsReducer from "../store/settings/userSettingsSlice";
import activeExerciseInstanceReducer from "../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../store/workout/workoutSessionsSlice";
import axiosInstance from "../util/axiosInstance";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesReducer,
    userSettings: userSettingsReducer,
    localRoutine: localRoutineReducer,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(clearUser());
        store.dispatch(displayAlert("Unauthorized access"));
      }
    } else if (error.code === "ERR_NETWORK") {
      store.dispatch(clearUser());
      store.dispatch(displayAlert("Server not available"));
    }
    return Promise.reject(error);
  },
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
