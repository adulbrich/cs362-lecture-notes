/**
 * A simple in-memory database implementation
 */
export class DB {
  static _data = {};
  static _idCounter = 1;

  /**
   * Saves a record to the database
   * @param {Object} record - The record to save
   * @returns {number} The ID of the saved record
   */
  static save(record) {
    const id = this._idCounter++;
    this._data[id] = { ...record, id };
    return id;
  }

  /**
   * Retrieves a record by ID
   * @param {number} id - The ID of the record to retrieve
   * @returns {Object|null} The record or null if not found
   */
  static findById(id) {
    return this._data[id] || null;
  }

  /**
   * Finds a record by a specific field value
   * @param {string} field - The field to search
   * @param {any} value - The value to search for
   * @returns {Object|null} The first matching record or null
   */
  static findByField(field, value) {
    return (
      Object.values(this._data).find((record) => record[field] === value) ||
      null
    );
  }

  /**
   * Finds a record by email
   * @param {string} email - The email to search for
   * @returns {Object|null} The record or null if not found
   */
  static findByEmail(email) {
    return this.findByField("email", email);
  }

  /**
   * Resets the database (useful for testing)
   */
  static reset() {
    this._data = {};
    this._idCounter = 1;
  }
}
