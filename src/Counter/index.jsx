import { useEffect, useRef, useState } from 'react'
import { API_URL, ENDPOINT_NAME } from '../constants'
import CounterText from '../CounterText'
import { useApi } from '../hooks'
import { StateComponent } from './components'
import { changeTypes, states, SAVE_TIME, MAX_VALUE } from './constants'
import { getEndpoint } from '../utils'
import styles from './index.module.css'

const Counter = ({ initialValue = 1 }) => {
  const callApi = useRef(false)
  const maxValue = MAX_VALUE ?? 1000
  const [counterError, setCounterError] = useState()
  const { call, loading, error, requestTypes, setError } = useApi()
  const [value, setValue] = useState(initialValue !== null ? initialValue : 1)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (callApi.current) {
        call({
          url: getEndpoint(API_URL),
          method: requestTypes.PUT,
          body: JSON.stringify({
            [ENDPOINT_NAME]: value,
          }),
        })
      }
    }, SAVE_TIME ?? 500)

    return () => clearTimeout(timer)
  }, [value])

  const verifyAndSetValue = (val) => {
    if (val <= maxValue) {
      setValue(val)
    } else setCounterError(`Value can't exceed ${maxValue}`)
  }

  const handleChange = (type, val) => {
    callApi.current = true
    setError()
    setCounterError()
    if (type === changeTypes.PLUS) {
      verifyAndSetValue(value + 1)
    } else if (type === changeTypes.MINUS) {
      setValue(value - 1)
    } else {
      verifyAndSetValue(Number(val))
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.topContainer} ${
          loading || error || counterError ? styles.visible : styles.invisible
        }`}
      >
        <StateComponent
          counterError={counterError}
          state={loading ? states.LOADING : states.ERROR}
        />
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
            max={MAX_VALUE ?? 1000}
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
      <div
        style={{
          position: 'fixed',
          bottom: 8,
          right: 8,
        }}
      >
        <p>
          Max Value:
          {maxValue}
        </p>
      </div>
    </div>
  )
}

export default Counter
