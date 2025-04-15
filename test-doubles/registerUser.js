import bcrypt from "bcrypt";
import { DB } from "./sqliteDatabase.js";

export function registerUser(email, password) {
  const record = {
    email: email,
    password: bcrypt.hashSync(password, 8),
  };
  try {
    const userId = DB.save(record);
    return userId;
  } catch {
    return null;
  }
}

// registerUser("ulbrical@oregonstate.edu", "123abcABC!");
// console.log(DB.findByEmail("ulbrical@oregonstate.edu"));
