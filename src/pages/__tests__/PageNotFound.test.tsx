import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PageNotFound from "../PageNotFound";

describe("WorkoutsPage", () => {
  test("renders the not found page", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Looks like this page doesn't exist."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Let's get you back to a page/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/that's ready to work!/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Image source")).toBeInTheDocument();
  });
});
