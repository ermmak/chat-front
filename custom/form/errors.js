class Errors {
  /**
   * Constructor
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Check if field error exists
   * @param field
   */
  has (field) {
    // eslint-disable-next-line no-prototype-builtins
    this.errors.hasOwnProperty(field)
  }

  /**
   * Check if any error exists
   * @returns {boolean}
   */
  any () {
    return !!Object.keys(this.errors).length
  }

  /**
   * Get error by field
   * @param field
   * @returns {*}
   */
  get (field) {
    return this.errors[field]
  }

  /**
   * Set error by field
   * @param field
   * @param value
   */
  set (field, value) {
    this.record({ ...this.errors, [field]: value })
  }

  /**
   * Record errors
   * @param errors
   */
  record (errors) {
    this.errors = errors
  }

  /**
   * Clear error(s)
   * @param field
   */
  clear (field = null) {
    field ? delete this.errors[field] : this.errors = {}
  }
}

export default Errors
