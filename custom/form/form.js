import { cloneDeep } from 'lodash'
import { isPlainObject, isBoolean } from '../utils/helpers'
import Errors from './errors'

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   * @param axios
   */
  constructor (data, axios) {
    this.axios = axios
    this.errors = new Errors()

    for (const field in data) {
      this[field] = data[field]
    }

    this.setOriginalData(data)
  }

  /**
   * Set original data
   * @param data
   */
  setOriginalData (data) {
    this.originalData = Object.keys(data).reduce((carry, key) => ({
      ...carry, [key]: cloneDeep(data[key])
    }), {})
  }

  /**
   * Reset the form fields.
   */
  reset () {
    for (const field in this.originalData) {
      this[field] = this.originalData[field]
    }

    this.errors.clear()
  }

  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post (url) {
    return this.submit('$post', url)
  }

  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put (url) {
    return this.submit('PUT', url)
  }

  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete (url) {
    return this.submit('DELETE', url)
  }

  /**
   * Submit the form.
   *
   * @param {string} type
   * @param {string} url
   */
  submit (type, url) {
    return this.request(type, url).then((data) => {
      this.onSuccess(data)

      return data
    }).catch((error) => {
      error.response.status === 422 && this.onFail(error.response)

      throw error
    })
  }

  /**
   * Request set with form data
   * @param type
   * @param url
   * @returns {*}
   */
  request (type, url) {
    const data = this.data()

    if (type === 'PUT' || type === 'DELETE') {
      data.append('_method', type)
      type = '$post'
    }

    return this.axios[type](url, data, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
  }

  /**
   * Fetch all relevant data for the form.
   */
  data () {
    const data = new FormData()

    Object.keys(this.originalData).forEach((property) => {
      const value = this[property]

      if (this.isEmpty(value)) {
        return
      }

      this.appendToFormData(data, property, value)
    })

    return data
  }

  /**
   * Append object to form data
   * @param formData
   * @param object
   * @param key
   */
  appendObject (formData, object, key) {
    Object.keys(object).forEach(property =>
      !this.isEmpty(object[property]) && this.appendToFormData(formData, property, object[property], key)
    )
  }

  /**
   * Append array to form data
   * @param formData
   * @param array
   * @param key
   */
  appendArray (formData, array, key) {
    array.forEach((value, index) =>
      !this.isEmpty(value) && this.appendToFormData(formData, index, value, key)
    )
  }

  /**
   * Append to form data by key
   * @param formData
   * @param itemKey
   * @param data
   * @param key
   * @returns {Function}
   */
  appendToFormData (formData, itemKey, data, key = null) {
    const formKey = key ? `${key}[${itemKey}]` : itemKey

    if (Array.isArray(data)) {
      return this.appendArray(formData, data, formKey)
    }

    if (isPlainObject(data)) {
      return this.appendObject(formData, data, formKey)
    }

    if (isBoolean(data)) {
      return formData.append(formKey, data ? 1 : 0)
    }

    formData.append(formKey, data)
  }

  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess (data) {
    this.reset()
  }

  /**
   * Handle a failed form submission.
   *
   * @param {object} response
   */
  onFail (response) {
    this.errors.clear()

    this.errors.record(response.data.errors)
  }

  /**
   * Check if value is empty
   * @param value
   * @returns {boolean}
   */
  isEmpty (value) {
    return value === '' || value === null || typeof value === 'undefined'
  }
}

export default Form
