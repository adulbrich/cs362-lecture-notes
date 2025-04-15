import bcrypt from "bcrypt";
import { DB as sqlite } from "./database.js";

export function registerUser(email, password, db = sqlite) {
  const record = {
    email: email,
    password: bcrypt.hashSync(password, 8),
  };
  try {
    const userId = db.save(record);
    return userId;
  } catch {
    return null;
  }
}

// For testing purposes:
// export function getUser(email) {
//   try {
//     const record = DB.findByEmail(email);
//     return record;
//   } catch {
//     return null;
//   }
// }
// registerUser("ulbrical@oregonstate.edu", "123abcABC!");
// console.log(getUser("ulbrical@oregonstate.edu"));
