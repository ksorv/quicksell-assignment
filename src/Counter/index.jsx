import { useEffect, useRef, useState } from 'react'
import { API_URL, ENDPOINT_NAME } from '../constants'
import CounterText from '../CounterText'
import { useApi } from '../hooks'
import { StateComponent } from './components'
import { changeTypes, states, SAVE_TIME, MAX_VALUE } from './constants'
import { getEndpoint } from '../utils'
import styles from './index.module.css'

/**
 *
 * @param {number} initialValue this value will be used to control the counter, default to 1
 * @param {number} maxValue this value is the max value to which counter can go, defaults to value from `VITE_MAX_VALUE` env var or `1000`
 * @returns {jsx} A counter with multiple features
 */
const Counter = ({ initialValue = 1, maxValue = MAX_VALUE ?? 1000 }) => {
  // this ref tells whether we should call the API or not to save data,
  // which should not be the case on first render
  const callApi = useRef(false)

  // stores the error that are to be contained in Counter component only
  // sand have nothing to do with API calls
  const [counterError, setCounterError] = useState()
  const { call, loading, error, requestTypes, setError } = useApi()

  // init value to initialValue if not null(returned by BE if not set) else 1
  const [value, setValue] = useState(initialValue !== null ? initialValue : 1)

  useEffect(() => {
    // create a timer, so API calls are minimized,
    // as user can edit the counter any number of times
    const timer = setTimeout(() => {
      // only call API if callApi ref tells us to
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

    // clear the timeout on every value change
    return () => clearTimeout(timer)
  }, [value])

  /**
   *
   * @param {number} val The value which should be compared against `maxValue`
   */
  const verifyAndSetValue = (val) => {
    if (val <= maxValue) {
      setValue(val)
    } else setCounterError(`Value can't exceed ${maxValue}`)
  }

  /**
   *
   * @param {string} type one of the types from `changeTypes` type
   * @param {string} val this value comes from the input's `e.target.value`
   */
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
