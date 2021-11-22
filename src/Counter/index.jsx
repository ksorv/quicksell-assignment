import { useEffect, useRef, useState } from 'react'
import { API_URL, ENDPOINT_NAME, SAVE_TIME } from '../constants'
import CounterText from '../CounterText'
import { useApi } from '../hooks'
import { StateComponent } from './components'
import { changeTypes, states } from './constants'
import { getEndpoint } from '../utils'
import styles from './index.module.css'

const Counter = ({ initialValue = 1 }) => {
  const [value, setValue] = useState(initialValue !== null ? initialValue : 1)
  const callApi = useRef(false)
  const { call, loading, error, requestTypes, setError } = useApi()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (callApi.current) {
        call({
          url: getEndpoint(import.meta.env[API_URL]),
          method: requestTypes.PUT,
          body: JSON.stringify({
            [import.meta.env[ENDPOINT_NAME]]: value,
          }),
        })
      }
    }, import.meta.env[SAVE_TIME] ?? 500)

    return () => clearTimeout(timer)
  }, [value])

  const handleChange = (type, val) => {
    callApi.current = true
    setError()
    if (type === changeTypes.PLUS) {
      setValue(value + 1)
    } else if (type === changeTypes.MINUS) {
      setValue(value - 1)
    } else setValue(Number(val))
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.topContainer} ${
          loading || error ? styles.visible : styles.invisible
        }`}
      >
        <StateComponent state={error ? states.ERROR : states.LOADING} />
      </div>
      <div className={styles.counterContainer}>
        <button
          type="button"
          className={`${styles.minus} ${styles.counterButton}`}
          onClick={() => handleChange(changeTypes.MINUS)}
        >
          -
        </button>
        <div className={styles.inputContainer}>
          <input
            type="number"
            value={value}
            className={styles.input}
            onChange={(e) => handleChange(changeTypes.INPUT, e.target.value)}
          />
        </div>
        <button
          type="button"
          className={`${styles.plus} ${styles.counterButton}`}
          onClick={() => handleChange(changeTypes.PLUS)}
        >
          +
        </button>
      </div>
      <CounterText value={value} />
    </div>
  )
}

export default Counter
