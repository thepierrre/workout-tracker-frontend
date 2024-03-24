import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SingleRoutine from "./components/Routines/SingleRoutine.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <ChakraProvider>
      <React.StrictMode>
        <App />
        <Routes>
          <Route path="single-routine" element={<SingleRoutine />}></Route>
        </Routes>
      </React.StrictMode>
    </ChakraProvider>
  </MemoryRouter>
);
