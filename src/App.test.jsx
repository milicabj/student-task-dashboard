import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders dashboard title", () => {
  render(<App />);
  expect(screen.getByText("Student Task Dashboard")).toBeInTheDocument();
});

test("adds a new task", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter a task...");
  const button = screen.getByText("Add Task");

  fireEvent.change(input, { target: { value: "Finish GitHub Actions project" } });
  fireEvent.click(button);

  expect(screen.getByText("Finish GitHub Actions project")).toBeInTheDocument();
});

test("marks task as completed", () => {
  render(<App />);

  const task = screen.getByText("Create GitHub Actions workflow");
  fireEvent.click(task);

  expect(task).toHaveClass("completed");
});