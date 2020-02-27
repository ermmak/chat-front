/**
 * Check if data is plain object
 * @param data
 * @returns {boolean}
 */
const isPlainObject = data => Object.prototype.toString.call(data) === '[object Object]'

/**
 * Check if data is number
 * @param data
 * @returns {boolean}
 */
const isNumber = data => typeof data === 'number' && isFinite(data)

/**
 * Check if data is boolean
 * @param data
 * @returns {boolean}
 */
const isBoolean = data => typeof data === 'boolean'

/**
 * Check if data is string
 * @param data
 * @returns {boolean}
 */
const isString = data => typeof data === 'string' || data instanceof String

export { isPlainObject, isNumber, isBoolean, isString }
