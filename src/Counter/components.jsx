import Loader from '../Loader'
import { states } from './constants'
import styles from './index.module.css'

/**
 *
 * @param {string} state the state which is to be shown, can be of type from `states`
 * @param {string} counterError if this is present, this error is shown instead of default error
 * @returns a state component which can render a default error or state
 */
export const StateComponent = ({ state, counterError }) => {
  if (state === states.LOADING) {
    return (
      <>
        <Loader scale={2 / 3} />
        <p className={styles.loadingText}>Saving counter value</p>
      </>
    )
  }

  return <p className={styles.errorText}>{counterError ?? 'Unable to save.'}</p>
}
