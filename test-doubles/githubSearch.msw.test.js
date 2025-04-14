import { afterAll, afterEach, beforeAll, test, expect } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import searchResults from "./searchResults.json";

export const restHandlers = [
  http.get("https://api.github.com/search/repositories", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return HttpResponse.json({
        message: "Validation Failed",
        errors: [
          {
            resource: "Search",
            field: "q",
            code: "missing",
          },
        ],
        documentation_url: "https://docs.github.com/v3/search",
        status: "422",
      });
    }

    return HttpResponse.json(searchResults);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

test("should return search results", async () => {
  const response = await fetch(
    "https://api.github.com/search/repositories?q=vitest"
  );
  const data = await response.json();

  expect(data).toEqual(searchResults);
});

test("should return error if query param is empty", async () => {
  const response = await fetch("https://api.github.com/search/repositories?q=");
  const data = await response.json();

  expect(data).toEqual({
    message: "Validation Failed",
    errors: [
      {
        resource: "Search",
        field: "q",
        code: "missing",
      },
    ],
    documentation_url: "https://docs.github.com/v3/search",
    status: "422",
  });
});

test("should return error if query param is missing", async () => {
  const response = await fetch("https://api.github.com/search/repositories");
  const data = await response.json();

  expect(data).toEqual({
    message: "Validation Failed",
    errors: [
      {
        resource: "Search",
        field: "q",
        code: "missing",
      },
    ],
    documentation_url: "https://docs.github.com/v3/search",
    status: "422",
  });
});
