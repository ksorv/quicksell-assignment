import Loader from '../Loader'
import { states } from './constants'
import styles from './index.module.css'

export const StateComponent = ({ state }) => {
  if (state === states.LOADING) {
    return (
      <>
        <Loader scale={2 / 3} />
        <p className={styles.loadingText}>Saving counter value</p>
      </>
    )
  }

  return <p className={styles.errorText}>Unable to save.</p>
}