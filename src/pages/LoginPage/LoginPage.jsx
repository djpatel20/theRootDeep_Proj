import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginPage.module.css";
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate small async delay for realism
    await new Promise((r) => setTimeout(r, 600));

    const result = login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate("/upload");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className={styles.loginRoot}>
      {/* Background decorative blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <div className={styles.loginCard}>
        {/* Brand mark */}
        <div className={styles.loginBrand}>
          <div className={styles.brandIcon}>
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M20 8 C20 8 12 14 12 22 C12 27.5 15.5 31 20 31 C24.5 31 28 27.5 28 22 C28 14 20 8 20 8Z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M20 12 L20 30 M14 18 C14 18 17 20 20 20 C23 20 26 18 26 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h1 className={styles.brandName}>The Root Deep</h1>
            <p className={styles.brandTagline}>Training Portal</p>
          </div>
        </div>

        <div className={styles.loginDivider} />

        <h2 className={styles.loginHeading}>Admin Sign In</h2>
        <p className={styles.loginSub}>
          Access restricted to authorised administrators only.
        </p>

        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrap}>
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                mail
              </span>
              <input
                id="email"
                type="email"
                placeholder="admin@therootdeep.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrap}>
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>
                lock
              </span>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePass}
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined">
                  {showPass ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorBanner} role="alert">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? (
              <span className={styles.btnSpinner} />
            ) : (
              <>
                Sign In
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <p className={styles.loginFooterNote}>
          Only verified admins can access this portal.
        </p>
      </div>
    </div>
  );
}
