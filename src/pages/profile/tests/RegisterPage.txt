import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../RegisterPage";
import "@testing-library/jest-dom";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ChakraProvider>
  );
};

describe("RegisterPage", () => {
  test("renders the registration page", () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.getByText("Existing member? Sign in")).toBeInTheDocument();
  });

  test("renders the login page when the login button is clicked", () => {
    renderWithProviders(<RegisterPage />);
    fireEvent.click(screen.getByText("Existing member? Sign in"));
    waitFor(() =>
      expect(screen.getByText("Sign in to your account")).toBeInTheDocument()
    );
  });
});
