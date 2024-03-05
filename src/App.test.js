import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react!/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react in js!/i);
  expect(linkElement).toBeInTheDocument();
});
test("renders learn2", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react in j!/i);
  expect(linkElement).toBeInTheDocument();
});
