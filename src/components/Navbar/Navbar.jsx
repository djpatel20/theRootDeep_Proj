import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>
        The Root Deep
      </NavLink>

      <div className={styles.links}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/learning"
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          My Progress
        </NavLink>
        <a href="#" className={styles.link}>Upload</a>
      </div>

      <button className={styles.iconBtn} aria-label="Account">
        <span className="material-symbols-outlined">account_circle</span>
      </button>
    </nav>
  )
}