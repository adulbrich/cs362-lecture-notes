/**
 * @vitest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { describe, beforeEach, test, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { currentTime } from "./currentTime.js";
import { screen } from "@testing-library/dom";

describe("Current Time Application", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./currentTime.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
  });
  test("displays 'midnight' at 00:00", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 3, 16, 0, 0));
    currentTime();
    const timeSpan = screen.getByText("midnight");
    expect(timeSpan).toBeInTheDocument();
    vi.useRealTimers();
  });
  test("displays 'noon' at 12:00 PM", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 3, 16, 12, 0));
    currentTime();
    const timeSpan = screen.getByText("noon");
    expect(timeSpan).toBeInTheDocument();
    vi.useRealTimers();
  });
  test("displays regular time format at other times", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 3, 16, 15, 30));
    currentTime();
    const timeSpan = screen.getByText("3:30 PM");
    expect(timeSpan).toBeInTheDocument();
    vi.useRealTimers();
  });
});
