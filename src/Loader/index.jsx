import styles from './index.module.css'

const Loader = ({ scale = 1 }) => (
  <div className={styles.loader} style={{ transform: `scale(${scale})` }} />
)

export default Loader
