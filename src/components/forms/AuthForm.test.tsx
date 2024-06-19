import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AuthForm, { FormValues } from "./AuthForm";
import { ChakraProvider } from "@chakra-ui/react";
import LogIn from "../profile/LogIn";
import "@testing-library/jest-dom";
import RegisterPage from "../../pages/profile/RegisterPage";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../app/store";

jest.mock("axios");

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>{ui}</Provider>
    </ChakraProvider>
  );
};

describe("AuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    renderWithProviders(<LogIn />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });
});
