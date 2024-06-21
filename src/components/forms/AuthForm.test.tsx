import React from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import LogIn from "../profile/LogIn";
import "@testing-library/jest-dom";
import RegisterPage from "../../pages/profile/RegisterPage";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
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
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("No account? Sign up")).toBeInTheDocument();
  });

  it("renders the registration form correctly", () => {
    renderWithProviders(<RegisterPage />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Existing member? Sign in")).toBeInTheDocument();
  });
});
