import { useNavigate } from 'react-router-dom'
import styles from './ModuleCard.module.css'

export default function ModuleCard({ module }) {
  const navigate = useNavigate()

  return (
    <article
      className={styles.card}
      onClick={() => navigate('/learning')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate('/learning')}
    >
      <div className={styles.thumb}>
        <img src={module.thumbnail} alt={module.alt} />
        <div className={styles.overlay} />
        <div className={styles.duration}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span>
          {module.duration}
        </div>
        <div className={styles.playOverlay}>
          <div className={styles.playBtn}>
            <span className="material-symbols-outlined icon-fill" style={{ fontSize: 36 }}>play_arrow</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{module.title}</h3>
        <p className={styles.desc}>{module.description}</p>
        <button className={styles.cta}>
          Start Learning
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>trending_flat</span>
        </button>
      </div>
    </article>
  )
}