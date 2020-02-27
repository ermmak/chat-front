/**
 * Store error response data
 * @param store
 * @param status
 * @param data
 */
const storeError = (store, { status, data }) =>
  store.commit('error/setSnackbar', { status, message: data.message })

/**
 * Server error handling
 * @param $axios
 * @param store
 */
export default function ({ $axios, store }) {
  $axios.onError((error) => {
    error.response && error.response.status !== 422 && storeError(store, error.response)

    return Promise.reject(error)
  })
}
