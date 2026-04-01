import { courseSteps, currentModule, quizQuestions, resources } from '../../data/learning'
import { useQuiz } from '../../hooks/useQuiz'
import styles from './LearningPage.module.css'

/* ── Progress Sidebar ── */
function ProgressSidebar({ module, steps }) {
  return (
    <aside className={styles.sidebarLeft}>
      <h2 className={styles.sidebarTitle}>Soil Wisdom Certification</h2>

      <div className={styles.progressLabelRow}>
        <span className={styles.progressLabel}>Progress</span>
        <span className={styles.progressPct}>{module.progress}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${module.progress}%` }} />
      </div>

      <nav className={styles.steps}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.step} ${styles[step.status]}`}
          >
            <div className={`${styles.stepIcon} ${step.status === 'locked' ? styles.lockedIcon : ''}`}>
              {step.status === 'done' && (
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
              )}
              {step.status === 'active' && (
                <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.85rem' }}>
                  {step.id}
                </span>
              )}
              {step.status === 'locked' && (
                <span className="material-symbols-outlined icon-fill" style={{ fontSize: 16 }}>lock</span>
              )}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}

/* ── Video Player ── */
function VideoPlayer({ module }) {
  return (
    <div className={styles.videoPlayer}>
      <div
        className={styles.videoBg}
        style={{ backgroundImage: `url('${module.videoThumbnail}')` }}
      />
      <div className={styles.videoTint} />
      <div className={styles.videoPlayArea}>
        <div className={styles.videoPlayBtn}>
          <span className="material-symbols-outlined icon-fill" style={{ fontSize: 40 }}>play_arrow</span>
        </div>
      </div>
      <div className={styles.videoProgress}>
        <div className={styles.videoTrack}>
          <div className={styles.videoFill} style={{ width: `${module.videoProgress}%` }} />
        </div>
        <span className={styles.videoTime}>{module.currentTime} / {module.totalTime}</span>
      </div>
    </div>
  )
}

/* ── Module Info ── */
function ModuleInfo({ module }) {
  return (
    <div className={styles.moduleInfo}>
      <h1 className={styles.moduleTitle}>{module.title}</h1>
      <p className={styles.moduleDesc}>{module.description}</p>
      <div className={styles.moduleMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaKey}>Instructor</span>
          <span className={styles.metaVal}>{module.instructor}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaKey}>Topic</span>
          <span className={styles.metaVal}>{module.topic}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Quiz Section ── */
function QuizSection({ questions }) {
  const { answers, submitted, selectAnswer, submitAnswer, allSubmitted } = useQuiz(questions)

  return (
    <div className={styles.quizSection}>
      <div className={styles.quizHead}>
        <span className="material-symbols-outlined">quiz</span>
        <h3 className={styles.quizTitle}>Knowledge Check</h3>
      </div>

      <div className={styles.quizList}>
        {questions.map((q) => (
          <div key={q.id} className={styles.quizCard}>
            <p className={styles.quizQuestion}>{q.question}</p>

            <div className={styles.quizOptions}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.quizOpt} ${answers[q.id] === i ? styles.selected : ''} ${
                    submitted[q.id] && i === q.correctIndex ? styles.correct : ''
                  } ${submitted[q.id] && answers[q.id] === i && i !== q.correctIndex ? styles.wrong : ''}`}
                  onClick={() => selectAnswer(q.id, i)}
                  disabled={!!submitted[q.id]}
                >
                  <div className={styles.optLetter}>{String.fromCharCode(65 + i)}</div>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            <button
              className={`${styles.submitBtn} ${answers[q.id] === undefined || submitted[q.id] ? styles.submitDisabled : ''}`}
              onClick={() => submitAnswer(q.id)}
              disabled={answers[q.id] === undefined || !!submitted[q.id]}
            >
              {submitted[q.id] ? 'Submitted' : 'Submit Answer'}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.completeWrap}>
        <button className={`${styles.completeBtn} ${!allSubmitted ? styles.completeBtnDisabled : ''}`}>
          Complete Module
        </button>
        <p className={styles.completeSub}>Unlock Module 4: Ecological Synthesis</p>
      </div>
    </div>
  )
}

/* ── Resources Sidebar ── */
function ResourcesSidebar({ resources }) {
  return (
    <aside className={styles.sidebarRight}>
      <div className={styles.resourcesPanel}>
        <h3 className={styles.resourcesTitle}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--secondary)' }}>
            auto_stories
          </span>
          Resources
        </h3>
        <div className={styles.resourceList}>
          {resources.map((r) => (
            <div key={r.id} className={styles.resourceItem}>
              <div className={styles.resourceThumb}>
                <img src={r.thumbnail} alt={r.name} />
              </div>
              <p className={styles.resourceName}>{r.name}</p>
              <p className={styles.resourceType}>{r.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quotePanel}>
        <p className={styles.quoteText}>
          "Agriculture is the most healthful, most useful and most noble employment of man."
        </p>
        <span className={styles.quoteAttr}>— George Washington</span>
      </div>
    </aside>
  )
}

/* ── Learning Page ── */
export default function LearningPage() {
  return (
    <div className={styles.layout}>
      <ProgressSidebar module={currentModule} steps={courseSteps} />

      <section className={styles.center}>
        <VideoPlayer module={currentModule} />
        <ModuleInfo module={currentModule} />
        <QuizSection questions={quizQuestions} />
      </section>

      <ResourcesSidebar resources={resources} />
    </div>
  )
}