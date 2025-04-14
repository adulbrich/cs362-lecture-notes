/**
 * @vitest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { describe, test, expect, beforeEach } from "vitest";
import { setupCounter } from "./counter.js";
import { getByText, getByRole } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";

describe("Counter Application", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./counter.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    setupCounter();
  });

  test("counter increments when clicked", async () => {
    // Find the button by its text content (how a user would locate it)
    // const counter = getByText(document.body, "0");
    const counter = getByRole(document.body, "button");

    // Simulate a complete click interaction
    await userEvent.click(counter);

    // Verify the result using a user-centric assertion
    expect(counter).toHaveTextContent("1");
  });
});
