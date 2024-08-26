import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../contexts/AuthContextProvider";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Nav() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function logout() {
    setAuth({});
    localStorage.removeItem("user");
    navigate("/");
  }

  function handleTestPlatformClick() {
    closeMobileMenu();
    if (auth?.access_token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }

  return (
    <nav className={styles.nav}>
      <h2 onClick={handleTestPlatformClick}>Test Platform</h2>
      {auth?.access_token && (
        <p className={styles.greet}>Welcome {auth.usernameOrEmail}</p>
      )}
      <div
        className={`${styles.mobileMenuIcon} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
        onClick={toggleMobileMenu}
      >
        <GiHamburgerMenu className={styles.hamburgerMenu} />
      </div>

      <ul
        className={`${styles.navItems} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        {!auth?.access_token ? (
          <div className={styles.loginSignupBtn}>
            <span>
              <Link to="/" onClick={closeMobileMenu}>
                Login
              </Link>
            </span>
            <span>
              <Link to="signup" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </span>
          </div>
        ) : (
          <div className={styles.impBtn}>
            <span>
              <button onClick={logout}>Logout</button>
            </span>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
