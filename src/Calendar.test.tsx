import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar";

test("renders Calendar component", () => {
  render(<Calendar onDateChange={() => {}} />);
  const inputElement = screen.getByPlaceholderText(/select date/i);
  expect(inputElement).toBeInTheDocument();
});
