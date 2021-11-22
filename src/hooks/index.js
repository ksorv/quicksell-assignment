import { useState } from 'react'

const requestTypes = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

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
