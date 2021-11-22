import { useState } from 'react'
import CounterText from '../CounterText'
import Loader from '../Loader'
import styles from './index.module.css'

const changeTypes = {
  PLUS: 'plus',
  MINUS: 'minus',
  INPUT: 'input',
}

const Counter = () => {
  const [value, setValue] = useState(1)

  const handleChange = (type, val) => {
    if (type === changeTypes.PLUS) {
      setValue(value + 1)
    } else if (type === changeTypes.MINUS) {
      setValue(value - 1)
    } else setValue(Number(val))
  }

  return (
    <div className={styles.container}>
      <div className={styles.loaderContainer}>
        <Loader scale={2 / 3} />
        <p className={styles.loadingText}>Saving counter value</p>
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
