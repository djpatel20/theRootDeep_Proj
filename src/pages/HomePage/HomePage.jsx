import { useNavigate } from 'react-router-dom'
import ModuleCard from '../../components/ModuleCard/ModuleCard'
import { modules, stats } from '../../data/modules'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Knowledge is Growth</p>
            <h1 className={styles.heroTitle}>
              Welcome to<br />
              <span>The Root Deep</span><br />
              Training Portal
            </h1>
            <p className={styles.heroDesc}>
              Empower your business with expert product knowledge through our
              living archive of agricultural wisdom.
            </p>
            <div className={styles.btnRow}>
              <button
                className={styles.btnPrimary}
                onClick={() => navigate('/learning')}
              >
                Explore Curriculum
              </button>
              <button className={styles.btnSecondary}>
                View Resource Library
              </button>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <div className={styles.heroImgBox}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJemS-U8N6s8HcANUeW3opllEHLSchLu8NCs3Bqer5Xm3oP75-zZpCBJorKoA8bwaStBVk4kTORDQSlNO8FHgL2phTht81DZxxhKfLLI3LE7OdWTMUL5rOoP5StIo4FxSaBUVE4gsCembSf4LNp5_s_4opnn-WSV7fNpFPyQfflSsjvms_p_Sz8Ti9bhK5tU6COTYSpTwBrOA4tFI78O5GOL0pfAV2L-TWDBTlwPxMula3Ot9qJyy4FXk9ZXEt-Usjr2baDCgWOke5"
                alt="Lush green leaves with dew drops"
              />
            </div>
            <div className={styles.badge}>
              <div className={styles.badgeHead}>
                <span className="material-symbols-outlined icon-fill" style={{ fontSize: 18 }}>eco</span>
                <span>Active Learners</span>
              </div>
              <p className={styles.badgeBody}>
                1,200+ Professionals joining the archive this month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modules Grid ── */}
      <section className={styles.modulesSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Learning Modules</h2>
            <p className={styles.sectionSub}>
              Deep dive into our core product categories and sustainable methodologies.
            </p>
          </div>
          <button className={styles.viewAll}>
            View All Modules
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
          </button>
        </div>

        <div className={styles.grid}>
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}

          {/* Promo bento card */}
          <div className={styles.promoCard}>
            <div className={styles.promoText}>
              <h3 className={styles.promoTitle}>Need Custom Training?</h3>
              <p className={styles.promoDesc}>
                Our experts can develop tailored curricula specific to your local
                soil conditions and regional business needs.
              </p>
              <button className={styles.btnAccent}>Book a Session</button>
            </div>
            <div className={styles.promoImg}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDiMv7VaJYSgynuqqxNT8kCX0SFxKIPAfBDX_E49wGlRGkWdAVeLuah0WPECBzdeoLLsb7mKy33QNIIejquKw8Ihf_yyq77pWyOAmTfKz3i4KOYcFD5uRUfvTkyDdrXbzPEodUMRq-DZAxQxe9CsdFIMQpSLucr-ivRHuNq_5rxFAwkUhHe_F7D9dXja4J0qLdYkGYjle603R8mawPKRMMFqXt5xmAZo_XYHQlzuKyDuDf5zgqXF4x2yrk0TYHIfYjAmQj4GPpAAbK"
                alt="Abstract soil patterns"
              />
            </div>
            <div className={styles.promoGlow} />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}