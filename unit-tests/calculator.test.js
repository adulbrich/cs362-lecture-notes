import { beforeEach, describe, expect, test } from "vitest";
import { Calculator } from "./calculator.js";

// Uses the AAA pattern
// - Arrange
// - Act
// - Assert

// https://vitest.dev/api/#test
// defines a set of related expectations
test("adds 1 + 2 to equal 3", () => {
  const calculator = new Calculator();
  const result = calculator.add(1, 2);
  expect(result).toBe(3);
});
test("subtracts 5 - 2 to equal 3", () => {
  const calculator = new Calculator();
  const result = calculator.subtract(5, 2);
  expect(result).toBe(3);
});
test("multiplies 2 * 3 to equal 6", () => {
  const calculator = new Calculator();
  const result = calculator.multiply(2, 3);
  expect(result).toBe(6);
});
test("divides 6 / 2 to equal 3", () => {
  const calculator = new Calculator();
  const result = calculator.divide(6, 2);
  expect(result).toBe(3);
});
test("divides by zero", () => {
  const calculator = new Calculator();
  const result = () => calculator.divide(6, 0);
  expect(result).toThrowError();
});
test("divides 6 / Infinity to equal 0", () => {
  const calculator = new Calculator();
  const result = calculator.divide(6, Infinity);
  expect(result).toBe(0);
});

// https://vitest.dev/api/#describe
// set of related tests or benchmarks and other nested suites
describe("multiplication operation", () => {
  test("multiplies 2 * 3 to equal 6", () => {
    const calculator = new Calculator();
    const result = calculator.multiply(2, 3);
    expect(result).toBe(6);
  });
  test("multiplies -2 * -3 to equal 6", () => {
    const calculator = new Calculator();
    const result = calculator.multiply(-2, -3);
    expect(result).toBe(6);
  });
  test("multiplies -2 * 3 to equal -6", () => {
    const calculator = new Calculator();
    const result = calculator.multiply(-2, 3);
    expect(result).toBe(-6);
  });
});

describe("multiplication operation", () => {
  let calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });
  test("returns positive for two positive inputs", () => {
    const result = calculator.multiply(2, 3);
    expect(result).toBe(6);
  });
  test("returns positive for two negative inputs", () => {
    const result = calculator.multiply(-2, -3);
    expect(result).toBe(6);
  });
  test("returns negative for opposite-signed inputs", () => {
    const result = calculator.multiply(-2, 3);
    expect(result).toBe(-6);
  });
});
