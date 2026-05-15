import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={() => navigate("/")}>
        <img src="favicon.ico" className={styles.bird} />
        <span className={styles.brand}>Dwitter</span>
        {user && <span className={styles.badge}>@{user.username}</span>}
      </button>

      <div className={styles.links}>
        {user ? (
          <>
            <button
              className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
              onClick={() => navigate("/")}
            >
              All Tweets
            </button>
            <button
              className={`${styles.link} ${pathname === "/my" ? styles.active : ""}`}
              onClick={() => navigate("/my")}
            >
              My Tweets
            </button>
            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={styles.link} onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className={styles.link}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
