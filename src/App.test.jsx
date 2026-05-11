import { beforeEach, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

beforeEach(() => {
  const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  vi.stubGlobal("localStorage", localStorageMock);
});

test("renders dashboard title", () => {
  render(<App />);
  expect(screen.getByText("Wrong Dashboard Title")).toBeInTheDocument();
});

test("adds a new task", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Enter task title...");
  const button = screen.getByText("Add Task");

  fireEvent.change(input, {
    target: { value: "Finish CI/CD project" },
  });

  fireEvent.click(button);

  expect(screen.getByText("Finish CI/CD project")).toBeInTheDocument();
});

test("marks a task as completed", () => {
  render(<App />);

  const task = screen.getByText("Create GitHub Actions workflow");
  fireEvent.click(task);

  expect(task).toHaveClass("completed");
});

test("filters completed tasks", () => {
  render(<App />);

  fireEvent.click(screen.getAllByText("Completed")[1]);

  expect(screen.getByText("Prepare CI/CD presentation")).toBeInTheDocument();
  expect(screen.queryByText("Create GitHub Actions workflow")).not.toBeInTheDocument();
});

test("deletes a task", () => {
  render(<App />);

  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(deleteButtons[0]);

  expect(screen.queryByText("Prepare CI/CD presentation")).not.toBeInTheDocument();
});