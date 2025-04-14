/**
 * @vitest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";
import { setupSearchForm } from "./githubSearch.js";
import mockSearchResults from "./searchResults.json";

describe("GitHub Repo Search Application", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./githubSearch.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    setupSearchForm();
  });
  test("renders GitHub search results", async () => {
    const queryInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(queryInput, "vitest");
    await userEvent.click(submitButton);

    const searchResults = await screen.findAllByRole("listitem");
    expect(searchResults).not.toHaveLength(0);
    expect(searchResults[0]).toHaveTextContent("vitest-dev/vitest");
  });
  test("renders GitHub search results using a spy", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResults,
    });

    const queryInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(queryInput, "vitest");
    await userEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/api\.github\.com\/search\/repositories\?q=vitest/)
    );

    const searchResults = await screen.findAllByRole("listitem");
    expect(searchResults).toHaveLength(mockSearchResults.items.length);
    expect(searchResults[0]).toHaveTextContent("vitest-dev/vitest");

    vi.restoreAllMocks();
  });
});
