import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import  styles from "./AdminUpload.module.css";

// ── Tab config ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "video",  label: "Videos",         icon: "play_circle" },
  { id: "quiz",   label: "Quiz",            icon: "quiz" },
  { id: "image",  label: "Images",          icon: "image" },
];

// ── Stub uploaded items stored in component state ──────────────────────────
const EMPTY_UPLOADS = { video: [], quiz: [], image: [] };

export default function AdminUploadPage() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const [activeTab,  setActiveTab]  = useState("video");
  const [uploads,    setUploads]    = useState(EMPTY_UPLOADS);
  const [toast,      setToast]      = useState(null);

  // ── Video form state ──────────────────────────────────────────────────────
  const [videoForm, setVideoForm] = useState({
    title: "", description: "", category: "", file: null
  });

  // ── Quiz form state ───────────────────────────────────────────────────────
  const [quizForm, setQuizForm] = useState({
    quizTitle: "", questions: [
      { question: "", options: ["", "", "", ""], correct: 0 }
    ]
  });

  // ── Image form state ──────────────────────────────────────────────────────
  const [imageForm, setImageForm] = useState({
    title: "", tag: "", file: null, preview: null
  });

  const videoRef = useRef();
  const imageRef = useRef();

  // ── Toast helper ──────────────────────────────────────────────────────────
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  function handleLogout() {
    logout();
    navigate("/login");
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIDEO handlers
  // ══════════════════════════════════════════════════════════════════════════
  function handleVideoFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setVideoForm((f) => ({ ...f, file }));
  }

  function handleVideoSubmit(e) {
    e.preventDefault();
    if (!videoForm.title || !videoForm.file) {
      showToast("Please add a title and select a video file.", "error");
      return;
    }
    const newItem = {
      id: Date.now(),
      title:       videoForm.title,
      description: videoForm.description,
      category:    videoForm.category,
      fileName:    videoForm.file.name,
      size:        (videoForm.file.size / (1024 * 1024)).toFixed(2) + " MB",
      uploadedAt:  new Date().toLocaleDateString(),
    };
    setUploads((u) => ({ ...u, video: [newItem, ...u.video] }));
    setVideoForm({ title: "", description: "", category: "", file: null });
    if (videoRef.current) videoRef.current.value = "";
    showToast(`"${newItem.title}" uploaded successfully!`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // QUIZ handlers
  // ══════════════════════════════════════════════════════════════════════════
  function addQuestion() {
    setQuizForm((f) => ({
      ...f,
      questions: [...f.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
    }));
  }

  function removeQuestion(idx) {
    setQuizForm((f) => ({
      ...f,
      questions: f.questions.filter((_, i) => i !== idx),
    }));
  }

  function updateQuestion(idx, field, value) {
    setQuizForm((f) => {
      const qs = [...f.questions];
      if (field === "question") {
        qs[idx] = { ...qs[idx], question: value };
      } else if (field === "correct") {
        qs[idx] = { ...qs[idx], correct: Number(value) };
      }
      return { ...f, questions: qs };
    });
  }

  function updateOption(qIdx, oIdx, value) {
    setQuizForm((f) => {
      const qs = [...f.questions];
      const opts = [...qs[qIdx].options];
      opts[oIdx] = value;
      qs[qIdx] = { ...qs[qIdx], options: opts };
      return { ...f, questions: qs };
    });
  }

  function handleQuizSubmit(e) {
    e.preventDefault();
    if (!quizForm.quizTitle) {
      showToast("Please enter a quiz title.", "error");
      return;
    }
    const incomplete = quizForm.questions.some(
      (q) => !q.question.trim() || q.options.some((o) => !o.trim())
    );
    if (incomplete) {
      showToast("Fill in all questions and options.", "error");
      return;
    }
    const newItem = {
      id:          Date.now(),
      title:       quizForm.quizTitle,
      questions:   quizForm.questions.length,
      uploadedAt:  new Date().toLocaleDateString(),
    };
    setUploads((u) => ({ ...u, quiz: [newItem, ...u.quiz] }));
    setQuizForm({
      quizTitle: "",
      questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
    });
    showToast(`Quiz "${newItem.title}" saved!`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // IMAGE handlers
  // ══════════════════════════════════════════════════════════════════════════
  function handleImageFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImageForm((f) => ({ ...f, file, preview }));
  }

  function handleImageSubmit(e) {
    e.preventDefault();
    if (!imageForm.title || !imageForm.file) {
      showToast("Please add a title and select an image.", "error");
      return;
    }
    const newItem = {
      id:         Date.now(),
      title:      imageForm.title,
      tag:        imageForm.tag,
      fileName:   imageForm.file.name,
      preview:    imageForm.preview,
      uploadedAt: new Date().toLocaleDateString(),
    };
    setUploads((u) => ({ ...u, image: [newItem, ...u.image] }));
    setImageForm({ title: "", tag: "", file: null, preview: null });
    if (imageRef.current) imageRef.current.value = "";
    showToast(`"${newItem.title}" uploaded successfully!`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Delete helper (works for all tabs)
  // ══════════════════════════════════════════════════════════════════════════
  function deleteItem(tab, id) {
    setUploads((u) => ({ ...u, [tab]: u[tab].filter((i) => i.id !== id) }));
    showToast("Item removed.", "info");
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.auRoot}>

      {/* ── Sidebar ── */}
      <aside className={styles.auSidebar}>
        <div className={styles.auLogo}>
          <div className={styles.auLogoIcon}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M20 8 C20 8 12 14 12 22 C12 27.5 15.5 31 20 31 C24.5 31 28 27.5 28 22 C28 14 20 8 20 8Z"
                fill="currentColor" opacity="0.2"/>
              <path d="M20 12 L20 30 M14 18 C14 18 17 20 20 20 C23 20 26 18 26 18"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <span className="au-logo-name">The Root Deep</span>
            <span className="au-logo-tag">Admin Panel</span>
          </div>
        </div>

        <nav className="au-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`au-nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
              {uploads[tab.id].length > 0 && (
                <span className="au-badge">{uploads[tab.id].length}</span>
              )}
            </button>
          ))}
        </nav>

        <button className="au-logout" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </aside>

      {/* ── Main ── */}
      <main className="au-main">
        {/* Header */}
        <header className="au-header">
          <div>
            <h1 className="au-page-title">
              {TABS.find((t) => t.id === activeTab)?.label} Upload
            </h1>
            <p className="au-page-sub">
              Manage and publish content for your training portal
            </p>
          </div>
          <div className="au-header-badge">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Admin
          </div>
        </header>

        {/* ── VIDEO TAB ── */}
        {activeTab === "video" && (
          <div className="au-content">
            <section className="au-card">
              <h2 className="au-card-title">
                <span className="material-symbols-outlined">upload</span>
                Upload New Video
              </h2>
              <form className="au-form" onSubmit={handleVideoSubmit}>
                <div className="au-row-2">
                  <div className="au-field">
                    <label>Video Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Introduction to Root Analysis"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm((f) => ({ ...f, title: e.target.value }))}
                    />
                  </div>
                  <div className="au-field">
                    <label>Category</label>
                    <select
                      value={videoForm.category}
                      onChange={(e) => setVideoForm((f) => ({ ...f, category: e.target.value }))}
                    >
                      <option value="">Select category</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Workshop</option>
                    </select>
                  </div>
                </div>
                <div className="au-field">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the video content..."
                    value={videoForm.description}
                    onChange={(e) => setVideoForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>
                <div className="au-field">
                  <label>Video File *</label>
                  <div className="au-dropzone" onClick={() => videoRef.current?.click()}>
                    <span className="material-symbols-outlined au-dz-icon">video_file</span>
                    <p className="au-dz-text">
                      {videoForm.file
                        ? videoForm.file.name
                        : "Click to select or drag & drop a video file"}
                    </p>
                    <p className="au-dz-hint">MP4, MOV, AVI — up to 2 GB</p>
                    <input
                      ref={videoRef}
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      onChange={handleVideoFile}
                    />
                  </div>
                </div>
                <div className="au-form-actions">
                  <button type="submit" className={styles.auBtnPrimary}>
                    <span className="material-symbols-outlined">cloud_upload</span>
                    Upload Video
                  </button>
                </div>
              </form>
            </section>

            {/* Uploaded videos list */}
            {uploads.video.length > 0 && (
              <section className="au-card">
                <h2 className="au-card-title">
                  <span className="material-symbols-outlined">video_library</span>
                  Uploaded Videos ({uploads.video.length})
                </h2>
                <div className="au-list">
                  {uploads.video.map((v) => (
                    <div className="au-list-item" key={v.id}>
                      <div className="au-list-icon video">
                        <span className="material-symbols-outlined">play_circle</span>
                      </div>
                      <div className="au-list-info">
                        <span className="au-list-name">{v.title}</span>
                        <span className="au-list-meta">
                          {v.fileName} · {v.size}
                          {v.category && ` · ${v.category}`}
                          {` · ${v.uploadedAt}`}
                        </span>
                      </div>
                      <button className="au-delete" onClick={() => deleteItem("video", v.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── QUIZ TAB ── */}
        {activeTab === "quiz" && (
          <div className="au-content">
            <section className="au-card">
              <h2 className="au-card-title">
                <span className="material-symbols-outlined">upload</span>
                Create New Quiz
              </h2>
              <form className="au-form" onSubmit={handleQuizSubmit}>
                <div className="au-field">
                  <label>Quiz Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Root Systems Fundamentals — Week 1"
                    value={quizForm.quizTitle}
                    onChange={(e) => setQuizForm((f) => ({ ...f, quizTitle: e.target.value }))}
                  />
                </div>

                {quizForm.questions.map((q, qi) => (
                  <div className="au-quiz-question" key={qi}>
                    <div className="au-quiz-q-header">
                      <span className="au-quiz-q-num">Q{qi + 1}</span>
                      {quizForm.questions.length > 1 && (
                        <button
                          type="button"
                          className={styles.auQuizRemove}
                          onClick={() => removeQuestion(qi)}
                        >
                          <span className="material-symbols-outlined">remove_circle</span>
                        </button>
                      )}
                    </div>
                    <div className={styles.auField}>
                      <label>Question</label>
                      <input
                        type="text"
                        placeholder="Enter your question here..."
                        value={q.question}
                        onChange={(e) => updateQuestion(qi, "question", e.target.value)}
                      />
                    </div>
                    <div className="au-options-grid">
                      {q.options.map((opt, oi) => (
                        <div className="au-option-wrap" key={oi}>
                          <label className="au-option-label">
                            <input
                              type="radio"
                              name={`correct-${qi}`}
                              checked={q.correct === oi}
                              onChange={() => updateQuestion(qi, "correct", oi)}
                            />
                            <span className="au-option-letter">
                              {["A", "B", "C", "D"][oi]}
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder={`Option ${["A","B","C","D"][oi]}`}
                            value={opt}
                            onChange={(e) => updateOption(qi, oi, e.target.value)}
                            className="au-option-input"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="au-quiz-hint">
                      <span className="material-symbols-outlined" style={{fontSize:"14px",verticalAlign:"middle"}}>info</span>
                      {" "}Select the radio button next to the correct answer.
                    </p>
                  </div>
                ))}

                <button type="button" className={styles.auBtnGhost} onClick={addQuestion}>
                  <span className="material-symbols-outlined">add_circle</span>
                  Add Question
                </button>

                <div className={styles.auFormActions}>
                  <button type="submit" className={styles.auBtnPrimary}>
                    <span className="material-symbols-outlined">save</span>
                    Save Quiz
                  </button>
                </div>
              </form>
            </section>

            {/* Saved quizzes */}
            {uploads.quiz.length > 0 && (
              <section className={styles.auCard}>
                <h2 className={styles.auCardTitle}>
                  <span className="material-symbols-outlined">quiz</span>
                  Saved Quizzes ({uploads.quiz.length})
                </h2>
                <div className={styles.auList}>
                  {uploads.quiz.map((q) => (
                    <div className={styles.auListItem} key={q.id}>
                      <div className="au-list-icon quiz">
                        <span className="material-symbols-outlined">quiz</span>
                      </div>
                      <div className="au-list-info">
                        <span className="au-list-name">{q.title}</span>
                        <span className="au-list-meta">
                          {q.questions} question{q.questions !== 1 ? "s" : ""} · {q.uploadedAt}
                        </span>
                      </div>
                      <button className="au-delete" onClick={() => deleteItem("quiz", q.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── IMAGE TAB ── */}
        {activeTab === "image" && (
          <div className="au-content">
            <section className="au-card">
              <h2 className={styles.auCardTitle}>
                <span className="material-symbols-outlined">upload</span>
                Upload New Image
              </h2>
              <form className={styles.auForm} onSubmit={handleImageSubmit}>
                <div className={styles.auRow2}>
                  <div className={styles.auField}>
                    <label>Image Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Root System Diagram — Module 3"
                      value={imageForm.title}
                      onChange={(e) => setImageForm((f) => ({ ...f, title: e.target.value }))}
                    />
                  </div>
                  <div className={styles.auField}>
                    <label>Tag / Category</label>
                    <select
                      value={imageForm.tag}
                      onChange={(e) => setImageForm((f) => ({ ...f, tag: e.target.value }))}
                    >
                      <option value="">Select tag</option>
                      <option>Diagram</option>
                      <option>Infographic</option>
                      <option>Photo</option>
                      <option>Banner</option>
                    </select>
                  </div>
                </div>

                <div className="au-field">
                  <label>Image File *</label>
                  <div
                    className="au-dropzone"
                    onClick={() => imageRef.current?.click()}
                    style={imageForm.preview ? { padding: "12px" } : {}}
                  >
                    {imageForm.preview ? (
                      <img
                        src={imageForm.preview}
                        alt="Preview"
                        className="au-image-preview"
                      />
                    ) : (
                      <>
                        <span className="material-symbols-outlined au-dz-icon">add_photo_alternate</span>
                        <p className="au-dz-text">Click to select an image</p>
                        <p className="au-dz-hint">JPG, PNG, WEBP — up to 10 MB</p>
                      </>
                    )}
                    <input
                      ref={imageRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageFile}
                    />
                  </div>
                </div>

                <div className="au-form-actions">
                  <button type="submit" className="au-btn-primary">
                    <span className="material-symbols-outlined">cloud_upload</span>
                    Upload Image
                  </button>
                </div>
              </form>
            </section>

            {/* Image gallery */}
            {uploads.image.length > 0 && (
              <section className="au-card">
                <h2 className="au-card-title">
                  <span className="material-symbols-outlined">photo_library</span>
                  Image Library ({uploads.image.length})
                </h2>
                <div className="au-image-grid">
                  {uploads.image.map((img) => (
                    <div className="au-image-tile" key={img.id}>
                      <img src={img.preview} alt={img.title} className="au-tile-img" />
                      <div className="au-tile-info">
                        <span className="au-tile-title">{img.title}</span>
                        {img.tag && <span className="au-tile-tag">{img.tag}</span>}
                      </div>
                      <button
                        className="au-tile-delete"
                        onClick={() => deleteItem("image", img.id)}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* ── Toast notification ── */}
      {toast && (
        <div className={`au-toast au-toast-${toast.type}`}>
          <span className="material-symbols-outlined">
            {toast.type === "success" ? "check_circle" : toast.type === "error" ? "error" : "info"}
          </span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}