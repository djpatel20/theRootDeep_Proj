import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>THE ROOT DEEP</div>
      <div className={styles.links}>
        <a href="#" className={styles.link}>Privacy Policy</a>
        <a href="#" className={styles.link}>Terms of Service</a>
        <a href="#" className={styles.link}>Contact Expert</a>
      </div>
      <p className={styles.copy}>© 2024 The Root Deep. Preserving Agricultural Wisdom.</p>
    </footer>
  )
}