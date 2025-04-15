import { test, expect, vi, beforeEach } from "vitest";
import { registerUser } from "./registerUser.js";
import { DB as FakeDatabase } from "./inMemoryDatabase.js";

// vi.mock("./database.js", () => {
//   return {
//     DB: {
//       _data: {},
//       _idCounter: 1,
//       save: vi.fn((record) => {
//         const id = DB._idCounter++;
//         DB._data[id] = { ...record, id };
//         return id;
//       }),
//       reset: vi.fn(() => {
//         DB._data = {};
//         DB._idCounter = 1;
//       }),
//     },
//   };
// });

beforeEach(() => {
  FakeDatabase.reset();
  vi.clearAllMocks();
});

test("saves user record in database", () => {
  const email = "iamfake@oregonstate.edu";
  const password = "pa$$Word123";
  const spy = vi.spyOn(FakeDatabase, "save");

  // spy.mockImplementation(() => {});

  registerUser(email, password, FakeDatabase);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);

  const userRecord = spy.mock.calls[0][0];

  expect(userRecord).toMatchObject({
    email: expect.stringContaining(email),
    password: expect.not.stringContaining(password),
  });

  // Verify hash has correct length for bcrypt
  expect(userRecord.password).toHaveLength(60);

  // Verify hash has correct algorithm prefix
  expect(userRecord.password).toMatch(/^\$(2a|2b)\$/);

  spy.mockRestore();
});

test("returns null on database error", () => {
  const email = "iamfake@oregonstate.edu";
  const password = "pa$$Word123";
  const spy = vi.spyOn(FakeDatabase, "save");

  spy.mockImplementation(() => {
    throw new Error();
  });

  const response = registerUser(email, password, FakeDatabase);
  expect(response).toBeNull();

  spy.mockRestore();
});
