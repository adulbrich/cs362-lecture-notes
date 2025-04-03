import { expect, test } from "vitest";

class Navigator {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.currentUrl = baseUrl;
  }

  goToAlbumPage() {
    this.currentUrl = this.baseUrl.endsWith("/")
      ? this.baseUrl + "albums"
      : this.baseUrl + "/albums";
  }

  goToProfilePage() {
    this.currentUrl = this.baseUrl.endsWith("/")
      ? this.baseUrl + "profile"
      : this.baseUrl + "/profile";
  }

  getCurrentUrl() {
    return this.currentUrl;
  }
}

// Antipattern: Logic in Tests
test("should navigate to albums page", () => {
  const baseUrl = "http://photos.google.com/";
  const nav = new Navigator(baseUrl);
  nav.goToAlbumPage();
  expect(nav.getCurrentUrl()).toBe(baseUrl + "/albums");
});

// Antipattern: Tests too DRY
const createNavigator = (url = "http://example.com") => new Navigator(url);
const runNavAction = (nav, action) => {
  if (action === "albums") nav.goToAlbumPage();
  if (action === "profile") nav.goToProfilePage();
  // ... more actions could be added here
};
const verifyEndpoint = (nav, baseUrl, endpoint) => {
  const expected = baseUrl.endsWith("/")
    ? baseUrl + endpoint
    : baseUrl + "/" + endpoint;
  expect(nav.getCurrentUrl()).toBe(expected);
};
const testNavigation = (baseUrl, action, endpoint) => {
  const nav = createNavigator(baseUrl);
  runNavAction(nav, action);
  verifyEndpoint(nav, baseUrl, endpoint);
};
test("should handle navigation with trailing slash", () => {
  testNavigation("http://photos.google.com/", "albums", "albums");
});
test("should handle navigation without trailing slash", () => {
  testNavigation("http://photos.google.com", "albums", "albums");
});

// Antipattern: Even Worse DRY
const cases = [
  {
    description: "with trailing slash",
    url: "http://photos.google.com/",
    action: "albums",
    expected: "albums",
  },
  {
    description: "without trailing slash",
    url: "http://photos.google.com",
    action: "albums",
    expected: "albums",
  },
];
cases.forEach(({ description, url, action, expected }) => {
  test(`should navigate correctly ${description}`, () => {
    testNavigation(url, action, expected);
  });
});
