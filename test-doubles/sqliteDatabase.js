import Database from "better-sqlite3";

const db = new Database("users.db");

// Initialize the users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

export class DB {
  /**
   * Saves a user record to the database
   * @param {Object} record - The user record with email and password
   * @returns {number} The ID of the saved user
   */
  static save(record) {
    try {
      const stmt = db.prepare(
        "INSERT INTO users (email, password) VALUES (?, ?)"
      );
      const result = stmt.run(record.email, record.password);
      return result.lastInsertRowid;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by ID
   * @param {number} id - The ID of the user to retrieve
   * @returns {Object|null} The user record or null if not found
   */
  static findById(id) {
    try {
      const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
      return stmt.get(id) || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Finds a user by email
   * @param {string} email - The email to search for
   * @returns {Object|null} The user record or null if not found
   */
  static findByEmail(email) {
    try {
      const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
      return stmt.get(email) || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Resets the database (useful for testing)
   */
  static reset() {
    db.exec("DELETE FROM users");
    db.exec('DELETE FROM sqlite_sequence WHERE name = "users"');
  }

  /**
   * Closes the database connection
   */
  static close() {
    db.close();
  }
}
