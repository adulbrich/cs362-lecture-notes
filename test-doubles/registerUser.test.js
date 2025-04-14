import { test, expect, vi } from "vitest";
import { registerUser } from "./registerUser.js";
import { Database } from "./database.js";

test("saves user record in database", () => {
  const email = "iamfake@oregonstate.edu";
  const password = "pa$$Word123";
  const spy = vi.spyOn(Database, "save");

  spy.mockImplementation(() => {});

  registerUser(email, password);

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
  const spy = vi.spyOn(Database, "save");

  spy.mockImplementation(() => {
    throw new Error();
  });

  const response = registerUser(email, password);
  expect(response).toBeNull();

  spy.mockRestore();
});
