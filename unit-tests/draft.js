import { sum } from "./sum.js";
const result = sum(2, 2);
const expected = 4;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
