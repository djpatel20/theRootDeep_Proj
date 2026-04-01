import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>
        The Root Deep
      </NavLink>

      <div className={styles.links}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/learning"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          My Progress
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Upload
          </NavLink>
        )}
      </div>

      <button
        className={styles.iconBtn}
        aria-label="Account"
        onClick={() => navigate("/login")}
      >
        <span className="material-symbols-outlined">account_circle</span>
      </button>
    </nav>
  );
}
