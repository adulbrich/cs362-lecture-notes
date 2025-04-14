import bcrypt from "bcrypt";
import { Database } from "./database.js";

export function registerUser(email, password) {
  const record = {
    email: email,
    password: bcrypt.hashSync(password, 8),
  };
  try {
    const userId = Database.save(record);
    return userId;
  } catch {
    return null;
  }
}
