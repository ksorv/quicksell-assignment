import { useEffect } from 'react'
import Counter from './Counter'
import { useApi } from './hooks'
import { getEndpoint } from './utils'
import { API_URL, ENDPOINT_NAME } from './constants'
import './styles.css'

export default function App() {
  const { loading, error, data, call } = useApi()

  useEffect(() => {
    // get the default value from api so that counter can be init
    call({
      url: getEndpoint(API_URL, ENDPOINT_NAME),
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
