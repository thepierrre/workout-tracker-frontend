import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workouts from "./components/Workouts/Workouts.tsx";
import Routines from "./components/Routines/Routines.tsx";
import Exercises from "./components/Exercises/Exercises.tsx";
import Profile from "./components/Profile/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/workouts", element: <Workouts /> },
      { path: "/routines", element: <Routines /> },
      { path: "/exercises", element: <Exercises /> },
      { path: "/profile", element: <Profile /> },
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
