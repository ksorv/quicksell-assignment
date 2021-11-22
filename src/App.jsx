import { useEffect } from 'react'
import Counter from './Counter'
import { useApi } from './hooks'
import { getEndpoint } from './utils'
import { API_URL, ENDPOINT_NAME } from './constants'
import './styles.css'

export default function App() {
  const { loading, error, data, call } = useApi()

  useEffect(() => {
    call({
      url: getEndpoint(
        import.meta.env[API_URL],
        import.meta.env[ENDPOINT_NAME]
      ),
    })
  }, [])

  if (error) {
    return (
      <div className="app flex center">
        <h1>OOPS! Something bad happened!</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="app flex center">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="app flex center">
      <Counter initialValue={data} />
    </div>
  )
}
