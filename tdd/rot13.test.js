import { test, expect } from "vitest";
import { rot13 } from "./rot13.js";

test("returns empty string for empty input", () => {
  expect(rot13("")).toBe("");
});

test("transforms one lowercase letter without wrapping", () => {
  expect(rot13("a")).toBe("n");
});

test("transforms one lowercase letter with warping", () => {
  expect(rot13("n")).toBe("a");
});

test("transforms one uppercase letter without warping", () => {
  expect(rot13("A")).toBe("N");
});

test("transforms one uppercase letter with warping", () => {
  expect(rot13("N")).toBe("A");
});

test("doesn't transform '`' (first char before 'a')", () => {
  expect(rot13("`")).toBe("`");
});

test("doesn't transform '{' (first char after 'z')", () => {
  expect(rot13("{")).toBe("{");
});

test("doesn't transform '@' (first char before 'A')", () => {
  expect(rot13("@")).toBe("@");
});

test("doesn't transform '[' (first char after 'Z')", () => {
  expect(rot13("[")).toBe("[");
});

test("transforms all lowercase letters", () => {
  expect(rot13("abcdefghijklmnopqrstuvwxyz")).toBe(
    "nopqrstuvwxyzabcdefghijklm"
  );
});

test("transforms all uppercase letters", () => {
  expect(rot13("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe(
    "NOPQRSTUVWXYZABCDEFGHIJKLM"
  );
});

test("doesn't transform multiple symbols", () => {
  expect(rot13("`{@[")).toBe("`{@[");
});

test("throws an error when no parameter is passed", () => {
  expect(() => {
    rot13();
  }).toThrow("Expected string parameter");
});

test("throws an error when non-string is passed", () => {
  expect(() => {
    rot13(123);
  }).toThrow("Expected string parameter");
});

test("doesn't transform numbers", () => {
  expect(rot13("0123456789")).toBe("0123456789");
});

test("doesn't transform non-English letters", () => {
  expect(rot13("ñåéîøüç")).toBe("ñåéîøüç");
});

test("handles emojis correctly", () => {
  expect(rot13("🤓🤩")).toBe("🤓🤩");
});
