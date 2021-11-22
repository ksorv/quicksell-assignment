import { useState } from 'react'

const requestTypes = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

/**
 * @returns {
 *  loading: loading state for the api calls
 *  data: data that comes from calls after JSON parsing
 *  error: error state for api calls
 *  requestTypes: const for types of requests that can be made
 *  call: A fn to call the APIs, this sets loading, error and data states
 *  setError: A direct fn to setError state
 * }
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  /**
   *
   * @param {string} method The method of req, can be any one of `requestTypes`
   * @param {string} url The url to which the call should be made
   * @param {object} body The body of request for call methods PUT, POST etc.
   *
   * This fn sets all the states including loading, data, and error as per needs
   */
  const call = ({ method = requestTypes.GET, url, body }) => {
    setLoading(true)
    setError()
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((r) => r.json())
      .then((r) => {
        setData(r)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
        setError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    data,
    error,
    requestTypes,
    call,
    setError,
  }
}
